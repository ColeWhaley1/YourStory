import { SignIn } from "../../types/story";

interface SignInResponse {
    id: string | null;
    error: string | null;
}

const signInUser = async (sign_in_info: SignIn, allowAccess: () => void): Promise<SignInResponse> => {
    try {

        const base_url = import.meta.env.VITE_API_BASE_URL

        const response = await fetch(`${base_url}/sign_in`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: sign_in_info.email, password: sign_in_info.password }),
        });
        
        const data = await response.json();

        if (!response.ok) {
            if (data.error == "Invalid login credentials") {
                throw new Error(data.error);
            }
            throw new Error("Failed to sign in user");
        }

        allowAccess();

        return { 
            id: data.id,
            error: data.error
        };
    } catch (error: any) {
        console.error(error.message);
        return {
            id: null,
            error: error.message
        };
    }
}

export default signInUser;