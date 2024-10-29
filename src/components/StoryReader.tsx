import { useEffect, useState } from 'react';
import { FaCircleXmark } from 'react-icons/fa6';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url
).toString();

interface StoryReaderProps {
    file: File | null;
    scale?: number;
}

interface DocumentLoadEvent {
    numPages: number;
}

const StoryReader: React.FC<StoryReaderProps> = ({ file, scale = 1 }) => {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState<number>(1);

    const onDocumentLoadSuccess = ({ numPages }: DocumentLoadEvent) => {
        setNumPages(numPages);
    };

    useEffect(() => {
        let url: string | null = null;
        if (file) {
            url = URL.createObjectURL(file);

            return () => {
                if (url) {
                    URL.revokeObjectURL(url);
                }
            };
        }
    }, [file]);

    const deleteFile = () => {

    }

    return (
        <div className="outline outline-primary outline-offset-8 rounded-sm outline-2">
            {file ? (
                <div className='relative'>
                    <button onClick={deleteFile} className="absolute top-2 right-2 z-10 flex items-center justify-center opacity-80 rounded-full shadow-md hover:opacity-90">
                        <div className="w-6">
                            <FaCircleXmark className="w-full h-full text-red-700" />
                        </div>
                    </button>
                    <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
                        <Page pageNumber={pageNumber} scale={scale} />
                    </Document>
                    <p>
                        Page {pageNumber} of {numPages}
                    </p>
                    <button
                        disabled={pageNumber <= 1}
                        onClick={() => setPageNumber((prev) => prev - 1)}
                    >
                        Previous
                    </button>
                    <button
                        disabled={pageNumber >= (numPages ?? 0)}
                        onClick={() => setPageNumber((prev) => prev + 1)}
                    >
                        Next
                    </button>
                </div>
            ) : (
                <p>Loading PDF...</p>
            )}
        </div>
    );
};

export default StoryReader;
