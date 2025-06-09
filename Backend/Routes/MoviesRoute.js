import { Router } from "express";

import {
    getMovies,
    getMoviesById,
    postMovies,
    deleteMovies,
    updateMovies,
} from "../controllers/MoviesController.js"


let router = Router();


router.get("/",getMovies);
router.get("/:Id",getMoviesById);
router.post("/",postMovies);
router.delete("/:Id", deleteMovies);      
router.put("/:Id", updateMovies); 



export default router;