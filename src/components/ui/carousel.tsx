import { useState, useRef, useEffect } from "react";
import { StoryInfo } from "../../types/story";

import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

interface CarouselProps {
    title: string;
    stories: StoryInfo[];
}

const Carousel: React.FC<CarouselProps> = ({ title, stories }) => {
    const carouselRef = useRef<HTMLDivElement>(null);

    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(false);

    const calculateVisibleIndexes = () => {
        if (!carouselRef.current) return;

        const containerWidth = carouselRef.current.offsetWidth;
        const itemWidth = 200; 
        const totalItems = stories.length;

        const visibleCount = Math.floor(containerWidth / itemWidth);

        const scrollPosition = carouselRef.current.scrollLeft;

        const startIndex = Math.floor(scrollPosition / itemWidth);
        const endIndex = Math.min(startIndex + visibleCount, totalItems);

        setShowLeftArrow(startIndex > 0);
        setShowRightArrow(endIndex < totalItems);
    };

    const onCarouselEnter = () => {
        calculateVisibleIndexes();
    };

    const onCarouselLeave = () => {
        setShowLeftArrow(false);
        setShowRightArrow(false);
    };

    useEffect(() => {
        const handleScroll = () => {
            calculateVisibleIndexes();
        };

        const carouselCurrent = carouselRef.current;
        if (carouselCurrent) {
            carouselCurrent.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (carouselCurrent) {
                carouselCurrent.removeEventListener('scroll', handleScroll);
            }
        };
    }, [stories]);

    return (
        <div className="relative">
            <div className='m-14' onMouseEnter={onCarouselEnter} onMouseLeave={onCarouselLeave}>
                <h1 className="text-3xl font-extrabold my-6">
                    {title}
                </h1>
                <div className="relative">
                    <div className="carousel flex gap-x-10" ref={carouselRef} style={{ overflowX: "auto" }}>
                        {stories.map((item) => (
                            <div key={item.id} className="carousel-item max-w-xs">
                                <div>
                                    <img src={item.img} alt={item.title} className="rounded-lg h-48 w-full" />
                                    <div className="mt-3 ml-2">
                                        <h2 className="font-bold text-lg">{item.title}</h2>
                                        <h3 className="text-gray-400 text-sm">by {item.author}</h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {showLeftArrow && (
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <FaAngleLeft className="h-6 w-6 text-gray-700" />
                </div>
            )}

            {showRightArrow && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <FaAngleRight className="h-6 w-6 text-gray-700" />
                </div>
            )}
        </div>
    );
};

export default Carousel;
