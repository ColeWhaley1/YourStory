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
    const [numPages, setNumPages] = useState<number | null>(2);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [pageInput, setPageInput] = useState<string>('1');
    const [preloadedPages, setPreLoadedPages] = useState<(JSX.Element | null)[]>([]);

    const onDocumentLoadSuccess = ({ numPages }: DocumentLoadEvent) => {
        setNumPages(numPages);
        setPageNumber(1);

        const pages: (JSX.Element | null)[] = Array(numPages).fill(null);
        for (let i = 1; i <= numPages; i++) {
            pages[i - 1] = (
                <Page pageNumber={i} scale={scale} />
            )
        }
        setPreLoadedPages(pages);
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
        setPageInput(pageNumber.toString());

        const leftArrow = document.getElementById('left-arrow-icon');
        const rightArrow = document.getElementById('right-arrow-icon');

        if(pageNumber <= (1)){
            leftArrow?.classList.add("opacity-50");
        } else {
            leftArrow?.classList.remove("opacity-50");
        }
        
        if(pageNumber >= (numPages ?? 0)){
            rightArrow?.classList.add("opacity-50");
        } else {
            rightArrow?.classList.remove("opacity-50");
        }
    }, [pageNumber]);

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
    }

    return (
        <div>
            <div className="relative">
                <div className="outline outline-primary outline-offset-8 rounded-sm outline-2">
                    <button
                        onClick={deleteFile}
                        className="absolute top-2 right-2 z-10 flex items-center justify-center opacity-80 rounded-full shadow-md hover:opacity-90"
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
                        {preloadedPages[pageNumber - 1] ||
                            (
                                <div className="flex items-center justify-center w-96 h-96">
                                    <Lottie animationData={Loading} className="max-w-24" />
                                </div>
                            )
                        }
                    </Document> 

                    <div className="flex justify-center m-2">
                        <div className="flex space-x-8 justify-center bg-gray-100 rounded-full p-4">
                            <button
                                disabled={pageNumber <= 1}
                                onClick={() => setPageNumber((prev) => prev - 1)}
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
                                onClick={() => setPageNumber((prev) => prev + 1)}
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