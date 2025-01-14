import { Request, Response } from "express";
import Actor from "../models/actorModel";

export const getActors = async (req: Request, res: Response) => {
    try {
        const actors = await Actor.find();
        res.json(actors);
    } catch (error) {
        res.status(500).json({ message: (error as any)?.message });
    }
};

export const addActor = async (req: Request, res: Response) => {
    const { name, dob, bio, gender } = req.body;
    try {
        const actor = new Actor({ name, dob, bio, gender });
        await actor.save();
        res.status(201).json(actor);
    } catch (error) {
        res.status(400).json({ message: (error as any)?.message });
    }
};

export const updateActor = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, dob, bio } = req.body;
    try {
        const actor = await Actor.findByIdAndUpdate(id, { name, dob, bio }, { new: true });
        res.json(actor);
    } catch (error) {
        res.status(400).json({ message: (error as any)?.message });
    }
};

export const deleteActor = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await Actor.findByIdAndDelete(id);
        res.json({ message: "Actor deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: (error as any)?.message });
    }
};