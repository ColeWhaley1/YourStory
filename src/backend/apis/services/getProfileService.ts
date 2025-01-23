import { getAuthorById } from "../../../frontend/services/getAuthor";
import { Profile } from "../../../types/profile";
import getFollowersCountService from "./getFollowersCountService";
import getFollowingCountService from "./getFollowingCountService";
import getStoriesCountService from "./getStoriesCountService";

interface ProfileResponse {
    profile: Profile | null,
    error: string | null
}

const getProfileService = async (id: string): Promise<ProfileResponse> => {
    try {

        // get author data

        const authorResponse = await getAuthorById(id);
        
        if (authorResponse.error){
            throw new Error("There was an error fetching the author.");
        }

        const author = authorResponse.author;

        // get stories told count

        const storiesCountResponse = await getStoriesCountService(id);

        if(storiesCountResponse.error){
            throw new Error(storiesCountResponse.error);
        }

        const stories = storiesCountResponse.count;

        // get follower count

        const followersCountResponse = await getFollowersCountService(id);

        if(followersCountResponse.error){
            throw new Error(followersCountResponse.error);
        }

        const followers = followersCountResponse.count;

        // get following count

        const followingCountResponse = await getFollowingCountService(id);

        if(followingCountResponse.error){
            throw new Error(followingCountResponse.error);
        }

        const following = followingCountResponse.count;

        if ((!stories && stories != 0) || (!followers && followers != 0) || (!following && following != 0)){
            throw new Error("Could not fetch stats");
        }

        const profile: Profile = {
            author,
            stats: {
                stories,
                followers,
                following
            }
        }

        return {
            profile,
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