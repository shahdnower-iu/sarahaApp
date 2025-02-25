
import { checkDbConnection } from "./DB/connectionDB.js";
import {userRouter}  from "./modules/users/user.controller.js";
import { config } from "dotenv"
import { globalErrorHandling } from "./utils/error/index.js";
import messageRouter from "./modules/messages/message.controller.js";
import cors from "cors"

config() 

console.log("PORT:", process.env.PORT); 

const bootstrap = async (app, express) => {
    app.use(cors())
    await checkDbConnection()
    app.use(express.json())
   
    app.use("/users",userRouter)
    app.use("/messages",messageRouter)
   
    app.use("*",(req,res,next)=>{
        return next(Error(`invalid url ${req.originalUrl}`))
       
    })
   
    app.use(globalErrorHandling);
};
export default bootstrap
