import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase.ts";
import { StoryUpload } from "../../types/story.ts";

const getStoryByIdService = async (
    id: string,
): Promise<StoryUpload | null> => {
    try {

        const storyRef = doc(db, "story", id);

        const storySnapshot = await getDoc(storyRef);

        if(storySnapshot.exists()){
            const data = storySnapshot.data();
            
            const story: StoryUpload = {
                author_id: data.author_id,
                title: data.title,
                description: data.description,
                genres: data.genres,
                story_file: data.story_file,
                cover: data.cover,
            }

            return story;
        }
        
        return null;
        
    } catch (error: any) {
        console.error(error.message);
        return null;
    }
}

export default getStoryByIdService;