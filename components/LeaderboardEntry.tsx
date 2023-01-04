import { LeaderboardEntryData } from "../types";
import ProfileSmall from "./ProfileSmall";
import ProgressBars from "./ProgressBars";

type LeaderboardEntryProps = {
    data: LeaderboardEntryData;
    index: number;
    currentDay: number;
};

export default function LeaderboardEntry({ data, index, currentDay }: LeaderboardEntryProps) {
    return (
        <div className="pb-4 h-20 flex flex-col w-80 mb-12">
            <div>
                <div className="mb-4">
                    <ProfileSmall leaderboardData={data} crown={index === 0} />
                </div>
                <ProgressBars leaderboardData={data} currentDay={currentDay} />
            </div>
        </div>
    );
}