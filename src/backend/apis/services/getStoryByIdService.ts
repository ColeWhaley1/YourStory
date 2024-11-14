import { Story } from "../../../types/story";
import supabase from "../../supabase";

export interface ReturnType {
    story: Story | null;
    error: string | null
}

const getStoryByIdService = async (
    id: string
): Promise<ReturnType> => {
    try {

        let { data, error } = await supabase
            .from("story")
            .select("*")
            .eq("id", id)
            .single()

        console.log(data);
        
        if(error) {
            throw new Error(error.message);
        }

        const story: Story = {
            ...data
        }
        
        return {
            story,
            error: null
        };
            
        
    } catch (error: any) {
        console.error(error.message)
        return {
            story: null,
            error: error.message
        };
    }
}

export default getStoryByIdService;