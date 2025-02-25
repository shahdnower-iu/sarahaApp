import CryptoJS from "crypto-js"
export const decription =async({phoneEncription ,PHONE_ENC=process.env.PHONE_ENC})=>{
    return  await  CryptoJS.AES.decrypt(phoneEncription, PHONE_ENC).toString(CryptoJS.enc.Utf8)
}