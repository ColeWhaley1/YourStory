import { Story } from "../../../types/story";
import supabase from "../../supabase";

export interface ReturnType {
    stories: Story[];
    error: string | null
}

const getStoriesSortedService = async (
    sortedBy: string,
    ascending: boolean,
    top: number,
): Promise<ReturnType> => {
    try {
            
        let { data, error } = await supabase
        .from("story")
        .select("*")
        .order(sortedBy, { ascending })
        .limit(top)
        
        if(error) {
            throw new Error(error.message);
        }

        const stories: Story[] = data || [];
        
        return {
            stories: stories,
            error: null
        };
        
    } catch (error: any) {
        return {
            stories: [],
            error: error.message
        };
    }
}

export default getStoriesSortedService;