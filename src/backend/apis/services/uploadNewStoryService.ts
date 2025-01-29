import { UploadStory } from "../../../types/story";
import supabase from "../../supabase";

const uploadNewStoryService = async (
    story: UploadStory
): Promise<string | null> => {
    try {
        const { data, error } = await supabase
            .from("story")
            .insert([
                story
            ]).select("id");

        if (error) {
            throw new Error("Could not upload story to DB.");
        }

        const story_id = data[0].id;
        
        return story_id;
    } catch (error: any) {
        console.error(error.message);
        return null;
    }
}

export default uploadNewStoryService;