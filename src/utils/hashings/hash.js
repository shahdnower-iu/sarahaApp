import bcrypt from "bcrypt"

export const hashing =async({password,SALT_ROUNDS=process.env.SALT_ROUNDS })=>{
    return  await  bcrypt.hashSync(password,Number(SALT_ROUNDS))
}