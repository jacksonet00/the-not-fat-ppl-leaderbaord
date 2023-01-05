import { LeaderboardEntryData } from "../types";
import ProfileSmall from "./ProfileSmall";
import ProgressBars from "./ProgressBars";

type LeaderboardEntryProps = {
    data: LeaderboardEntryData;
    index: number;
    currentDay: number;
};

export default function LeaderboardEntry({ data, index, currentDay }: LeaderboardEntryProps) {
    const bestStreakLength = data.bestStreakLength();
    const currentStreak = data.currentStreak();
    const totalCompletions = data.totalCompletions();
    return (
        <div className="pb-4 h-20 flex flex-col w-80 mb-12">
            <div>
                <div className="mb-4">
                    <ProfileSmall
                        bestStreakLength={bestStreakLength}
                        currentStreakIncludesToday={currentStreak.includesToday}
                        currentStreakLength={currentStreak.length}
                        participantName={data.getParticipantName()}
                        totalCompletions={totalCompletions}
                        crown={index === 0}
                    />
                </div>
                <ProgressBars
                    bestStreakLength={bestStreakLength}
                    currentStreakLength={currentStreak.length}
                    totalCompletions={totalCompletions}
                    currentDay={currentDay}
                />
            </div>
        </div>
    );
}