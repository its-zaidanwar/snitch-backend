import  config  from "../config/confg.js";
import mongoose  from "mongoose";


const connectDb = async ()=>{
    try {
        await mongoose.connect(config.MONGO_URI)
        console.log("database is connected");
        
    } catch (error) {
        console.log("database is not working");
        
    }
}

export default connectDb