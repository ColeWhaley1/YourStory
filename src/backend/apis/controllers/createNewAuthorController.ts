import { Request, Response } from "express"
import createNewAuthorService from "../services/createNewAuthorService"

const createNewAuthorController = async (req: Request, res: Response) => {
    try {

        const { id, email, bio, penName, avatarUrl } = req.body

        if (!id){
            throw new Error("Must have id to create new author.")
        }
        if (!email){
            throw new Error("Email missing.")
        }

        const response = await createNewAuthorService(id, email, bio, penName == "" ? "Anonymous" : penName, avatarUrl);

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