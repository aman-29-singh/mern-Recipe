import express from 'express';
import mongoose from 'mongoose';

export const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL)
        .then(()=>{
            console.log('MongoDB Connected' );
        })
    } catch(error){
        console.log(error);
    };
    
}