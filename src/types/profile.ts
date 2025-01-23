import { Author } from "./story";

export interface Profile {
    author: Author,
    stats: ProfileStats
}

export interface ProfileStats {
    stories: number,
    followers: number,
    following: number,
}