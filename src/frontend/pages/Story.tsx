import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Story } from "../../types/story"


const StoryPage: React.FC = () => {

    const { id } = useParams<{id: string}>();
    const [story, setStory] = useState<Story | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {

        // give default value of not_found in case id is undefined
        const fetchStory = async (id: string = "not_found") => {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/stories/${id}`);
            const storyResponse = await response.json();
            const story = storyResponse.story;
            setStory(story);
            setIsLoading(false);
            console.log(story);
        }
        
        fetchStory(id);
    }, [id]);

    if (isLoading) return (
        <div>Loading ...</div>
    )

    return (
        <div>    
            <div className="text-black">
                <h1>{story?.title}</h1>
                <h2>{story?.author_id}</h2>
                <p>{story?.description}</p>
            </div>
        </div>
    );
}

export default StoryPage;