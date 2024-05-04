const asyncWrapper = require('../middleware/async');
const userModel= require('../Model/userModel');
const otpModel = require ('../Model/userotpModel' );
const otpGenerator = require('otp-generator'); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bcryptjs= require('bcryptjs');
const sendEmail = require('../middleware/mail');

//const maxAge = 3*24*60*60;

// const createToken  = (id)=>{
//  return jwt.sign({id},'my secret iris',{
//     expiresIn:maxAge
//  }); 
// };
// let transporter = nodemailer.createTransport({
// service:"gmail",
// auth:{
//   user: process.env.AUTH_EMAIL,
//   pass: process.env.AUTH_PASS
// }
// });
// transporter.verify((error,success)=>{
// if(error){
//   console.log(error);
// }
// else{
//   console.log('Message');
// }
// });
// const sendOtpEmail= async ({_id,email}, res) => {
//   const otp = `${Math.random() * 9000000}`;
 

//  const mailOptions = {
//    from: process.env.AUTH_EMAIL,
//    to: email,
//    subject:"Verify your email please",
//    html: `<p>Enter <b>${otp}</b>in the app to verify your email address and complete your Creation Process</p>`
// };
//  const saltRounds = 10;
//  const hashOtp = await bcrypt.hash(otp, saltRounds);
//  const newOtp = await new otpModel({
//        userId:_id,
//        otp: hashOtp,
//        createdAt: Date.now(),
//        ExpiredAt: Date.now() + 3600000,
//  });
//  await newOtp.save();
//  await transporter.sendMail(mailOptions);
//  res.json({
//   status:"PENDING",
//   message:"Verification otp mail sent successfully",
//   data:{
//    userId:_id,
//    email
//   }
//  });
// };
const authController ={
    
    getAllusers: asyncWrapper(async (req, res) => {

      // idlogged = req.userId
      // rolelogged = req.role
      // namelogged = req.name

      // console.log(idlogged, rolelogged, namelogged);

        const users = await userModel.find({})
        res.status(200).json({ users })
      }),
      getuserbyId: asyncWrapper(async (req, res,next) => {
        const { id: userID } = req.params
        const user = await userModel.findOne({ _id: userID });
        
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
      
    
       const newUser=req.body;       
        
        const user = await userModel.create(newUser);
     
      // await sendOtpEmail(req.body.email,res);
        // Ensure this is the only response sent for this request
        res.status(201).json(user);
     
     
    }),
    
    
    OTP: asyncWrapper(async(req,res,next) =>{
    
      let {userId, otp} = req.body;
      if(!userId || !otp){
          res.json("Empty details not allowed");
      }
      else{
          const verific= await otpModel.find({
              userId
          });
          if(verific.length <=0){
              res.json("Doesn't exist, Please sign up or login");
          }
          /*else{
              const {expiresAt} = verific[0];
              const hashOtp = verific[0].otp;
          }*/
          if(expiresAt < Date.now()){
              await otpModel.deleteMany({userId});
              res.json('Code has expired, Request agaiin')
          }
          else{
              const validOtp = await bcrypt.compare(otp,hashOtp);
              if(!validOtp){
                  res.json('Invalid code Please');
              }else{
                  await userModel.updateOne({_id: userId},{verified:true});
                  otpModel.deleteMany({userId});
                  res.json({
                      status: "VERIFIED",
                      message:"User email verified"
                  })
              }
          }
      }}),

   
    logout_get: asyncWrapper(async (req, res, next) => {       
     res.cookie('jwt','',{maxAge:1});
     res.redirect('/');
    }),
    deleteUser: asyncWrapper(async (req, res, next) => {
      const { id: userID } = req.query
      const user = await userModel.findOneAndDelete({ _id: userID })
     
      res.status(200).json({ user })
    }),
    getuserbyrole: asyncWrapper(async (req, res,next) => {
      const { role: role } = req.query
      const user = await userModel.findOne({ role: role });
      
      res.status(200).json({ user })
    }),
    getuserbyname: asyncWrapper(async (req, res,next) => {
      const { name: name } = req.query
      const user = await userModel.findOne({ name: name });
      
      res.status(200).json({ user })
    }),
    updateUser: asyncWrapper(async (req, res) => {
      const { id } = req.params;
        const updatedUser = await userModel.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        if (!updatedUser) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
      
    }),

 ForgotPassword : asyncWrapper(async (req, res, next) => {
     
      const foundUser = await userModel.findOne({ email: req.body.email });
      if (!foundUser) {
          return res.json({error:"Your email is not registered!"});
      };
  
      // Generate token
      const token = jwt.sign({ id: foundUser.id }, process.env.SECRET_key, { expiresIn: "15m" });
  
      // Recording the token to the database
      await otpModel.create({
          token: token,
          user: foundUser._id,
          expirationDate: new Date().getTime() + (60 * 1000 * 5),
      });
  
      const link = `http://localhost:3000/reset-password?token=${token}&id=${foundUser.id}`;
      const emailBody = `Click on the link bellow to reset your password\n\n${link}`;
  
      await sendEmail(req.body.email, "Reset your password", emailBody);
  
      res.status(200).json({
          message: "We sent you a reset password link on your email!",
      });
  }),
  ResetPassword: asyncWrapper(async (req, res, next) => {
    
    const decoded = await jwt.verify(req.body.token, process.env.JWT_SECRET);
    if (!decoded) {
        return res.json({error:"Invalid token!"});
    }

    const recordedToken = await otpModel.findOne({ token: req.body.token });
    
    if (decoded.id!= req.body.id || recordedToken.user!= req.body.id) {
        return res.json({error:"Invalid token!"});
    }

    if (new Date(recordedToken.expirationDate).getTime() < new Date().getTime()) {
        return res.json({error:"Token expired!"});
    }

    // Find user
    const foundUser = await userModel.findById(req.body.id);
    if (!foundUser) {
        return res.json({error:"User not found!"});
    };

    // Deleting the user token
    await otpModel.deleteOne({ token: req.body.token });

    // Harshing the user password
    const hashedPassword = await bcryptjs.hashSync(req.body.password, 10);

    // Updating the user password
    foundUser.password = hashedPassword;

    const savedUser = await foundUser.save();
    if (savedUser) {
        return res.status(200).json({
            message: "Your password has been reset!",
        })
    }
})
}
module.exports = authController