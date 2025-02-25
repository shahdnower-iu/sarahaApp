import { userModel } from "../../DB/models/user.model.js";
import jwt from "jsonwebtoken"
import {generateToken ,verifyToken, encription ,decription,eventEmitter,comparePass ,hashing, asyncHandler } from "../../utils/index.js";
import messageModel from "../../DB/models/message.model.js"



export const signUp = async(req,res,next)=>{
        const {name ,email ,password ,cPassword,gender,role ,phone} =req.body
        //check password
        if (password !==cPassword) {
         return next(Error("password not match",{cause:400}))
        }
         const emailIsExist =await userModel.findOne({email})
         //check email
         if (emailIsExist) {
             return next(Error("email already exist",{cause:409}))
            
         }
         //hashing password
         // use await bec hashing function return promise
         const hash = await hashing({password,SALT_ROUNDS:process.env.SALT_ROUNDS})
        //encrypting phone
        const encryptPhone = await encription({phone,PHONE_ENC: process.env.PHONE_ENC});
        // Send email
     
      eventEmitter.emit("sendEmail",{email})
  
          const user = await userModel.create({name ,email ,password:hash ,gender ,role,phone:encryptPhone})
          return res.status(201).json({msg:"done ",user})
         
     
 }

export const confirmEmail =async(req,res,next)=>{ 
    
        const { token } = req.params;

        if (!token) {
            return next(Error("token not found",{cause:400}))
            
        }
        
        const decoded = await verifyToken ({token,SIGNATURE:process.env.EMAILCONFIRM}); 
        
        if (!decoded?.email) { 
            return next(Error("Invalid token payload",{cause:409}))
            
        }
        
        const user = await userModel.findOneAndUpdate({ email: decoded.email , confirmed:false },
            {confirmed:true}
        );
        if (!user) {
            return next(Error("User not found or already confirmed",{cause:408}))
            
        }
        
        user.confirmed = true;
        await user.save();
        return res.status(201).json({ msg: "done" });
   
} 

export const signIn =async(req,res,next)=>{
    
       const {email ,password } =req.body
       const user =await userModel.findOne({email,confirmed:true})
       if (!user) { 
        return next(Error("invalid email or not confirmed",{cause:400}))
       }
       //check password
       const match = await comparePass({password ,hashPassword:user.password})
       if (!match) {
        return next(Error("invalid password",{cause:409}))
      
       }
       // akteb aly 3ayza asglo w ma3ah al key bta3 al token
        
       const token = await generateToken({
        payload:{email ,id:user._id},
       signature: user.role=="admin"?process.env.secret_Admin:process.env.secret_User ,
       option:{expiresIn:"1h"}   
    })
     
         return res.status(201).json({msg:"done ",token}) 
        
   
}   

export const getProfile = async(req,res,next)=>{
    
       const user= req.user 
       //to return phone "readable" after we encrypted
       const phone = await decription({phoneEncription:user.phone, PHONE_ENC:process.env.PHONE_ENC});
       const messages = await messageModel.find({ userId: req.user._id });
      // spread the user to make the phone and other attributes in one object
      // so phone will over write 
         return res.status(201).json({msg:"done ",...user,phone ,messages})
        
   
}    

export const updateProfile = async(req,res,next)=>{

    if (req.body.phone) {
        // Encrypt phone 34AN AL PHONE 3NDY MT4FR
        req.body.phone = await encription({ key: req.body.phone, PHONE_ENC: process.env.PHONE_ENC });
    }
 
    const user = await userModel.findByIdAndUpdate(req.user._id, req.body, { new: true });

    return res.status(201).json({ message: "done", user });
 
}  
// ---updatePassword---
export const updatePassword =async(req, res, next) => {
    const { oldPassword, newPassword } = req.body;

    // Check old password
    if (!await comparePass({ password: oldPassword, hashPassword: req.user.password })) {
        return next(new Error("Invalid old password", { cause: 400 }));
    }
    // Hash the new password
    const hash = await hashing({ password: newPassword, SALT_ROUNDS: process.env.SALT_ROUNDS });

    // Update user's password
    const user = await userModel.findByIdAndUpdate(req.user._id, { password: hash ,passwordChangedAt:Date.now() }, { new: true });
    return res.status(201).json({ message: "done", user });
};

export const freezAccount =async(req, res, next) => {
    //soft delete
    
    // Update user's password
    const user = await userModel.findByIdAndUpdate(req.user._id, {isDeleted:true ,passwordChangedAt:Date.now() }, { new: true });
    return res.status(201).json({ message: "done", user });
}; 

export const shareProfile =async (req, res, next) => {
    const user = await userModel.findById(req.params.id).select("name email phone");
    
   user? res.status(200).json({ message: "done", user}): next(new Error("User not found", { cause: 404 }));
};