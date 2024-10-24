import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Story } from "../types/story"


const StoryPage: React.FC = () => {

    const { id } = useParams<{id: string}>();
    const [story, setStory] = useState<Story>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {

        // give default value of not_found in case id is undefined
        const fetchStory = async (id: string = "not_found") => {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/stories/${id}`);
            const story = await response.json();
            setStory(story);
            setIsLoading(false);
        }
        
        fetchStory(id);
    }, [id]);

    if (isLoading) return (
        <div>Loading ...</div>
    )

    return (
        <div className="text-black">
            <h1>{story?.title}</h1>
            <h2>{story?.author_id}</h2>
            <p>{story?.description}</p>
        </div>
    );
}

export default StoryPage;