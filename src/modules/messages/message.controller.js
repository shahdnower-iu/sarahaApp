import { Router } from "express";
import * as MS from "./message.service.js";
import { validation } from "../../../middleware/validation.js";
import * as v from "./message.validation.js";
import { asyncHandler } from "../../utils/index.js";
import { authentication } from "../../../middleware/auth.js";

const messageRouter = Router();

messageRouter.post("/",validation(v.sendMessageSchema),asyncHandler(MS.sendMessage) );
messageRouter.get("/",asyncHandler(authentication),asyncHandler(MS.getMessages) );

export default messageRouter; 