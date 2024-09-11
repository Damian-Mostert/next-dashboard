import mongoose from "mongoose";
try{
    mongoose.connect(process.env.MONGODB_URL,{
        user:process.env.MONGODB_USER,
        pass:process.env.MONGODB_PASS,
    })
}catch(e){}