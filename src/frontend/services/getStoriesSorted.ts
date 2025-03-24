const getStoriesSorted = async (
    sortedBy: string,
    ascending: boolean,
    top: number,
) => {
    try {
        const base_url = import.meta.env.VITE_API_BASE_URL;
        
        const response = await fetch(`${base_url}/stories/sorted?sortedBy=${sortedBy}&ascending=${ascending}&top=${top}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }); 

        if (!response.ok){
            throw new Error("Error fetching stories");
        }

        const data = await response.json();

        if (data.error){
            throw new Error("Error fetching stories");
        }

        return {
            stories: data.stories,
            error: null
        }
    } catch (error: any) {
        return {
            stories: [],
            error: error.message
        }
    }
}

export default getStoriesSorted;