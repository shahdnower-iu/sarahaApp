import { EventEmitter } from "events";
import jwt from 'jsonwebtoken';
import { sendEmail } from "../../service/sendEmail.js";
import { generateToken } from "../token/generateToken.js";

export const eventEmitter = new EventEmitter();

eventEmitter.on("sendEmail", async ({ email }) => {
    try {
        // Generate token
        const token = await generateToken({
            payload: { email },
            signature: process.env.EMAILCONFIRM,
            option: { expiresIn: "1h" }
        });

        // Create confirmation link
        const link = `http://localhost:${process.env.PORT}/users/confirmEmail/${token}`;

        // Send email
        await sendEmail(email, "Confirm Email", `<a href='${link}'>Confirm Me</a>`);
    } catch (error) {
        console.error("Error in sendEmail event handler:", error);
    }
});