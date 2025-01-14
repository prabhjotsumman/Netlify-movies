import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    name: { type: String, required: true },
    plot: { type: String, required: true },
    poster: { type: String, required: false },
    year: { type: Number, required: true },
    producer: { type: mongoose.Schema.Types.ObjectId, ref: "Producer", required: true },
    actors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Actor" }],
});

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
