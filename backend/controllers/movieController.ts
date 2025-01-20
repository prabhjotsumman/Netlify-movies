import { Request, Response } from "express";
import Movie from "../models/movieModel";

const handleErrorResponse = (res: Response, error: unknown, statusCode: number = 500) => {
  res.status(statusCode).json({ message: (error as any).message });
};

export const getMovies = async (req: Request, res: Response) => {
  try {
    const movies = await Movie.find().populate("producer").populate("actors");
    res.json(movies);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const addMovie = async (req: Request, res: Response) => {
  const { name, year, plot, poster, producer, actors } = req.body;
  try {
    const movie = new Movie({ name, year, plot, poster, producer, actors });
    const savedMovie = await movie.save();
    const populatedMovie = await Movie.findById(savedMovie._id)
      .populate("producer")
      .populate("actors");
    res.status(201).json(populatedMovie);
  } catch (error) {
    handleErrorResponse(res, error, 400);
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
    handleErrorResponse(res, error, 400);
  }
};

export const deleteMovie = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Movie.findByIdAndDelete(id);
    res.json({ message: "Movie deleted successfully" });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};
