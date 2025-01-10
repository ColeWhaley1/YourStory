import { Request, Response } from 'express';
import createNewUserService from '../services/createNewUserService';

const createNewUserController = async (req: Request, res: Response) => {
    try {

        const { email, password } = req.body;

        const response = createNewUserService(email, password);

        if (!response) {
            throw new Error("Failed to create new user");
        }

        res.status(200).send({
            id: response
        });
        
    } catch (error: any) {
        console.error(error.message);
        res.status(500).send("Failed to create new user");
    }
}

export default createNewUserController;