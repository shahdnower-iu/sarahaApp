import {userModel} from "../../DB/models/user.model.js"
import messageModel from "../../DB/models/message.model.js"

export const sendMessage = async (req, res, next) => {
    const { content, userId } = req.body;

    const user = await userModel.findOne({ _id: userId, isDeleted: false });
    if (!user) {
        return next(new Error("User not found", { cause: 404 }));
    }

    const createdMessage = await messageModel.create({ content, userId });
    return res.status(201).json({ message: "done", createdMessage });
}; 


export const getMessages =async (req, res, next) => {
   
    const messages = await messageModel.find({ userId: req.user._id })

    return res.status(200).json({ message: "done", messages });
};