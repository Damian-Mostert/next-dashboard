import mongoose from "mongoose";
try{
    mongoose.connect(process.env.MONGODB_URI,{
        user:process.env.MONGODB_USER,
        pass:process.env.MONGODB_PASS,
    })
}catch(e){
    console.error(e)
}