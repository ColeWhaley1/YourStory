import { Request, Response } from "express";
import uploadFileToStorageService from "../services/uploadFileToStorageService";

interface Request_params {
    file: File | null
}

const uploadFileToStorageController = async (
    req: Request,
    res: Response,
) => {
    try {
        const {file} = req.params as unknown as Request_params;

        if(file == null){
            throw new Error("File object is null. Upload failed.");
        }

        if(file.size > 0){
            throw new Error("File object has no content. Upload failed.");
        }

        const result = await uploadFileToStorageService(file);

        res.status(200).json(result);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({});
    }
}

export default uploadFileToStorageController;