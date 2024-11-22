import supabase from "../../supabase";
import { v4 as uuidv4 } from 'uuid';

const uploadFileToStorageService = async (
    file: Express.Multer.File,
    bucket: string
): Promise<string | null> => {
    try {
        const fileExtension = file.originalname.split(".").pop();
        const randomString = uuidv4(); // ensure filenames are unique
        const newFileName = `${Date.now()}-${randomString}.${fileExtension}`;
    
        const { data, error } = await supabase.storage
            .from(bucket)
            .upload( newFileName, file.buffer);
    
        if(error){
            throw new Error("error uploading multer file to supabase storage.");
        }
    
        const linkToFile = supabase.storage
            .from(bucket)
            .getPublicUrl(newFileName).data?.publicUrl;
    
        return linkToFile || null;
    } catch (error: any) {
        console.error(error.message);
        return null;   
    }
}

export default uploadFileToStorageService;