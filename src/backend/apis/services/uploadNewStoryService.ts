import { Story } from "../../../types/story";
import supabase from "../../supabase";

const uploadNewStoryService = async (
    story: Story
): Promise<boolean> => {
    try {

        const { data, error } = await supabase
            .from("story")
            .insert([
                story
            ]);

        if (error) {
            throw new Error("Could not upload story to DB.");
        }
        
        return true;
    } catch (error: any) {
        console.error(error.message);
        return false;
    }
}

export default uploadNewStoryService;