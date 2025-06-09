import MovieDetailModel from "../models/MoviesDetailModel.js"; // ✅ Correct path

export default async function getMovieById(req, res) {
  try {
    const movie = await MovieDetailModel.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ message: "Error fetching movie", error });
  }
}
