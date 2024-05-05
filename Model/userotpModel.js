const mongoose = require('mongoose');

const userOtpAuthentication = new mongoose.Schema({
   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
   token: {type:String},
   createdAt: {type:Date},
   expirationDate:{type: Date,
      required: true}
  
  
},{timestamps:true});


module.exports = mongoose.model('UserOtp', userOtpAuthentication);
 