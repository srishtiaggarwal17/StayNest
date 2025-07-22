import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    // _id:{
    //     type:String,
    //     required:true
    // },
    fullname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    image:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['user','hotelOwner'],
        required:true,
    },
    // recentSearchedCities:[{type:String,required:true}]
},{timestamps:true});

export const User=mongoose.model('User',userSchema);