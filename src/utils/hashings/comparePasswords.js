import bcrypt from "bcrypt"

export const comparePass =async({password,hashPassword})=>{
    return  bcrypt.compareSync(password ,hashPassword) 
}