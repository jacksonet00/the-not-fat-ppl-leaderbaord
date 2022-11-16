import { User } from "./User";

export type LeaderboardData = {
    user: User
    totalCompletions: number
    currentStreak: number
    bestStreak: number
}