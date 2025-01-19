import { getAuthorById } from "../../../frontend/services/getAuthor";
import { Profile } from "../../../types/profile";

interface ProfileResponse {
    profile: Profile | null,
    error: string | null
}

const getProfileService = async (user_id: string): Promise<ProfileResponse> => {
    try {

        const authorResponse = await getAuthorById(user_id);
        
        if (authorResponse.error){
            throw new Error("There was an error fetching the author.");
        }

        const author = authorResponse.author;

        // get avatar url

        // get stories told

        // get follower count

        // get following count


        // CHANGE TO RETURN PROFILE
        return {
            profile: null,
            error: null
        }
        
    } catch (error: any) {
        return {
            profile: null,
            error: error.message
        }
    }
}

export default getProfileService;