
import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    username:{
        type : String
     },
    password: {
        type : String
     },
    email: {
        type : String
     },
    },
    {timestamps: true}
  );