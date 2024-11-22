import { Story } from "../../types/story";

interface NewStoryReturnType {
    success: "success" | "failure"; // IDEA: may change to return id of new story instead
    error: string | null;
}

const uploadNewStory = async (
    story: Story,
): Promise<NewStoryReturnType> => {
    try {

        const base_url = import.meta.env.VITE_API_BASE_URL
        
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
            success: "success",
            error: null
        }
        
    } catch (error: any) {
        console.error(error.message);
        return {
            success: "failure",
            error: error.message
        }
    }
}

export default uploadNewStory;