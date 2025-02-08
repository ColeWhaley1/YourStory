const unfollowAuthor = (currentId: string, targetId: string) => {
    try {

        

        return {
            error: null
        }
        
    } catch (error: any) {
        return {
            error: error.message
        }
    }
}

export default unfollowAuthor;