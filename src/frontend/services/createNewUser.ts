import { Author } from "../../types/story";

interface CreateNewUserResponse {
    id: string | null;
    error: string | null;
}

const createNewUser = async (sign_up_info: Author, allowAccess: () => void): Promise<CreateNewUserResponse> => {
    try {

        const base_url = import.meta.env.VITE_API_BASE_URL

        const response = await fetch(`${base_url}/sign_up`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: sign_up_info.email, password: sign_up_info.password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error);
        }

        if (data.error) {
            throw new Error(data.error);
        }

        allowAccess();
        
        return {
            id: data.id,
            error: null,
        };
    } catch (error: any) {
        console.error(error.message);
        return {
            id: null,
            error: error.message,
        };
    }
}

export default createNewUser;