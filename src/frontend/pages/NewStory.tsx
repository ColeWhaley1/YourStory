import Lottie from 'lottie-react'
import { useState } from 'react'
import NewStoryForm from '../components/NewStoryForm'
import StoryFileUpload from '../components/StoryFileUpload'
import StoryReaderPreview from '../components/StoryReaderPreview'
import PointerDown from "../../../src/assets/lottie_animations/pointer-down.json"

const NewStory = () => {

    const [storyFile, setStoryFile] = useState<File | null>(null);
    
    return (
        <div className="flex justify-center m-10 w-full">
            <div className="pl-16 pt-16">
                {
                    storyFile ? (
                        <div>
                            <StoryReaderPreview file={storyFile} scale={.7} setFile={setStoryFile}></StoryReaderPreview>
                        </div>
                    ) :
                        (
                            <div className="flex flex-col items-center text-2xl font-extrabold transform -translate-y-10">
                                <p className="text-tertiary">Your Story!</p>
                                <div className="max-w-32 max-h-32">
                                    <Lottie animationData={PointerDown} />
                                </div>
                                <StoryFileUpload setStoryFile={setStoryFile} />
                            </div>
                        )
                }
            </div>
            <div className="p-4 flex items-center justify-center w-1/2">
                <NewStoryForm storyFile={storyFile} />
            </div>
        </div>
    )
}

export default NewStory