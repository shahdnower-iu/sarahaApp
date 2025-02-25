
 import jwt from "jsonwebtoken"
import { userModel } from "../src/DB/models/user.model.js"

export const roles={
    user:"user",
    admin:"admin"
}

// h5leha yrg3 function  34an ab3tlo meen y2dr yd5ol 3ady 
 export  const authentication=async(req ,res,next)=>{
    
      
        const {authorization} =req.headers
        
            // check it user or admin
         const [prefix, token] = authorization.split(" ") || [];
         if (!prefix ||!token) {
            return next(Error("token not found",{cause:401}))
           
         }
         console.log({ prefix, token });
            let SIGNATURE_TOKEN = undefined;

        if (prefix== "admin") {
            SIGNATURE_TOKEN =process.env.secret_Admin;
        } else if (prefix=="bearer") {
        SIGNATURE_TOKEN =process.env.secret_User;
       }else{
        return next(Error("prefix not valid",{cause:401}))
        
       }
            //check token 
              // b70t al key w yrga3ly fy object aly gowa al token
     const decoded= jwt.verify(token,SIGNATURE_TOKEN)//{}
            
     if (!decoded?.id) {
                return next(Error("invalid id payload",{cause:400}))
             
     }
            // dont show password and use lean to return object after using spread "..."
            // const user =await userModel.findOne({email:decoded.email}).select("-password").lean()
            const user =await userModel.findById(decoded.id).lean()
      if (!user) {
                return next(Error("user not found ",{cause:400}))
             
       }

       if (user?.isDeleted) {
        return next(new Error("User deleted", { cause: 401 }));
    }
       if (parseInt(user?.passwordChangedAt?.getTime() / 1000) > decoded.iat) {
        return next(new Error("Token expired, please login again", { cause: 401 }));
    }   
            // add user to req to transport it to the next method as"getProfile"
            // ALSO IT  ADD _ID TO REQ
        req.user= user ;   
         
        next() ;
 }

 export  const authorization=(accessRoles=[])=>{
    return async(req ,res,next)=>{
    
      
            //bec authentication return  req.user= user 
            if (!accessRoles.includes(req.user.role)) {
                return next(Error("Access denied",{cause:400}))
                
            }
            // add user to req to transport it to the next method as"getProfile"

          
        next()
    
  
    
 }}