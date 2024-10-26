import { useState } from "react";
import StoryFileUpload from "../components/StoryFileUpload";
import NewStoryForm from "../components/NewStoryForm";

const MyStoriesPage = () => {

    const [storyFile, setStoryFile] = useState<File | null>(null);

    return (
        <div className="flex m-14 space-x-12">
            <div id="story_uploader" className="p-16">
                {
                    storyFile ? (
                        <div>PDF READER</div>
                    ) :
                    (
                        <StoryFileUpload setStoryFile={setStoryFile} />
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

