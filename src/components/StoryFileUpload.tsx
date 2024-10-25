import { useState } from 'react';
import { useDropzone } from 'react-dropzone'

const StoryFileUpload = ({ setStoryFile }: { setStoryFile: (file: File | null) => void }) => {

    const [localFile, setLocalFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);

    const validFileTypes: string[] = ['application/pdf', 'text/plain'];


    const onDrop = (acceptedFiles: File[]) => {

        if (acceptedFiles.length > 0) {
            setStoryFile(acceptedFiles[0]);
            setLocalFile(acceptedFiles[0]);
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
        <div className="flex items-center">
            <div {...getRootProps()} className={`max-h-96 aspect-square border-dashed border-2 rounded-lg p-16 text-center flex items-center justify-center ${isDragActive ? "bg-slate-100" : "bg-slate-50"}`}>
                <input {...getInputProps()} />
                <div className='text-xl'>
                    {
                        isDragActive ? (
                            <div className='flex flex-col items-center text-center'>
                                <div>Drop your file here!</div>
                                {error && (
                                    <div className='text-red-500 font-bold'>{error}</div>
                                )}
                            </div>
                        ) : (
                            <div className='flex flex-col space-y-16'>
                                <div>Drag and drop your story or click here to select one!</div>
                                <div>Your story must be of type pdf or txt.</div>
                            </div>
                        )
                    }
                    {
                        localFile && (
                            <div>File: {localFile.name}</div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default StoryFileUpload;