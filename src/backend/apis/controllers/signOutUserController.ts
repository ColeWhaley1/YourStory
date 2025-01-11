import { Request, Response } from "express";
import signOutUserService from "../services/signOutUserService";

const signOutUserController = async (_req: Request, res: Response) => {
    try {

        const response = await signOutUserService();

        if (response.error) {
            throw new Error(response.error);
        }

        res.status(200).json({ success: true, error: null });

    } catch (error: any) {

        res.status(500).json({ 
            success: false, 
            error: error.message
        });
    }
}

export default signOutUserController;