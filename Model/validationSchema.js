
const joi = require('joi');

const userSchema = joi.object({
  
    role: joi.string().valid('student', 'admin'),// Role should not be provided by the user
   
}).options({ abortEarly: false });

module.exports = userSchema;