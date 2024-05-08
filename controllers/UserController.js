const asyncWrapper = require('../middleware/async');
const userModel= require('../Model/userModel');
const otpModel = require ('../Model/userotpModel' );
const otpGenerator = require('otp-generator'); 
const jwt = require('jsonwebtoken');
const Badrequest=require('../error/Badrequest');
const Notfound=require('../error/Notfound');
const bcrypt = require('bcrypt');
const UnauthorizedError =require('../error/unauthorised');
const bcryptjs= require('bcryptjs');
const sendEmail = require('../middleware/mail');


const authController ={
    
    getAllusers: asyncWrapper(async (req, res,next) => {

      

        const users = await userModel.find({})
        res.status(200).json({ users })
      }),
      getuserbyId: asyncWrapper(async (req, res,next) => {
        const { id: userID } = req.params
        const user = await userModel.findOne({ _id: userID });
        if (!user) {
          return next(new Notfound(`User not found`));
      };
  
        res.status(200).json({ user })
      }),
    
    login_post: asyncWrapper(async (req, res, next) => {       
        const {email,password}=req.body;
        const user = await userModel.login(email,password);
        const secret= process.env.SECRET_KEY
        const { name,role} = user;
        const token = jwt.sign({ userId: user._id,role:role,name:name }, secret, {
          expiresIn: '1h',
          });
          res.setHeader('Authorization', `Bearer ${token}`);
       const expiryDate = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);
       res.cookie(
        'jwt',
        token,
        {httpOnly: true, path: '/', expires: expiryDate},
      ),
          res.status(200).json({ user:user,token:token });
       }), 
 
    signup_post: asyncWrapper(async (req, res, next) => {
     // const{username,name,role,profile,email,password, last_login ,otpExpires}=req.body;
      const foundUser = await userModel.findOne({ email: req.body.email });
      if (foundUser) {
          return next(new Badrequest("Email already in use"));
      };
      const otp =  Math.floor(Math.random() * 9000000);;
      const otpExpirationDate = new Date(Date.now() + 5 * 60 * 1000); 
      const newUser = new userModel({
        username:req.body.username,
        name:req.body.name,
        role:req.body.role,
        profile:
          req.body.profile,
        email:req.body.email,
        password:req.body.password,
        otp: otp,
        last_login:req.body.last_login,
        otpExpires: otpExpirationDate,
    });

    const savedUser = await newUser.save();
        const body=`Your OTP is ${otp}`;
        await sendEmail(req.body.email, "Verify your account",body );
      // await sendOtpEmail(req.body.email,res);
        // Ensure this is the only response sent for this request
        res.status(200).json({ user: savedUser, otp: otp });
     
     
    }),
    
    
    OTP: asyncWrapper(async(req,res,next) =>{
    
      const foundUser = await userModel.findOne({ otp: req.body.otp });
      if (!foundUser) {
          next(new UnauthorizedError('Authorization denied'));
      };
  
      // Checking if the otp is expired or not.
      console.log('otpExpires:', new Date(foundUser.otpExpires));
      console.log('Current time:', new Date());
      if (foundUser.otpExpires < new Date().getTime()) {
          next(new UnauthorizedError('OTP expired'));
      }
  
      // Updating the user to verified
      foundUser.verified = true;
      const savedUser = await foundUser.save();
  
      if (savedUser) {
          return res.status(201).json({
              message: "User account verified!",
              user: savedUser
          });
      
      }}),

   
      logout_get: asyncWrapper(async (req, res, next) => {       
        console.log('Logout request received'); // Debug log
        const token = req.headers.authorization;
        
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized: No token provided' });
        }
        const secret= process.env.SECRET_KEY;
      
        // Verify and decode the token
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                console.error('JWT Verification Error:', err); // Debug log
                return res.status(401).json({ error: 'Unauthorized: Invalid token' });
            } else {
              const message = { message: 'Logged out successfully' };
              console.log('Response:', message);
                res.json(message);
            }
        });
      }),
    deleteUser: asyncWrapper(async (req, res, next) => {
      const { id: userID } = req.query
      const user = await userModel.findOneAndDelete({ _id: userID })
     
      res.status(200).json({ user })
    }),
    UpdatePassword :asyncWrapper(async (req, res,next) => {
      const { currentPassword, newPassword } = req.body;
      const userId = req.userId; // Assuming the user ID is retrieved from the authenticated user
  
      
          // Find the user by ID
          const user = await userModel.findById(userId);
          if (!user) {
            return next(new Notfound(`User not found`));
          }
  
          // Check if the current password matches the password stored in the database
          const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
          if (!isPasswordValid) {
              console.log('Incorrect current password provided');
              return res.status(400).json({ error: 'Incorrect current password' });
          }
  
          user.password=newPassword;
  
          // Save the updated user object to the database
          await user.save();
  
          console.log('Password updated successfully');
          return res.json({ success: true, message: 'Password updated successfully' });
      
  }),
    getuserbyrole: asyncWrapper(async (req, res,next) => {
      const { role: role } = req.query
      const user = await userModel.findOne({ role: role });
      if (!user) {
        return next(new Notfound(`Role not found`));
      }

      res.status(200).json({ user })
    }),
    getuserbyname: asyncWrapper(async (req, res,next) => {
      const { name: name } = req.query
      const user = await userModel.findOne({ name: name });
      if (!user) {
        return next(new Notfound(`Name not found`));
      }

      res.status(200).json({ user })
    }),
    updateUser: asyncWrapper(async (req, res,next) => {
      const { id } = req.params;
        const updatedUser = await userModel.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        if (!updatedUser) {
          return next(new Notfound(`User not found`));
        }

        res.json(updatedUser);
      
    }),

 ForgotPassword : asyncWrapper(async (req, res, next) => {
     
      const foundUser = await userModel.findOne({ email: req.body.email });
      if (!foundUser) {
        return next(new Notfound(`Your email is not registered`));
      }

  
      // Generate token
      const token = jwt.sign({ id: foundUser.id }, process.env.SECRET_key, { expiresIn: "15m" });
  
      // Recording the token to the database
      await otpModel.create({
          token: token,
          user: foundUser._id,
          expirationDate: new Date().getTime() + (60 * 1000 * 5),
      });
  
      const link = `https://online-learning-management-system.onrender.com/reset-password?token=${token}&id=${foundUser.id}`;
      const emailBody = `Click on the link bellow to reset your password\n\n${link}`;
  
      await sendEmail(req.body.email, "Reset your password", emailBody);
  
      res.status(200).json({
          message: "We sent you a reset password link on your email!",
      });
  }),
  ResetPassword: asyncWrapper(async (req, res, next) => {
    const { email, token ,newPassword} = req.body; // Extract email and token from request body

    console.log('Received email:', email);
    // Verify token
    
    const user = await userModel.findOne({email});
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }const otpRecord = await otpModel.findOne(req.userId);
    if (!otpRecord) {
        return res.status(400).json({ message: 'Invalid or expired token' });
    }
console.log(req.body);
    // Check if token is expired
    if (otpRecord.expirationDate < new Date()) {
        return res.status(400).json({ message: 'Token has expired' });
    }

    // Find the user by ID
   

    // Hash the new password
    const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    // Delete the OTP record from the database
    await otpModel.deleteOne({ token });
     
    // Respond with success message
    return res.status(200).json({ message: 'Password reset successfully' });
})
}
module.exports = authController