import { Request, Response } from "express"
import createNewAuthorService from "../services/createNewAuthorService"

const createNewAuthorController = async (req: Request, res: Response) => {
    try {

        const { id, email, pen_name } = req.body

        if (!id){
            throw new Error("Must have id to create new author.")
        }
        if (!email){
            throw new Error("Email missing.")
        }

        const response = await createNewAuthorService(id, email, pen_name);

        if(response.error){
            throw new Error(response.error)
        }

        res.status(200).json({
            error: null
        })
        
    } catch (error: any) {
        res.status(500).json({
            error: error.message
        })
    }
}

export default createNewAuthorController;