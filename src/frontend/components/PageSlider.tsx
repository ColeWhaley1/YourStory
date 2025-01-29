import React, { useState, Children, ReactNode, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
        <div className="relative w-full h-full">
            <AnimatePresence mode="wait">
                <motion.div
                    key={pageIndex}
                    initial={hasInteracted ? { x: direction === 1 ? 300 : -300, opacity: 0 } : { x: 0, opacity: 1 }} // No animation on first load
                    animate={{ x: 0, opacity: 1 }}
                    exit={{
                        x: direction === 1 ? 300 : -300, // Exit in the opposite direction
                        opacity: 0
                    }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    {pages[pageIndex]}
                </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-0 left-0 top-0 flex justify-between px-10">
                {pageIndex > 0 && (
                    <button onClick={handlePrevious} aria-label="Previous Page">
                        &#8592;
                    </button>
                )}
            </div>
            <div className="absolute bottom-0 right-0 top-0 flex justify-between px-10">
                {pageIndex < pages.length - 1 && (
                    <button onClick={handleNext} aria-label="Next Page">
                        &#8594;
                    </button>
                )}
            </div>
        </div>
    );
};

export default PageSlider;
