import { useEffect, useState } from 'react';
import { FaCircleXmark } from 'react-icons/fa6';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
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
    const [pageInput, setPageInput] = useState<string>('1');
    const [fadeIn, setFadeIn] = useState<boolean>(false);

    const onDocumentLoadSuccess = ({ numPages }: DocumentLoadEvent) => {
        setNumPages(numPages);
        setPageNumber(1);
    };

    const deleteFile = () => {
        setFile(null);
    };

    const onPageInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        const num = Number(input);
        if (input === '' || (!isNaN(num) && num >= 1 && (numPages == null || num <= numPages))) {
            setPageInput(input);
        }
    };

    const onPageInputBlur = () => {
        const num = Number(pageInput);
        if (!isNaN(num) && num >= 1 && (numPages == null || num <= numPages)) {
            setPageNumber(num);
        } else {
            setPageInput(pageNumber.toString());
        }
    };

    const onPageInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onPageInputBlur();
        }
    };

    useEffect(() => {
        setPageInput(pageNumber.toString());
        transitionPages();
    }, [pageNumber]);

    const transitionPages = () => {
        setFadeIn(true);
        setTimeout(() => setFadeIn(false), 200);
    };
    
    const goToPage = (newPage: number) => {
        if (!fadeIn) {
            setPageNumber(newPage);
            transitionPages();
        }
    };
    
    return (
        <div>
            <div className="relative">
                <div className="outline outline-primary outline-offset-8 rounded-sm outline-2">
                    <button
                        onClick={deleteFile}
                        className="absolute top-2 right-2 z-30 flex items-center justify-center opacity-80 rounded-full shadow-md hover:opacity-90"
                    >
                        <FaCircleXmark className="w-6 h-6 text-red-700" />
                    </button>
                    <Document
                        file={file}
                        onLoadSuccess={onDocumentLoadSuccess}
                        loading={
                            <div className="flex items-center justify-center w-96 h-96">
                                <Lottie animationData={Loading} className="max-w-24" />
                            </div>
                        }
                    >
                        <div className="flex items-center justify-center relative">
                            {/* Keep the current page mounted and manage visibility */}
                            <div className={`z-20 ${fadeIn ? 'fade' : ''}`}>
                                <Page pageNumber={pageNumber} scale={scale} />
                            </div>
    
                            {/* Previous page */}
                            {pageNumber > 1 && (
                                <div className="absolute z-10 opacity-0 pointer-events-none">
                                    <Page pageNumber={pageNumber - 1} scale={scale * 0.8} />
                                </div>
                            )}
    
                            {/* Next page */}
                            {pageNumber < (numPages ?? 0) && (
                                <div className="absolute z-10 opacity-0 pointer-events-none">
                                    <Page pageNumber={pageNumber + 1} scale={scale * 0.8} />
                                </div>
                            )}
                        </div>
                    </Document>
    
                    <div className="flex justify-center m-2">
                        <div className="flex space-x-8 justify-center bg-gray-100 rounded-full p-4">
                            <button
                                disabled={pageNumber <= 1}
                                onClick={() => goToPage(pageNumber - 1)}
                            >
                                <FaArrowCircleLeft id="left-arrow-icon" className="text-secondary w-6 h-6" />
                            </button>
                            <div className="flex items-center">
                                <p>Page</p>
                                <input
                                    type="text"
                                    className="w-8 text-center border-2 border-primary rounded-lg mx-1 focus:outline-none"
                                    value={pageInput}
                                    onChange={onPageInputChange}
                                    onBlur={onPageInputBlur}
                                    onKeyDown={onPageInputKeyDown}
                                />
                                <p>of {numPages}</p>
                            </div>
                            <button
                                disabled={pageNumber >= (numPages ?? 0)}
                                onClick={() => goToPage(pageNumber + 1)}
                            >
                                <FaArrowCircleRight id="right-arrow-icon" className="text-secondary w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    };

export default StoryReader;
