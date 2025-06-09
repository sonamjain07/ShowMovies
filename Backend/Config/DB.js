import mongoose from "mongoose";
import "dotenv/config";


let MongoUri = process.env.Mongo_URI;

export default function  DbConfig()
{
    mongoose.connect(MongoUri).then(()=>{
        console.log("MongoDB connected")
    }).catch((e)=>
    {
        console.log(e)
    })
}