import { LeaderboardData } from "../types";
import ProfileSmall from "./ProfileSmall";
import ProgressBars from "./ProgressBars";

export default function LeaderboardEntry(props: { leaderboardData: LeaderboardData, index: number; }) {
    const { leaderboardData, index } = props;
    return (
        <div className="pb-4 h-20 flex flex-col w-80 mb-12">
            <div>
                <div className="mb-4">
                    <ProfileSmall leaderboardData={leaderboardData} crown={index === 0} />
                </div>
                <ProgressBars leaderboardData={leaderboardData} currentDay={31} />
            </div>
        </div>
    );
}