import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { CiImageOn } from "react-icons/ci";

interface FileUploadProps {
    fileTypes: string[],
    message: string,
    setFile: (file: File | null) => void,
}

const FileUpload: React.FC<FileUploadProps> = ({ fileTypes, message, setFile }) => {

    const [localFile, setLocalFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);

    const onDrop = (acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            setFile(acceptedFiles[0]);
            setLocalFile(acceptedFiles[0]);
        }
    };

    const onDragEnter = (event: React.DragEvent<HTMLElement>) => {
        const fileType = event.dataTransfer?.items[0]?.type;
        const isNotValidFileType = fileType && !fileTypes.includes(fileType);

        if (isNotValidFileType) {
            setError(`${fileType} is not a valid image file type!`);
        } else {
            setError(null);
        }
    };

    // convert input prop files to accept format
    const accept = fileTypes.reduce((acc, fileType) => {
        const [extension] = fileType.split("/");
        if (acc[fileType]) {
            acc[fileType].push(`.${extension}`);
        } else {
            acc[fileType] = [`.${extension}`];
        }
        return acc;
    }, {} as Record<string, string[]>);

    console.log(accept);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        onDragEnter,
        accept,
    });

    return (
        <div className="flex items-center w-full">
            <div
                {...getRootProps()}
                className={`w-full border-dashed border-2 rounded-lg p-16 text-center flex items-center justify-center ${isDragActive ? 'bg-slate-100' : 'bg-slate-50'}`}
            >
                <input {...getInputProps()} />
                <div className="text-xl w-full">

                    <div className="flex flex-col space-y-2">
                        <CiImageOn className="text-primary w-full h-12" />
                        <div className="opacity-70">
                            { isDragActive ? (
                                <div>
                                    Here! Here! Here!
                                </div>
                            ) : (
                                <div>
                                    {message}
                                </div>
                            )}
                        </div>
                    </div>

                    {localFile && <div>File: {localFile.name}</div>}
                </div>
            </div>
        </div>
    );
}

export default FileUpload