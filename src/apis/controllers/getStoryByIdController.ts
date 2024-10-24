import isValidFirebaseId from "../../helpers/isValidFirebaseId";
import { Request, Response } from "express";
import getStoryByIdService from "../services/getStoryByIdService";

interface Request_params {
    id: string
}

const getStoryByIdController = (
    req: Request,
    res: Response,
) => {
    try {
        const query_params = req.query as unknown as Request_params;
        const {id} = query_params;

        if(!isValidFirebaseId(id)){
            throw new Error("Invalid Firebase Id!");
        }

        const result = getStoryByIdService(id);

        res.status(200).json(result);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({});
    }
}

export default getStoryByIdController;