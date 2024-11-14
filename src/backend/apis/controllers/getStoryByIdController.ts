import { Request, Response } from 'express';
import getStoryByIdService from '../services/getStoryByIdService';
import {ReturnType as ServiceReturnType} from '../services/getStoryByIdService';

interface RequestParams {
    id: string
}

const getStoryByIdController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {

        const {id} = req.params as unknown as RequestParams;

        const response: ServiceReturnType = await getStoryByIdService(id);

        if(response.error){
            throw new Error(response.error);
        }
        
        res.status(200).json({
            story: response.story,
            error: null
        })
    } catch (error: any) {
        console.error(error.message);
        res.status(500).json({
            story: null,
            error: error.message
        })
    }
}

export default getStoryByIdController;