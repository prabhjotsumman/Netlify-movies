import { Request, Response } from "express";
import Actor from "../models/actorModel";

const handleErrorResponse = (res: Response, error: unknown, statusCode: number) => {
    res.status(statusCode).json({ message: (error as any)?.message });
};

export const getActors = async (req: Request, res: Response) => {
    try {
        const actors = await Actor.find();
        res.json(actors);
    } catch (error) {
        handleErrorResponse(res, error, 500);
    }
};

export const addActor = async (req: Request, res: Response) => {
    const { name, dob, bio, gender } = req.body;
    try {
        const actor = new Actor({ name, dob, bio, gender });
        await actor.save();
        res.status(201).json(actor);
    } catch (error) {
        handleErrorResponse(res, error, 400);
    }
};

export const updateActor = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, dob, bio } = req.body;
    try {
        const actor = await Actor.findByIdAndUpdate(id, { name, dob, bio }, { new: true });
        res.json(actor);
    } catch (error) {
        handleErrorResponse(res, error, 400);
    }
};

export const deleteActor = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await Actor.findByIdAndDelete(id);
        res.json({ message: "Actor deleted successfully" });
    } catch (error) {
        handleErrorResponse(res, error, 500);
    }
};