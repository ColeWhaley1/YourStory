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
            const data: Story = storySnapshot.data() as Story;
            return data;
        }
        
        return null;
        
    } catch (error) {
        console.error(error);
        return null;
    }
}

export default getStoryByIdService;