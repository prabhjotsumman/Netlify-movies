"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const movieSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    plot: { type: String, required: true },
    poster: { type: String, required: false },
    year: { type: Number, required: true },
    producer: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Producer", required: true },
    actors: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Actor" }],
});
const Movie = mongoose_1.default.model("Movie", movieSchema);
exports.default = Movie;
