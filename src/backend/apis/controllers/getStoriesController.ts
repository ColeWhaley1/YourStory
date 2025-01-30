import { Request, Response } from 'express';
import getStoriesService from '../services/getStoriesService';

interface RequestParams {
    id: string
}

const getStoriesController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {

        const { id } = req.query as unknown as RequestParams;

        const response = await getStoriesService(id);

        if(response.error){
            throw new Error(response.error);
        }
        
        res.status(200).json({
            stories: response.stories,
            error: null
        })
    } catch (error: any) {
        res.status(500).json({
            stories: [],
            error: error.message
        })
    }
}

export default getStoriesController;