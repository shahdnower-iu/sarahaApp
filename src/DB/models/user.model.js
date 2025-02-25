import mongoose from "mongoose";
import { roles } from "../../../middleware/auth.js";

export const enumGender={
    female:"female",
    male:"male" ,
    Female:"Female",
    Male:"male" 
}
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,"name is required"] ,
        lowercase: true,
        minLength:[3,"name is short"],
        maxLength: [10,"name is too long"]
    },
    email: {
        type: String,
        required: [true,"Email is required"],
        lowercase: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
     password: {
        type: String,
        required: [true,"password is required"],
        minLength: 8
    },
    phone: {
        type: String,
        required: [true,"phone number is required"]
    },
    gender: {
        type: String,
        required: [true,"gender is required"],
        enum: Object.values(enumGender)
    },
    confirmed: {
        type: Boolean,
        default: false
    }
    ,role:{
        type: String,
        enum:Object.values(roles),
        default: roles.user
    },
    passwordChangedAt:Date  ,
    isDeleted: {
        type: Boolean,
        default: false
    }
},{
    timestamps:true
})


export const userModel =mongoose.models.user|| mongoose.model("user",userSchema)