import { Request, Response } from 'express';
import createNewUserService from '../services/createNewUserService';

const createNewUserController = async (req: Request, res: Response) => {
    try {

        // create rate limit

        const { email, password } = req.body;

        const response = await createNewUserService(email, password);

        if (response.error) {
            throw new Error(response.error);
        }

        res.status(200).send({
            id: response,
            error: null
        });
        
    } catch (error: any) {
        console.error(error.message);
        res.status(500).send({
            id: null,
            error: error.message
        });
    }
}

export default createNewUserController;