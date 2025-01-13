import { Request, Response } from "express"
import userExistsService from "../services/userExistsService"

const userExistsController = async (req: Request, res: Response) => {
    try {

        const { email } = req.body

        if (!email){
            throw new Error("Email missing.")
        }

        const response = await userExistsService(email);

        if(response.error){
            throw new Error(response.error.message)
        }

        res.status(200).json({
            userExists: response.userExists,
            error: null
        })
        
    } catch (error: any) {
        res.status(500).json({
            userExists: false,
            error: error.message
        })
    }
}

export default userExistsController;