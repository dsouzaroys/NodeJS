const jwt = require('jsonwebtoken');

const auth = async(req, res,next)=>{
    const token = req.header('userAuth')

     if(!token){
        return res.status(400).send("Access Denaid")
     }
     try{
         const verified = jwt.verify(token, "1234")
         req.user = verified
         next() 
        
     }
     catch(error){
        res.status(400).send("Invalid Token")
     }
}

module.exports= auth

