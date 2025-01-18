import { Request, Response } from "express"
import getAuthorService from "../services/getAuthorService";

interface QueryParams {
    email: string
}

const getAuthorController = async (req: Request, res: Response) => {
    try {

        const { email } = req.query as unknown as QueryParams;

        if (!email) {
            throw new Error("Email missing.")
        }

        const response = await getAuthorService(email);

        if (response.error) {
            throw new Error(response.error)
        }

        res.status(200).json({
            author: response.author,
            error: null
        })

    } catch (error: any) {
        res.status(500).json({
            author: null,
            error: error.message
        })
    }
}

export default getAuthorController;