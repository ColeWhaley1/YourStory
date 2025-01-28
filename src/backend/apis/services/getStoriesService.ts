import { Story } from "../../../types/story";
import supabase from "../../supabase";

export interface ReturnType {
    stories: Story[];
    error: string | null
}

const getStoriesService = async (
    id: string
): Promise<ReturnType> => {
    try {

        let { data, error } = await supabase
            .from("story")
            .select("*")
            .eq("author_id", id)
        
        if(error) {
            throw new Error(error.message);
        }

        const stories: Story[] = data || [];
        
        return {
            stories,
            error: null
        };
            
        
    } catch (error: any) {
        return {
            stories: [],
            error: error.message
        };
    }
}

export default getStoriesService;