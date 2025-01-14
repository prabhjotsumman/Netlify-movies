"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMovie = exports.updateMovie = exports.addMovie = exports.getMovies = void 0;
const movieModel_1 = __importDefault(require("../models/movieModel"));
const getMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movies = yield movieModel_1.default.find().populate("producer").populate("actors");
        res.json(movies);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getMovies = getMovies;
const addMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, year, plot, poster, producer, actors } = req.body;
    try {
        const movie = new movieModel_1.default({ name, year, plot, poster, producer, actors });
        const savedMovie = yield movie.save();
        // Populate the producer and actors fields
        const populatedMovie = yield movieModel_1.default.findById(savedMovie._id)
            .populate("producer")
            .populate("actors");
        res.status(201).json(populatedMovie);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.addMovie = addMovie;
const updateMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, year, plot, producer, actors } = req.body;
    try {
        const movie = yield movieModel_1.default.findByIdAndUpdate(id, { name, year, plot, producer, actors }, { new: true })
            .populate("producer")
            .populate("actors");
        res.json(movie);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.updateMovie = updateMovie;
const deleteMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield movieModel_1.default.findByIdAndDelete(id);
        res.json({ message: "Movie deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteMovie = deleteMovie;
