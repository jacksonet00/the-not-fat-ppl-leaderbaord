import { Completion } from "../types/Completion";
import { LeaderboardData } from "../types/LeaderboardData";
import { User } from "../types/User";
import { genBestStreak } from "./genBestStreak";
import { genCurrentStreak } from "./genCurrentStreak";
import { genTotalCompletions } from "./genTotalCompletions";

export function genLeaderboardData(completions: Completion[], currentDay: number): LeaderboardData[] {
    const aggregatedCompletions = new Map();
    const leaderboardData: LeaderboardData[] = [];

    completions.forEach((completion) => {
        let tmp = aggregatedCompletions.get(completion.user_id);
        if (tmp) {
            aggregatedCompletions.set(completion.user_id, {
                ...tmp,
                daysCompleted: [
                    ...tmp.daysCompleted,
                    completion.day,
                ],
            });
        } else {
            aggregatedCompletions.set(completion.user_id, {
                user: completion.user,
                daysCompleted: [completion.day],
            });
        }
    });
    aggregatedCompletions.forEach((value: {user: User, daysCompleted: number[]}, key) => {
        leaderboardData.push({
            user: value.user,
            bestStreak: genBestStreak(value.daysCompleted, currentDay),
            currentStreak: genCurrentStreak(value.daysCompleted, currentDay),
            totalCompletions: genTotalCompletions(value.daysCompleted),
        });
    });
    return leaderboardData;
}