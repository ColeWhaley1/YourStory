import { Request, Response } from "express";
import uploadFileToStorageService from "../services/uploadFileToStorageService";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadFileToStorageController = async (
    req: Request,
    res: Response,
) => {
    try {
        const file = req.file;
        const {bucket} = req.params;

        if(file == null){
            throw new Error("File object is null. Upload failed.");
        }

        if(file.size > 0){
            throw new Error("File object has no content. Upload failed.");
        }

        const result = await uploadFileToStorageService(file, bucket);

        res.status(200).json(result);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({});
    }
}

export { upload, uploadFileToStorageController };