import { useState } from 'react';
import Dropzone, { useDropzone } from 'react-dropzone'

const MyStoriesPage = () => {

    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);

    const validFileTypes: string[] = ['application/pdf', 'text/plain'];


    const onDrop = (acceptedFiles: File[]) => {

        if (acceptedFiles.length > 0) {

            // if(!validFileTypes.includes(acceptedFileType)){
            //     setError(`${acceptedFileType} is an invalid file type! Try converting to pdf or txt.`);
            // }

            setFile(acceptedFiles[0]);
        }
    }

    const onDragEnter = (event: React.DragEvent<HTMLElement>) => {
        const fileType = event.dataTransfer?.items[0]?.type;

        const isNotValidFileType = fileType && !validFileTypes.includes(fileType);

        if (isNotValidFileType) {
            setError(`${fileType} is an invalid file type! Try converting to pdf or txt.`);
        } else {
            setError(null);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        onDragEnter,
        accept: { 'application/pdf': ['.pdf'], 'text/plain': ['.txt'] },
    });

    return (
        <div className="m-14 flex items-center justify-center">
            <div {...getRootProps()} className={`w-2/5 aspect-square border-dashed border-2 rounded-lg p-4 text-center flex items-center justify-center ${isDragActive ? "bg-slate-100" : "bg-slate-50"}`}>
                <input {...getInputProps()} />
                <div>
                    {
                        isDragActive ? (
                            <div className='flex flex-col items-center text-center'>
                                <div>Drop your file here!</div>
                                {error && (
                                    <div className='text-red-500 font-bold'>{error}</div>
                                )}
                            </div>
                        ) : (
                            <div>
                                <div>Drag and drop your story or click here to select one!</div>
                                <div>Your story must be of type pdf or txt.</div>
                            </div>
                        )
                    }
                    {
                        file && (
                            <div>File: {file.name}</div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default MyStoriesPage;