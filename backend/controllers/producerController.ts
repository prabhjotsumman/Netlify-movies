import { Request, Response } from "express";
import Producer from "../models/producerModel";

const handleErrorResponse = (res: Response, error: unknown, statusCode: number) => {
    res.status(statusCode).json({ message: (error as any).message });
};

export const getProducers = async (req: Request, res: Response) => {
    try {
        const producers = await Producer.find();
        res.json(producers);
    } catch (error) {
        handleErrorResponse(res, error, 500);
    }
};

export const addProducer = async (req: Request, res: Response) => {
    const { name, dob, bio, gender } = req.body;
    try {
        const producer = new Producer({ name, dob, bio, gender });
        await producer.save();
        res.status(201).json(producer);
    } catch (error) {
        handleErrorResponse(res, error, 400);
    }
};

export const updateProducer = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, gender, dob, bio } = req.body;
    try {
        const producer = await Producer.findByIdAndUpdate(id, { name, gender, dob, bio }, { new: true });
        res.json(producer);
    } catch (error) {
        handleErrorResponse(res, error, 400);
    }
};

export const deleteProducer = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await Producer.findByIdAndDelete(id);
        res.json({ message: "Producer deleted successfully" });
    } catch (error) {
        handleErrorResponse(res, error, 500);
    }
};
