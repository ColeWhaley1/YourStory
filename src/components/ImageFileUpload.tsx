import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

type ImageFileUploadProps = {
  setImageFile: (file: File | null) => void;
  id?: string; 
};

const ImageFileUpload: React.FC<ImageFileUploadProps> = ({ setImageFile, id }) => {
  const [localFile, setLocalFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validFileTypes: string[] = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/bmp',
    'image/webp',
    'image/svg+xml',
  ];

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setImageFile(acceptedFiles[0]);
      setLocalFile(acceptedFiles[0]);
    }
  };

  const onDragEnter = (event: React.DragEvent<HTMLElement>) => {
    const fileType = event.dataTransfer?.items[0]?.type;
    const isNotValidFileType = fileType && !validFileTypes.includes(fileType);

    if (isNotValidFileType) {
      setError(`${fileType} is not a valid image file type!`);
    } else {
      setError(null);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDragEnter,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/gif': ['.gif'],
      'image/bmp': ['.bmp'],
      'image/webp': ['.webp'],
      'image/svg+xml': ['.svg'],
    },
  });

  return (
    <div className="flex items-center">
      <div
        {...getRootProps()}
        className={`max-h-96 border-dashed border-2 rounded-lg p-16 text-center flex items-center justify-center ${isDragActive ? 'bg-slate-100' : 'bg-slate-50'}`}
      >
        <input {...getInputProps()} id={id} /> 
        <div className="text-xl">
          {isDragActive ? (
            <div className="flex flex-col items-center text-center">
              <div>Drop your file here!</div>
              {error && <div className="text-red-500 font-bold">{error}</div>}
            </div>
          ) : (
            <div className="flex flex-col space-y-16">
              <div>Drag and drop your image or click here to select one!</div>
            </div>
          )}
          {localFile && <div>File: {localFile.name}</div>}
        </div>
      </div>
    </div>
  );
};

export default ImageFileUpload;
