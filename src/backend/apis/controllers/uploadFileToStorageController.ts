import { Request, Response } from "express";
import uploadFileToStorageService from "../services/uploadFileToStorageService";

const uploadFileToStorageController = async (
    req: Request,
    res: Response,
) => {
    try {
        const file: Express.Multer.File | undefined = req.file;
        const {bucket} = req.params;

        if(file == null || file == undefined){
            throw new Error(`File object is ${file}. Upload failed.`);
        }

        if(file.size === 0){
            throw new Error("File object has no content. Upload failed.");
        }

        const result = await uploadFileToStorageService(file, bucket);

        res.status(200).json(result);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({});
    }
}

export { uploadFileToStorageController };