interface newAuthorResponse {
    success: boolean,
    error: string | null
}

const createNewAuthor = async (email: string): Promise<newAuthorResponse> => {
    try {

        const base_url = import.meta.env.VITE_API_BASE_URL;

        const newAuthorResponse = await fetch(`${base_url}/author/new`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email })
        });

        if (!newAuthorResponse.ok){
            throw new Error("Failed to create new author.")
        }

        const newAuthorData = await newAuthorResponse.json();

        if (newAuthorData.error){
            throw new Error(newAuthorData.error)
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

export default createNewAuthor;