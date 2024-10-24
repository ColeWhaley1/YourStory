import { useState, useRef, useEffect } from "react";
import { StoryInfo } from "../../types/story";

import { FaAngleLeft, FaAngleRight, FaStar } from "react-icons/fa";

import React from 'react';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import RightArrow from '../../assets/lottie_animations/right_arrow.json';
import Flame from '../../assets/lottie_animations/flame.json';

import { Link } from "react-router-dom";

interface CarouselProps {
    title: string;
    category: string;
    stories: StoryInfo[];
}

const Carousel: React.FC<CarouselProps> = ({ title, category, stories }) => {
    const carouselRef = useRef<HTMLDivElement>(null);
    const rightArrowLottieRef = useRef<LottieRefCurrentProps>(null);

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

        if (rightArrowLottieRef.current) {
            rightArrowLottieRef.current.setSpeed(0.75);
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
                    <div className="carousel flex gap-x-10" ref={carouselRef} style={{ overflowX: "auto", scrollSnapType: 'none' }}>
                        {stories.map((item) => (
                            <div key={item.id} className="carousel-item max-w-xs" style={{ scrollSnapAlign: 'none' }}>
                                <div>
                                    <div className="relative">
                                        <img src={item.img} alt={item.title} className="rounded-lg h-48 w-full" />
                                        <div className="absolute flex justify-center items-center right-0 bottom-0 max-h-10 m-1 p-2 rounded-2xl bg-black opacity-70 text-white">
                                            <div className="flex items-center space-x-1 max-h-10">
                                                <div className="relative">
                                                    {item.rating >= 4.7 && (
                                                        <div className="absolute -z-10 transform -translate-y-9 -translate-x-1.5 w-20 overflow-visible">
                                                            <Lottie animationData={Flame} />
                                                        </div>
                                                    )}
                                                    <div className="flex items-center space-x-1.5 max-h-10">
                                                        <div>{item.rating}</div>
                                                        <div className={`transform -translate-y-0.5 max-h-8 max-w-8 ${item.rating >= 4.7 ? 'opacity-90' : ''}`}>
                                                            <FaStar />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="mt-3 ml-2">
                                            <h2 className="font-bold text-lg">{item.title}</h2>
                                            <h3 className="text-gray-400 text-sm">by {item.author}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="min-w-40 content-center text-center transform -translate-y-6">
                            <Link to={`/stories?category=${category}`}>
                                <div className="flex justify-center items-center space-x-2">
                                    <p>See More</p>
                                    <div className="max-w-6 max-h-6">
                                        <Lottie animationData={RightArrow} lottieRef={rightArrowLottieRef} />
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {showLeftArrow && (
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <FaAngleLeft className="h-8 w-8 text-gray-700" />
                </div>
            )}

            {showRightArrow && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <FaAngleRight className="h-8 w-8 text-gray-700" />
                </div>
            )}
        </div>
    );
};

export default Carousel;
