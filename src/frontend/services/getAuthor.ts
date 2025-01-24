import { Author } from "../../types/story";

interface AuthorExistsResponse {
    author: Author | null,
    error: string | null
}

const getAuthorByEmail = async (email: string): Promise<AuthorExistsResponse> => {
    try {

        const base_url = import.meta.env.VITE_API_BASE_URL;
        
        const response = await fetch(`${base_url}/auth/author?email=${email}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }); 

        if (!response.ok){
            throw new Error("Error fetching author information");
        }

        const data = await response.json();

        if (data.error){
            throw new Error("Error fetching author information");
        }

        return {
            author: data.author,
            error: null
        };
        
    } catch (error: any) {
        return {
            author: null,
            error: error.message
        };
    }
}

const getAuthorById = async (user_id: string) => {
    try {

        const base_url = import.meta.env.VITE_API_BASE_URL;
        
        const response = await fetch(`${base_url}/auth/author?user_id=${user_id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }); 

        if (!response.ok){
            throw new Error("Error fetching author information");
        }

        const data = await response.json();

        if (data.error){
            throw new Error("Error fetching author information");
        }

        return {
            author: data.author,
            error: null
        };
        
    } catch (error: any) {
        return {
            author: null,
            error: error.message
        };
    }
}

export {getAuthorByEmail, getAuthorById};