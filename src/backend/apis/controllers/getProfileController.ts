import {Request, Response} from "express";
import getProfileService from "../services/getProfileService";

interface QueryParams {
    id: string
}

const getProfileController = async (req: Request, res: Response) => {
    try {

        const { id } = req.query as unknown as QueryParams;

        const response = await getProfileService(id);

        if (response.error){
            throw new Error(response.error);
        }

        res.status(200).json({
            profile: response.profile,
            error: null
        });
        
    } catch (error:any) {
        res.status(500).json({
            profile: null,
            error: error.message
        });
    }
}

export default getProfileController;