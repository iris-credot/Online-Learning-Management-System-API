const handleErrors = (err)=>{
    console.log(err.message, err.code);
    let errors ={email:'', password:''};
    if(err.code === 11000){
        errors.email ='The email already exists';
        return errors;
    }
    if(err.message.includes('user validation failed')){
        object.values(err.errors).array.forEach(({properties}) => {
           errors[properties.path] =properties.properties; 
        });
    }
    return errors;
}
module.exports = handleErrors;