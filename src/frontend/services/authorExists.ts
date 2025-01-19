interface AuthorExistsResponse {
    authorExists: boolean | null,
    error: string | null
}

const authorExists = async (email: string): Promise<AuthorExistsResponse> => {
    try {

        const base_url = import.meta.env.VITE_API_BASE_URL;
        
        const response = await fetch(`${base_url}/auth/author_exists?email=${email}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }); 

        if (!response.ok){
            throw new Error("Error checking if author exists");
        }

        const data = await response.json();

        if (data.error){
            throw new Error("Error checking if author exists");
        }

        return {
            authorExists: data.authorExists,
            error: null
        };
        
    } catch (error: any) {
        return {
            authorExists: true,
            error: error.message
        };
    }
}

export default authorExists;