import { Router } from "express";
import *as userService from "./user.service.js";
import * as auth from "../../../middleware/auth.js";
import { validation } from "../../../middleware/validation.js";
import * as valid from "./user.validation.js";
import { asyncHandler } from "../../utils/index.js";

export const userRouter=Router() 

userRouter.post("/signUp",asyncHandler(validation(valid.signUpSchema)),asyncHandler(userService.signUp) )
userRouter.post("/signIn",asyncHandler(userService.signIn))
userRouter.get("/confirmEmail/:token",asyncHandler(userService.confirmEmail))
userRouter.get("/getProfile",asyncHandler(auth.authentication),asyncHandler(auth.authorization(Object.values(auth.roles))),asyncHandler(userService.getProfile))
userRouter.patch("/update",validation(valid.updateProfileSchema),asyncHandler(auth.authentication),asyncHandler(userService.updateProfile))
userRouter.patch("/update/password",validation(valid.updatePasswordSchema),asyncHandler(auth.authentication),asyncHandler(userService.updatePassword))
userRouter.delete("/freezAccount",validation(valid.freezAccountSchema),asyncHandler(auth.authentication),asyncHandler(userService.freezAccount))
userRouter.get("/shareProfile/:id",validation(valid.shareProfileSchema),asyncHandler(userService.shareProfile))


