import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: String,
  year: Number,
  rating: Number,
  image: String,
  description: String,
});

export default mongoose.model("MovieDetailModel", movieSchema);
