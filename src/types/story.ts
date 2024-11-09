export interface StoryInfo {
    id: string,
    title: string,
    author: string,
    img: string,
    rating: number,
}

// might remove or edit since this is just being used for mock stories
export interface Story {
    author_id: string,
    description: string,
    rating: number,
    story_file: string,
    cover: string,
    title: string,
}

export interface StoryUpload {
    author_id: string,
    description: string,
    story_file: string,
    cover: string,
    title: string,
    genres: string[]
}