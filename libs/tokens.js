const { response } = require("express");
const jwt = require("jsonwebtoken");


module.exports.getToken = function(email){
  return jwt.sign(email, process.env.JWT_SECRET);
}

module.exports.validateToken = function(auth){
  try{
    // auth param has Bearer attached
    const token = auth.split(' ')[1];
    // The decoded token is just the email
    return jwt.verify(token, process.env.JWT_SECRET);
  }
  catch(err){
    response.status(401);
    throw err;
  }
  
  
}


