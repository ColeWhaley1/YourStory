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

        const base_url = import.meta.env.VITE_API_BASE_URL;

        if(!base_url){
            throw new Error("base url not defined");
        }

        console.log(formData);

        const response = await fetch(`${base_url}/file/${bucket}`, {
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