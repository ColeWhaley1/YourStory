const getStories = async (id: string) => {
    try {

        const base_url = import.meta.env.VITE_API_BASE_URL;
        
        const response = await fetch(`${base_url}/stories?id=${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }); 

        if (!response.ok){
            throw new Error("Could not get your stories!");
        }

        const data = await response.json();

        if (data.error){
            throw new Error("Could not get your stories!");
        }

        return {
            stories: data.stories,
            error: null
        };
        
    } catch (error: any) {
        return {
            stories: [],
            error: error.message
        };
    }
}

export default getStories;