import supabase from "../../supabase";

const getFollowStatusService = async (currentId: string, targetId: string) => {
    try {

        const { count, error } = await supabase
                                            .from("follows")
                                            .select("*", { count: "exact", head: true})
                                            .eq("follower", currentId)
                                            .eq("target", targetId)
        
        
        if (error){
            throw new Error(error.message)
        } 

        if (count == null){
            throw new Error("Count is null")
        }
        
        return {
            isFollowing: count > 0,
            error: null
        }
        
    } catch (error: any) {
        return {
            isFollowing: false,
            error: error.message
        }
    }
}

export default getFollowStatusService;