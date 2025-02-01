import React, { useState, Children, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";

type PageSliderProps = {
    children: ReactNode;
};

const PageSlider: React.FC<PageSliderProps> = ({ children }) => {
    const [pageIndex, setPageIndex] = useState(0);
    const [direction, setDirection] = useState(-1);
    const [hasInteracted, setHasInteracted] = useState(false); // Track if the user has interacted
    const pages = Children.toArray(children);

    const handleNext = () => {
        setHasInteracted(true); // Mark interaction after button click
        setDirection(1);
        setPageIndex((prevIndex) => prevIndex + 1);
    };

    const handlePrevious = () => {
        setHasInteracted(true); // Mark interaction after button click
        setDirection(-1);
        setPageIndex((prevIndex) => prevIndex - 1);
    };

    return (
        <div className="relative w-full h-full overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.div
                    key={pageIndex}
                    initial={hasInteracted ? { x: direction === 1 ? 300 : -300, opacity: 0 } : { x: 0, opacity: 1 }} // No animation on first load
                    animate={{ x: 0, opacity: 1 }}
                    exit={{
                        x: direction === 1 ? 300 : -300, // Exit in the opposite direction
                        opacity: 0
                    }}
                    transition={{ duration: .25 }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    {pages[pageIndex]}
                </motion.div>
            </AnimatePresence>

            <div className="absolute left-0 top-4 flex justify-between px-10">
                {pageIndex > 0 && (
                    <button onClick={handlePrevious} aria-label="Previous Page" className='px-3 py-4 bg-secondary rounded-full flex items-center justify-center space-x-2'>
                        <div>
                            <FaArrowLeft/>
                        </div>
                        <div className='font-bold'>
                            Back
                        </div>
                    </button>
                )}
            </div>
            <div className="absolute top-4 right-8 flex justify-between">
                {pageIndex < pages.length - 1 && (
                    <button onClick={handleNext} aria-label="Next Page" className='px-3 py-4 bg-secondary rounded-full flex space-x-2 items-center justify-center'>
                        <div className='font-bold'>
                            New Story
                        </div>
                        <div>
                            <FaArrowRight/>
                        </div>
                    </button>
                )}
            </div>
        </div>
    );
};

export default PageSlider;
