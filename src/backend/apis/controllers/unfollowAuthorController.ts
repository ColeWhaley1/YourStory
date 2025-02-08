import { Request, Response } from "express";
import unfollowAuthorService from "../services/unfollowAuthorService";

interface QueryParams {
    currentId: string,
    targetId: string,
}

const unfollowAuthorController = async (req: Request, res: Response) => {
    try {

        const queryParams = req.query as unknown as QueryParams;
        const {currentId, targetId} = queryParams;

        const response = await unfollowAuthorService(currentId, targetId);

        if (response.error){
            throw new Error("Failed to unfollow author.")
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

export default unfollowAuthorController;