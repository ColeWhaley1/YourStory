import { Author } from "../../types/story";

const createNewUser = async (sign_up_info: Author): Promise<string | undefined | null> => {
    try {

        const base_url = import.meta.env.VITE_API_BASE_URL

        const response = await fetch(`${base_url}/sign_up`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: sign_up_info.email, password: sign_up_info.password }),
        });

        if (!response.ok) {
            throw new Error("Failed to create new user");
        }

        const data = await response.json();

        return data.id;
    } catch (error: any) {
        console.error(error.message);
        return null;
    }
}

export default createNewUser;