interface SignOutResponse {
    success: boolean,
    error: string | null
}

const signOut = async (): Promise<SignOutResponse> => {
    try {
        
        const base_url = import.meta.env.VITE_API_BASE_URL

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

        if (typeof window !== "undefined" && window.localStorage) {
            localStorage.removeItem('sb-ukkarufgugovsopasjud-auth-token');
        }

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