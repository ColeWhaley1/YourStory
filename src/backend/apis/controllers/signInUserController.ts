import { Request, Response } from "express";
import signInUserService from "../services/signInUserService";

const signInUserController = async (req: Request, res: Response) => {
    try {

        const { email, password } = req.body;

        const response = signInUserService(email, password);

        if (response == null) {
            throw new Error("Failed to sign in user");
        }

        res.status(200).json({ id: response });

    } catch (error: any) {
        console.error(error.message);
        res.status(500).json({ 
            id: null, 
            error: "Failed to sign in user" 
        });
    }
}

export default signInUserController;