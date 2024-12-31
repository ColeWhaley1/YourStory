import { Request, Response } from "express";
import uploadNewStoryService from "../services/uploadNewStoryService";
import { Story } from "../../../types/story";

interface Request_params {
    story: Story
}

const uploadNewStoryController = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {

        const { story } = req.body as unknown as Request_params;

        const response: string | null = await uploadNewStoryService(story);

        if(response === null){
            throw new Error("Could not upload story to DB.");
        }

        res.status(200).json({
            id: response,
            error: null
        });
        
    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            id: null,
            error: error.message
        });
    }
}

export { uploadNewStoryController };