import { Story } from "../../types/story";

interface NewStoryReturnType {
    id: string | null;
    error: string | null;
}

const uploadNewStory = async (
    story: Story,
): Promise<NewStoryReturnType> => {
    try {

        const base_url = import.meta.env.VITE_API_BASE_URL;
        
        const response = await fetch(`${base_url}/stories/new`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ story })
        });

        if(!response.ok){
            throw new Error("Story could not be uploaded.");
        }

        return {
            id: (await response.json()).id,
            error: null
        }
        
    } catch (error: any) {
        return {
            id: null,
            error: error.message
        }
    }
}

export default uploadNewStory;