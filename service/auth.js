const jwt = require("jsonwebtoken")
const secret = "Piyush$1234"

function setUser(user){
    //This si where we are creating a jwt token.
   const payload ={
   _id:user._id,
   email:user.email,
   
   }
    return jwt.sign(payload,secret)
}

function getUser(token){
    if(!token) return null;

try {
    
    return jwt.verify(token , secret)
} catch (error) {
    return null;
}
    
}

module.exports = {
    setUser,
    getUser
}