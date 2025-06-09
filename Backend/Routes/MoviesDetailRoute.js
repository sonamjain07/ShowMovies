import express from "express";
import getMovieById  from "../controllers/MoviesDetailController.js";
const router = express.Router();

// GET single movie by ID
router.get("/movies/:id", getMovieById);

export default router;
