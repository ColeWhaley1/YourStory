import { Profile } from "../../types/profile";

export interface ProfileResponse {
    profile: Profile | null,
    error: string | null
}

const getProfile = async (id: string): Promise<ProfileResponse> => {
    try {

        const base_url = import.meta.env.VITE_API_BASE_URL;
        
        const response = await fetch(`${base_url}/profile?id=${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }); 

        if (!response.ok){
            throw new Error("Error fetching profile");
        }

        const data = await response.json();

        if (data.error){
            throw new Error("Error fetching profile");
        }

        return {
            profile: data.profile,
            error: null
        };
        
    } catch (error: any) {
        return {
            profile: null,
            error: error.message
        }
    }
}

export default getProfile;