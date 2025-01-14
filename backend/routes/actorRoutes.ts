import express from "express";
import { getActors, addActor, updateActor, deleteActor } from "../controllers/actorController";

const router = express.Router();

router.get("/getActors", getActors);
router.post("/addActor", addActor);
router.put("/updateActor/:id", updateActor);
router.delete("/deleteActor/:id", deleteActor);

export default router;
