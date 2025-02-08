const unfollowAuthor = async (currentId: string, targetId: string) => {
    try {

        const base_url = import.meta.env.VITE_API_BASE_URL;
        
        const response = await fetch(`${base_url}/profile/unfollow?currentId=${currentId}&targetId=${targetId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        }); 

        if (!response.ok){
            throw new Error("Failed to unfollow author.");
        }

        const data = await response.json();

        if (data.error){
            throw new Error("Failed to unfollow author.");
        }

        return {
            error: null
        }
        
    } catch (error: any) {
        return {
            error: error.message
        }
    }
}

export default unfollowAuthor;