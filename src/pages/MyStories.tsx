import { useState } from "react";
import StoryFileUpload from "../components/StoryFileUpload";
import NewStoryForm from "../components/NewStoryForm";
import Lottie from "lottie-react";
import PointerDown from "../../src/assets/lottie_animations/pointer-down.json";
import StoryReader from "../components/StoryReader";

const MyStoriesPage = () => {

    const [storyFile, setStoryFile] = useState<File | null>(null);

    return (
        <div className="flex flex-row justify-center m-10 space-x-12">
            <div className="pl-16 flex items-center transform -translate-y-20">
                {
                    storyFile ? (
                        <div>
                            <StoryReader file={storyFile} scale={0.8} setFile={setStoryFile}></StoryReader>
                        </div>
                    ) :
                    (   
                        <div className="flex flex-col items-center text-2xl font-extrabold">
                            <p className="text-tertiary">Your Story!</p>
                            <div className="max-w-32 max-h-32">
                                <Lottie animationData={PointerDown}/>
                            </div>
                            <StoryFileUpload setStoryFile={setStoryFile} />
                        </div>
                    )
                }
            </div>
            <div className="p-4 w-1/2 flex items-center justify-center">
                <NewStoryForm storyFile={storyFile} />
            </div>
        </div>
    )
}

export default MyStoriesPage;

