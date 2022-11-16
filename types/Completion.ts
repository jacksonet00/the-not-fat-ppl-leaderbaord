import { Challenge } from "./Challenge";
import { User } from "./User";

export type Completion = {
    id: number
    user?: User|null
    user_id: number
    challenge?: Challenge|null
    challenge_id: number
    day: number
}