import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Story } from "../../types/story";
import RightArrowWhite from "../../assets/lottie_animations/right_arrow_white.json";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import NotFound from "../../assets/lottie_animations/not_found.json";
import Loading from "../../assets/lottie_animations/loading.json";
import noCoverAvailableImage from "../../assets/static_images/noCoverAvailable.png";
import StoryReader from "../components/StoryReader";
import { ArrowLeftIcon } from "@radix-ui/react-icons"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../components/ui/shadcnCarousel";
import React from "react";

interface StoryPageProps {
    hideNav: () => void;
    showNav: () => void;
}

const StoryPage: React.FC<StoryPageProps> = ({ hideNav, showNav }) => {
    const { id } = useParams<{ id: string }>();
    const [story, setStory] = useState<Story | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isImageLoading, setIsImageLoading] = useState<boolean>(true);
    const rightLottieArrowRef = useRef<LottieRefCurrentProps>(null);
    const nextButtonRef = useRef<HTMLButtonElement | null>(null);
    const prevButtonRef = useRef<HTMLButtonElement | null>(null);
    const [storyFile, setStoryFile] = useState<File | null>(null);

    const [couldNotLoadStory, setCouldNotLoadStory] = useState<boolean>(false);

    const readMore = () => {
        if (nextButtonRef.current) {
            nextButtonRef.current.click();
        }

        // slide nav up
        hideNav();
    };

    const toDescription = () => {
        if (prevButtonRef.current) {
            prevButtonRef.current.click();
        }
        showNav();
    }

    const fetchStoryFile = async (): Promise<void> => {
        try {
            if(!story || !story.story_file){
                return;
            }
            
            const story_link = story?.story_file;

            if(!story_link){
                throw new Error("story file not found.");
            }
            
            const file_response = await fetch(story_link);

            const blob = await file_response.blob();

            const file: File = new File([blob], story.title, {type: blob.type})

            setStoryFile(file);

        } catch (error) {
            console.error(error);
        }
    }

    const fetchStory = async (id: string = "not_found") => {
        const response = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/stories/${id}`
        );
        const storyResponse = await response.json();
        const story = storyResponse.story;
        const error = storyResponse.error;

        if (error) {
            setCouldNotLoadStory(true);
            return;
        }

        if (!story.cover) {
            story.cover = noCoverAvailableImage;
        }

        setStory(story);
        setIsLoading(false);
    };
    
    useEffect(() => {

        if (rightLottieArrowRef.current) {
            rightLottieArrowRef.current.setSpeed(0.75);
        }

        fetchStory(id);
    }, [id]);

    useEffect(() => {
        fetchStoryFile();
    }, [story]);

    if (couldNotLoadStory)
        return (
            <div className="flex justify-center items-center flex-grow h-screen text-3xl">
                <div className="flex-col text-center transform -translate-y-20">
                    <Lottie className="h-48" animationData={NotFound} />
                    <div>This story does not exist.</div>
                </div>
            </div>
        );

    if (isLoading)
        return (
            <div className="flex justify-center items-center flex-grow h-screen text-3xl">
                <div className="flex-col transform -translate-y-20">
                    <Lottie className="h-48" animationData={Loading} />
                </div>
            </div>
        );

    return (
        <Carousel
            className="h-full"
            style={{ transition: "transform 0.5s ease-in-out" }}
        >
            <CarouselContent>
                <CarouselItem>
                    <div className="flex justify-center pt-8">
                        <div className="py-16 px-24 bg-slate-100 rounded-md shadow-md">
                            <div className="flex space-x-10 items-center">
                                <div>
                                    {isImageLoading && (
                                        <div>
                                            <Lottie className="h-12" animationData={Loading} />
                                        </div>
                                    )}
                                    <img
                                        src={story?.cover}
                                        onLoad={() => setIsImageLoading(false)}
                                        onError={() =>
                                            setStory((prevStory) =>
                                                prevStory
                                                    ? {
                                                        ...prevStory,
                                                        cover: noCoverAvailableImage,
                                                    }
                                                    : null
                                            )
                                        }
                                        alt={`cover image for ${story?.title}`}
                                        className="max-h-96 rounded-xl shadow-lg"
                                    />
                                </div>
                                <div className="text-black pt-4">
                                    <h1 className="text-2xl">{story?.title}</h1>
                                    <h2 className="opacity-70 text-sm">
                                        by {story?.author_id}
                                    </h2>
                                    <div className="pt-2">
                                        <p>{story?.description}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="py-4">
                                <button
                                    onClick={readMore}
                                    className="bg-primary p-4 rounded-xl text-white shadow-md"
                                >
                                    <div className="flex space-x-2 justify-center items-center">
                                        <div>Start Reading</div>
                                        <Lottie
                                            animationData={RightArrowWhite}
                                            className="w-8 h-8"
                                            lottieRef={rightLottieArrowRef}
                                        />
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </CarouselItem>
                <CarouselItem>
                    <div className="flex items-center justify-center h-full w-full">
                        <div className="p-12">
                            <div className="w-1/2">
                                <StoryReader file={storyFile}/>
                            </div>
                            <button
                                onClick={toDescription}
                                className="bg-primary p-2 m-4 rounded-xl text-white shadow-md"
                            >
                                <div className="flex justify-center items-center space-x-1">
                                    <ArrowLeftIcon className="max-h-6 transform -translate-y-0.5" />
                                    <div>Back</div>
                                </div>
                            </button>
                        </div>
                    </div>
                </CarouselItem>
            </CarouselContent>
            <CarouselNext className="hidden" ref={nextButtonRef} />
            <CarouselPrevious className="hidden" ref={prevButtonRef} />
        </Carousel>
    );
};

export default StoryPage;
