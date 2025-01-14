import express from "express";
import { getMovies, addMovie, updateMovie, deleteMovie } from "../controllers/movieController";

const router = express.Router();

router.get("/getMovies", getMovies);
router.post("/addMovie", addMovie);
router.put("/updateMovie/:id", updateMovie);
router.delete("/deleteMovie/:id", deleteMovie);

export default router;
