import { Request, Response } from "express"
import authorExistsService from "../services/authorExistsService"

const authorExistsController = async (req: Request, res: Response) => {
    try {

        const { email } = req.body

        if (!email) {
            throw new Error("Email missing.")
        }

        const response = await authorExistsService(email);

        if (response.error) {
            throw new Error(response.error.message)
        }

        res.status(200).json({
            authorExists: response.authorExists,
            error: null
        })

    } catch (error: any) {
        res.status(500).json({
            authorExists: false,
            error: error.message
        })
    }
}

export default authorExistsController;