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
exports.deleteActor = exports.updateActor = exports.addActor = exports.getActors = void 0;
const actorModel_1 = __importDefault(require("../models/actorModel"));
const getActors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const actors = yield actorModel_1.default.find();
        res.json(actors);
    }
    catch (error) {
        res.status(500).json({ message: error === null || error === void 0 ? void 0 : error.message });
    }
});
exports.getActors = getActors;
const addActor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, dob, bio, gender } = req.body;
    try {
        const actor = new actorModel_1.default({ name, dob, bio, gender });
        yield actor.save();
        res.status(201).json(actor);
    }
    catch (error) {
        res.status(400).json({ message: error === null || error === void 0 ? void 0 : error.message });
    }
});
exports.addActor = addActor;
const updateActor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, dob, bio } = req.body;
    try {
        const actor = yield actorModel_1.default.findByIdAndUpdate(id, { name, dob, bio }, { new: true });
        res.json(actor);
    }
    catch (error) {
        res.status(400).json({ message: error === null || error === void 0 ? void 0 : error.message });
    }
});
exports.updateActor = updateActor;
const deleteActor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield actorModel_1.default.findByIdAndDelete(id);
        res.json({ message: "Actor deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error === null || error === void 0 ? void 0 : error.message });
    }
});
exports.deleteActor = deleteActor;
