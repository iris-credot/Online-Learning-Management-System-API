const jwt = require ('jsonwebtoken');
const userModel = require('../Model/userModel');


const verifier = process.env.SECRET_KEY

const requireAuth ={
 AuthJWT : async(req,res,next) => {
  const authorizationHeader = req.headers.authorization;
  
  
  if (authorizationHeader) {
      const parts = authorizationHeader.split(' ');
      if (parts.length === 2 && parts[0] === 'Bearer') {
          token = parts[1];
      }
  } 
  if(!token){
    token = req.cookies.jwt;
    // console.log(token);
  }
  if (!token) {
    res.status(401).json({ error: 'Authentication required. Please log in.' });
    return;
  }
  
  if (token) {
    jwt.verify(token, verifier, (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: 'Failed to authenticate token, Please Login again' });
      }
      const { userId ,role , name } = decoded;
      
      req.userId = userId;
      req.role = role;
      req.name = name;

      next();
    });
  } else {
    res.status(401).json({ error: 'You need to login to access this resource; Please login or create an account' });
  }
},

adminJWT : async(req,res,next) => {
    
  const authorizationHeader = req.headers.authorization;
  
  
  if (authorizationHeader) {
      const parts = authorizationHeader.split(' ');
      if (parts.length === 2 && parts[0] === 'Bearer') {
          token = parts[1];
      }
  } 
  if(!token){
    token = req.cookies.jwt;
    // console.log(token);
  }
if (!token) {
  res.status(401).json({ error: 'Authentication required. Please log in.' });
  return;
}

if (token) {
  jwt.verify(token, verifier, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Failed to authenticate token, Please Login again' });
    }
    const { userId ,role , name } = decoded;
    
    req.userId = userId;
    req.role = role;
    req.name = name;

    if (role === 'admin') {
      next();
    } else {
       res.status(401).json({ error: 'You are not authorised to access this route; Please contact the site administrator' });
    }
  });
} else {
  res.status(401).json({ error: 'You need to login to access this resource; Please login or create an account' });
}
},
};
  module.exports =requireAuth;

  




