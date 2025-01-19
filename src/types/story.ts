export interface StoryInfo {
    id: string,
    title: string,
    author: string,
    img: string,
    rating: number,
}

// might remove or edit since this is just being used for mock stories
export interface StoryMockData {
    author_id: string,
    description: string,
    rating: number,
    story_file: string,
    cover: string,
    title: string,
}

// this needs to be kept the same as the DB table "story"
export interface Story {
    author_id: string,
    description: string,
    story_file: string,
    cover: string,
    title: string,
    genres: string[]
}

export interface Author {
    id: string,
    created_at: string,
    pen_name: string,
    email: string,
    password: string,
    user_id: string,
}

export interface SignIn {
    email: string,
    password: string
}