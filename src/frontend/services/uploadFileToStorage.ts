interface UploadFileReturnType {
    link: string | null;
    error: string | null;
}

const uploadFileToStorage = async (
    file: File, 
    bucket: string
): Promise<UploadFileReturnType> => {
    try {
        //we have to add file to form data for multer
        const formData = new FormData(); 
        formData.append("file", file);

        const response = await fetch(`${process.env.VITE_API_BASE_URL}/file/${bucket}`, {
            method: "POST",
            body: formData
        });

        if(!response.ok){
            throw new Error("There was a problem uploading the file.");
        }

        const data: string = await response.json();

        console.log(data);
        return {
            link: data || null,
            error: null
        };
    } catch (error: any) {
        console.error(error.message);
        return {
            link: null,
            error: error.message
        };
    }
}

export default uploadFileToStorage;