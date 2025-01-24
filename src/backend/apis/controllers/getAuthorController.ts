import { Request, Response } from "express"
import getAuthorService from "../services/getAuthorService";

interface QueryParams {
    email?: string,
    user_id?: string
}

const getAuthorController = async (req: Request, res: Response) => {
    try {

        const { email, user_id } = req.query as unknown as QueryParams;

        if (!email && !user_id) {
            throw new Error("Email and user id missing.")
        }

        const response = await getAuthorService(user_id, email);

        if (response.error) {
            throw new Error(response.error)
        }

        res.status(200).json({
            author: response.author,
            error: null
        });


    } catch (error: any) {
        res.status(500).json({
            author: null,
            error: error.message
        })
    }
}

export default getAuthorController;