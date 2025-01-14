import { Request, Response } from "express";
import Movie from "../models/movieModel";

export const getMovies = async (req: Request, res: Response) => {
  try {
    const movies = await Movie.find().populate("producer").populate("actors");
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: (error as any).message });
  }
};

export const addMovie = async (req: Request, res: Response) => {
  const { name, year, plot, poster, producer, actors } = req.body;
  try {
    const movie = new Movie({ name, year, plot, poster, producer, actors });
    const savedMovie = await movie.save();

    // Populate the producer and actors fields
    const populatedMovie = await Movie.findById(savedMovie._id)
      .populate("producer")
      .populate("actors");

    res.status(201).json(populatedMovie);
  } catch (error) {
    res.status(400).json({ message: (error as any).message });
  }
};

export const updateMovie = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, year, plot, producer, actors } = req.body;
  try {
    const movie = await Movie.findByIdAndUpdate(
      id,
      { name, year, plot, producer, actors },
      { new: true }
    )
      .populate("producer")
      .populate("actors");

    res.json(movie);
  } catch (error) {
    res.status(400).json({ message: (error as any).message });
  }
};

export const deleteMovie = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Movie.findByIdAndDelete(id);
    res.json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: (error as any).message });
  }
};
