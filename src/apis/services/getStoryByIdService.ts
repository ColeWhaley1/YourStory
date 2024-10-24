import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase.ts";
import { Story } from "../../types/story.ts";

const getStoryByIdService = async (
    id: string,
): Promise<Story | null> => {
    try {

        const storyRef = doc(db, "story", id);

        const storySnapshot = await getDoc(storyRef);

        if(storySnapshot.exists()){
            const data = storySnapshot.data();
            
            const story: Story = {
                author_id: data.author_id,
                title: data.title,
                description: data.description,
                rating: data.rating,
                story_text: data.story_text,
                thumbnail: data.thumbnail,
            }

            return story;
        }
        
        return null;
        
    } catch (error) {
        console.error(error);
        return null;
    }
}

export default getStoryByIdService;