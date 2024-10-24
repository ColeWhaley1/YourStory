import isValidFirebaseId from "../../helpers/isValidFirebaseId";
import { Request, Response } from "express";
import getStoryByIdService from "../services/getStoryByIdService";

const getStoryByIdController = async (
    req: Request,
    res: Response,
) => {
    try {
        const {id} = req.params;

        if(!isValidFirebaseId(id)){
            throw new Error("Invalid Firebase Id!");
        }

        const result = await getStoryByIdService(id);

        res.status(200).json(result);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({});
    }
}

export default getStoryByIdController;