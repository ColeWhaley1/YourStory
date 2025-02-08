import { Request, Response } from "express";
import followAuthorService from "../services/followAuthorService";

interface QueryParams {
    currentId: string,
    targetId: string,
}

const followAuthorController = async (req: Request, res: Response) => {
    try {

        const queryParams = req.query as unknown as QueryParams;
        const {currentId, targetId} = queryParams;

        const response = await followAuthorService(currentId, targetId);

        if (response.error){
            throw new Error("Failed to follow author.")
        }

        res.status(200).json(
            {
                error: null
            }
        );
        
    } catch (error: any) {
        res.status(500).json(
            {
                error: error.message
            }
        );
    }
}

export default followAuthorController;