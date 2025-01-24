import supabase from "../../supabase";

interface FollowersCountResponse {
    count: number | null,
    error: string | null,
}

const getFollowersCountService = async (id: string): Promise<FollowersCountResponse> => {
    try {

        const { count, error } = await supabase
                                            .from("follows")
                                            .select("*", { count: "exact", head: true})
                                            .eq("target", id);
        
        
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

export default getFollowersCountService;