import express from "express";
import {
  getProducers,
  addProducer,
  deleteProducer,
  updateProducer,
} from "../controllers/producerController";

const router = express.Router();

router.get("/getProducers", getProducers);
router.post("/addProducer", addProducer);
router.put("/updateProducer/:id", updateProducer);
router.delete("/deleteProducer/:id", deleteProducer);

export default router;
