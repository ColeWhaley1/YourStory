import { SignIn } from "../../types/story";

const signInUser = async (sign_in_info: SignIn): Promise<string | undefined | null> => {
    try {

        const base_url = import.meta.env.VITE_API_BASE_URL

        const response = await fetch(`${base_url}/sign_in`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: sign_in_info.email, password: sign_in_info.password }),
        });
        
        if (!response.ok) {
            throw new Error("Failed to sign in user");
        }

        const data = await response.json()

        return data.id;
    } catch (error: any) {
        console.error(error.message);
        return null;
    }
}

export default signInUser;