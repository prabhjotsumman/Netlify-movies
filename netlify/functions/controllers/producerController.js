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
exports.deleteProducer = exports.updateProducer = exports.addProducer = exports.getProducers = void 0;
const producerModel_1 = __importDefault(require("../models/producerModel"));
const getProducers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const producers = yield producerModel_1.default.find();
        res.json(producers);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getProducers = getProducers;
const addProducer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, dob, bio, gender } = req.body;
    try {
        const producer = new producerModel_1.default({ name, dob, bio, gender });
        yield producer.save();
        res.status(201).json(producer);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.addProducer = addProducer;
const updateProducer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, gender, dob, bio } = req.body;
    try {
        const producer = yield producerModel_1.default.findByIdAndUpdate(id, { name, gender, dob, bio }, { new: true });
        res.json(producer);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.updateProducer = updateProducer;
const deleteProducer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield producerModel_1.default.findByIdAndDelete(id);
        res.json({ message: "Producer deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteProducer = deleteProducer;
