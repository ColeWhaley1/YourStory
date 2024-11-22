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

        const response = await uploadNewStoryService(story);

        res.status(200).json({
            success: response
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false
        });
    }
}

export { uploadNewStoryController };