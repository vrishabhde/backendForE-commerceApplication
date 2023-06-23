import mongoose from "mongoose";
import { Schema } from "mongoose";


const newuser = new Schema({

    role: String,
    email: String,
    password: String,
    pin: String,
   
});

export default mongoose.model("Users", newuser);