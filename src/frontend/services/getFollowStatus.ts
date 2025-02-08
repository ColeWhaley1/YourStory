interface FollowStatus {
    isFollowing: boolean,
    error: string | null
}

const getFollowStatus = async (currentId: string, targetId: string): Promise<FollowStatus> => {
    try {

        const base_url = import.meta.env.VITE_API_BASE_URL;
        
        const response = await fetch(`${base_url}/profile/follow_status?currentId=${currentId}&targetId=${targetId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        if(!response.ok){
            throw new Error("Follow status fetch failed");
        }

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error.message);
        }

        return {
            isFollowing: data.isFollowing,
            error: null
        }
        
    } catch (error: any) {
        return {
            isFollowing: false,
            error: error.message
        }
    }
}

export default getFollowStatus;