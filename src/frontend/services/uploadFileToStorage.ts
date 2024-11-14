interface UploadFileReturnType {
    link: string | null;
    error: string | null;
}

const uploadFileToStorage = (
    file: File
): UploadFileReturnType => {
    try {


        return {
            link: '',
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