"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const actorController_1 = require("../controllers/actorController");
const router = express_1.default.Router();
router.get("/getActors", actorController_1.getActors);
router.post("/addActor", actorController_1.addActor);
router.put("/updateActor/:id", actorController_1.updateActor);
router.delete("/deleteActor/:id", actorController_1.deleteActor);
exports.default = router;
