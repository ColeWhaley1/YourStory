import { Request, Response } from "express";
import signInUserService from "../services/signInUserService";

const signInUserController = async (req: Request, res: Response) => {
    try {

        const { email, password } = req.body;

        const response = await signInUserService(email, password);

        if (response.error) {
            throw new Error(response.error);
        }

        res.status(200).json({ id: response, error: null });

    } catch (error: any) {
        console.error(error.message);
        res.status(500).json({ 
            id: null, 
            error: error.message
        });
    }
}

export default signInUserController;