import { useEffect, useState } from 'react';
import { FaCircleXmark } from 'react-icons/fa6';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import { FaArrowCircleLeft } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";

import Loading from "../assets/lottie_animations/loading.json";
import Lottie from 'lottie-react';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url
).toString();

interface StoryReaderProps {
    file: File | null;
    setFile: React.Dispatch<React.SetStateAction<File | null>>;
    scale?: number;
}

interface DocumentLoadEvent {
    numPages: number;
}

const StoryReader: React.FC<StoryReaderProps> = ({ file, setFile, scale = 1 }) => {
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

    useEffect(() => {
        const pageNumberInput = document.getElementById("pageNumberInput");
        if(pageNumberInput){
            pageNumberInput.innerHTML = pageNumber.toString();
        }
    }, [pageNumber])

    const deleteFile = () => {
        setFile(null);
    }

    return (
        <div className="">
            <div className='relative'>
                <div className='outline outline-primary outline-offset-8 rounded-sm outline-2'>
                    <button onClick={deleteFile} className="absolute top-2 right-2 z-10 flex items-center justify-center opacity-80 rounded-full shadow-md hover:opacity-90">
                        <div className="w-6">
                            <FaCircleXmark className="w-full h-full text-red-700" />
                        </div>
                    </button>
                    <Document file={file} onLoadSuccess={onDocumentLoadSuccess}
                        loading={
                            <div className='flex items-center justify-center w-96 h-96'>
                                <Lottie animationData={Loading} className='max-w-24' />
                            </div>
                        }>
                        <Page pageNumber={pageNumber} scale={scale} />
                    </Document>
                    
                    <div className='flex justify-center'>
                        <div className='flex space-x-8 justify-center bg-gray-100 rounded-full p-4'>
                            <button
                                disabled={pageNumber <= 1}
                                onClick={() => setPageNumber((prev) => prev - 1)}
                            >
                                <FaArrowCircleLeft className='text-secondary w-6 h-6'/>
                            </button>
                            <div className='flex items-center'>
                                <p>
                                    Page 
                                </p>
                                <div>
                                    <input id="pageNumberInput" type="text" className='w-8 text-center border-2 border-primary rounded-lg mx-1' defaultValue={pageNumber}/>
                                </div>
                                <div>
                                    of {numPages}
                                </div>
                            </div>
                            <button
                                disabled={pageNumber >= (numPages ?? 0)}
                                onClick={() => setPageNumber((prev) => prev + 1)}
                            >
                                <FaArrowCircleRight className='text-secondary w-6 h-6'/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default StoryReader;
