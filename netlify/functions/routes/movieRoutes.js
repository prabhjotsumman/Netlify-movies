"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const movieController_1 = require("../controllers/movieController");
const router = express_1.default.Router();
router.get("/getMovies", movieController_1.getMovies);
router.post("/addMovie", movieController_1.addMovie);
router.put("/updateMovie/:id", movieController_1.updateMovie);
router.delete("/deleteMovie/:id", movieController_1.deleteMovie);
exports.default = router;
