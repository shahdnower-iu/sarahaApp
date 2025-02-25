import CryptoJS from "crypto-js"
export const encription =async({phone ,PHONE_ENC=process.env.PHONE_ENC})=>{
    return  await   CryptoJS.AES.encrypt(phone,PHONE_ENC).toString();
}