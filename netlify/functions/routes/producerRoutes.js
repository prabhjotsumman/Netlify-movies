"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const producerController_1 = require("../controllers/producerController");
const router = express_1.default.Router();
router.get("/getProducers", producerController_1.getProducers);
router.post("/addProducer", producerController_1.addProducer);
router.put("/updateProducer/:id", producerController_1.updateProducer);
router.delete("/deleteProducer/:id", producerController_1.deleteProducer);
exports.default = router;
