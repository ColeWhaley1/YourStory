import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Story } from "../../types/story";
import RightArrowWhite from "../../assets/lottie_animations/right_arrow_white.json";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import NotFound from "../../assets/lottie_animations/not_found.json"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../components/ui/shadcnCarousel";
import React from "react";

const StoryPage: React.FC = () => {

    const { id } = useParams<{ id: string }>();
    const [story, setStory] = useState<Story | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isImageLoading, setIsImageLoading] = useState<boolean>(true);
    const rightLottieArrowRef = useRef<LottieRefCurrentProps>(null);

    const [couldNotLoadStory, setCouldNotLoadStory] = useState<boolean>(false);

    useEffect(() => {

        // give default value of not_found in case id is undefined
        const fetchStory = async (id: string = "not_found") => {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/stories/${id}`);
            const storyResponse = await response.json();
            const story = storyResponse.story;
            const error = storyResponse.error;

            if (error) {
                setCouldNotLoadStory(true);
                return;
            }

            if (!story.cover) {
                story.cover = "../../assets/static_images/noCoverAvailable.png";
            }

            setStory(story);
            setIsLoading(false);
        }

        if (rightLottieArrowRef.current) {
            rightLottieArrowRef.current.setSpeed(0.75);
        }

        fetchStory(id);
    }, [id]);

    if (couldNotLoadStory) return (
        <div className="flex justify-center items-center h-screen text-3xl">
            <div className="flex-col">
                <Lottie className="h-48" animationData={NotFound}/>
                <div>
                    This story does not exist. 
                </div>
            </div>
        </div>
    )

    if (isLoading) return (
        <div>Loading ...</div>
    )

    return (
        <Carousel
            className="h-full"
            style={{ transition: "transform 0.5s ease-in-out" }}>
            <CarouselContent>
                <CarouselItem>
                    <div className="flex justify-center pt-8">
                        <div className="py-16 px-24 bg-slate-100 rounded-md shadow-md">
                            <div className="flex space-x-10 items-center">
                                <div>
                                    {isImageLoading && (
                                        <div>
                                            Loading...
                                        </div>
                                    )}
                                    <img
                                        src={story?.cover}
                                        onLoad={() => setIsImageLoading(false)}
                                        alt={`cover image for ${story?.title}`}
                                        className="max-h-96 rounded-xl shadow-lg"
                                    />
                                </div>
                                <div className="text-black pt-4">
                                    <h1 className="text-2xl">{story?.title}</h1>
                                    <h2 className="opacity-70 text-sm">by {story?.author_id}</h2>
                                    <div className="pt-2">
                                        <p>{story?.description}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="py-4">
                                <button className="bg-primary p-4 rounded-xl text-white shadow-md">
                                    <div className="flex space-x-2 justify-center items-center">
                                        <div>
                                            Start Reading
                                        </div>
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
                    File Reader
                </CarouselItem>
            </CarouselContent>
        </Carousel>
    );
}

export default StoryPage;