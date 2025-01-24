import { Request, Response } from 'express';
import getStoriesCountService from '../services/getStoriesCountService';

interface RequestParams {
    id: string
}

const getStoriesCountController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {

        const {id} = req.params as unknown as RequestParams;

        const response = await getStoriesCountService(id);

        if(response.error){
            throw new Error(response.error);
        }
        
        res.status(200).json({
            count: response.count,
            error: null
        })
    } catch (error: any) {
        res.status(500).json({
            count: 0,
            error: error.message
        })
    }
}

export default getStoriesCountController;