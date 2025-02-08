import { Request, Response } from 'express';
import getFollowStatusService from '../services/getFollowStatusService';

interface QueryParams {
    currentId: string,
    targetId: string,
}
const getFollowStatusController = async (req: Request, res: Response) => {
    try {
        
        const queryParams = req.query as unknown as QueryParams; 
        const {currentId, targetId} = queryParams;

        const response = await getFollowStatusService(currentId, targetId);

        if (response.error) {
            throw new Error("Could not fetch follow status");
        }

        res.status(200).json({
            isFollowing: response.isFollowing,
            error: null
        })
    } catch (error: any) {
        res.status(500).json({
            isFollowing: false,
            error: error.message
        })
    }
}

export default getFollowStatusController;