import { Request, Response } from 'express';
import getStoriesSortedService from '../services/getStoriesSortedService';

interface RequestParams {
    sortedBy: string,
    ascending: boolean,
    top: number,
}

const getStoriesSortedController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {

        const {sortedBy, top} = req.query as unknown as RequestParams;
        const ascending = req.query.ascending == "true" || req.query.ascending == "True";

        const response = await getStoriesSortedService(sortedBy, ascending, top);

        if(response.error){
            throw new Error(response.error);
        }
        
        res.status(200).json({
            stories: response.stories,
            error: null
        });
    } catch (error: any) {
        res.status(500).json({
            stories: [],
            error: error.message
        });
    }
}

export default getStoriesSortedController;