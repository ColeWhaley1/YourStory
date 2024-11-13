interface NewStoryReturnType {
    success: "success" | "failure"; // IDEA: may change to return id of new story instead
    error: string | null;
}

const addNewStory = (
    author_id: string,
): NewStoryReturnType => {
    try {
        


        return {
            success: "success",
            error: null
        }
        
    } catch (error: any) {
        console.error(error.message);
        return {
            success: "failure",
            error: error.message
        }
    }
}

export default addNewStory;