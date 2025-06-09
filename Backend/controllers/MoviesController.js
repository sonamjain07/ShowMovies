import MoviesModels from "../models/MoviesModels.js";

export async function getMovies(req, res) {
  try {
    let Data = await MoviesModels.find();
    res.status(200).json(Data);
  } catch (e) {
    res.status(400).json(e);
  }
}

export async function getMoviesById(req, res) {
  try {
    let Data = await MoviesModels.findById(req.params.Id);
    res.status(200).json(Data);
  } catch (e) {
    res.status(400).json(e);
  }
}

export async function postMovies(req, res) {
  try {
    let Data = new MoviesModels(req.body);
    await Data.save();
    res.status(200).json(Data);
  } catch (e) {
    res.status(400).json(e);
  }
}

export async function deleteMovies(req, res) {
  try {
    let Data = await MoviesModels.findByIdAndDelete(req.params.Id);
    res
      .status(200)
      .json({ message: "Movie deleted successfully", deleted: Data });
  } catch (e) {
    res.status(400).json(e);
  }
}

export async function updateMovies(req, res) {
  try {
    let Data = await MoviesModels.findByIdAndUpdate(req.params.Id, req.body, {
      new: true,
    });
    res
      .status(200)
      .json({ message: "Movie updated successfully", updated: Data });
  } catch (e) {
    res.status(400).json(e);
  }
}
