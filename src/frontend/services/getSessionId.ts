import supabase from "../supabase";

export interface UserIdResponse {
    id: string | null,
    error: string | null
}

const getSessionId = async (): Promise<UserIdResponse> => {
    try {

        const { data, error } = await supabase.auth.getSession();

        if (error){
            throw new Error("Could not retrieve user session.");
        }

        if(!data || !data.session || !data.session.user || !data.session.user.id){
            throw new Error("Could not retrieve user id.");
        }

        const id: string = data.session?.user.id;

        return {
            id,
            error: null
        }
        
    } catch (error: any) {
        return {
            id: null,
            error: error.message
        }
    }
}

export default getSessionId;