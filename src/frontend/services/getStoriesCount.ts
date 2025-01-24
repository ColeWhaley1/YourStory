const getStoryCount = async (id: string) => {
    try {

        const base_url = import.meta.env.VITE_API_BASE_URL;
        
        const response = await fetch(`${base_url}/stats/stories?id=${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }); 

        if (!response.ok){
            throw new Error("Error fetching stories count");
        }

        const data = await response.json();

        if (data.error){
            throw new Error("Error fetching stories count");
        }

        return {
            count: data.count,
            error: null
        };
        
    } catch (error: any) {
        return {
            count: 0,
            error: error.message
        };
    }
}

export default getStoryCount;