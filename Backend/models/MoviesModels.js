import mongoose from "mongoose";


let MoviesSchema = new mongoose.Schema({
  image: String,  
  title: String,
  description: String,
  genre: String,
  year: Number,
  rating: Number,
})


export default mongoose.model("MovieModel",MoviesSchema)