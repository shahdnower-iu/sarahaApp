import nodemailer from "nodemailer";

export const sendEmail=async(to ,subject,html,attachments)=>{
    const transporter = nodemailer.createTransport({
      service :"gmail",
      auth: { //add to env
        user: "shahdnower770@gmail.com",
        pass: "xdgyafcgunuqzpsx",
      },
    }); 
    
    
    
      
      const info = await transporter.sendMail({ 
        from: '"sarahaApp" <shahdnower770@gmail.com>', 
        to:to?to: "shahdnower055@gmail.com", 
        subject: subject?subject:"Hello ✔", 
        html: html?html: "<b>Hello world?</b>", 
        attachments:attachments?attachments:[]
      });
     
      console.log("Message sent: %s", info);
    
    if(info.accepted.length){
        return true ;
    }
     return false ;
   
}
 