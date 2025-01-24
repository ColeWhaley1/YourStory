import supabase from "../../supabase";

interface StoriesCountResponse {
    count: number | null,
    error: string | null,
}

const getStoriesCountService = async (id: string): Promise<StoriesCountResponse> => {
    try {

        const { count, error } = await supabase
                                            .from("story")
                                            .select("*", { count: "exact", head: true})
                                            .eq("author_id", id);
        
        if (error){
            throw new Error(error.message)
        } 
        
        return {
            count,
            error: null
        }
        
    } catch (error: any) {
        return {
            count: null,
            error: error.message
        }
    }
}

export default getStoriesCountService;