import { useNavigate } from "react-router-dom";

interface SignOutResponse {
    success: boolean,
    error: string | null
}

const signOut = async (revokeAccess: () => void): Promise<SignOutResponse> => {
    
    try {

        const navigate = useNavigate();
        
        const base_url = import.meta.env.VITE_API_BASE_URL;

        const response = await fetch(`${base_url}/sign_out`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        });

        if(!response.ok){
            throw new Error("Failed to sign out user.");
        }

        const data = await response.json();

        if (data.error){
            throw new Error(data.error);
        }

        // set accessRevoked flag to true in local storage
        revokeAccess();

        navigate('/log_in')

        return {
            success: true,
            error: null
        }

    } catch (error: any) {
        return {
            success: false,
            error: error.message
        }
    }
}

export default signOut;