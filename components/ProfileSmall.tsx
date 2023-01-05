import { LeaderboardEntryData } from "../types";

export type ProfileProps = {
    leaderboardData: LeaderboardEntryData;
    crown: boolean;
};

export default function ProfileSmall({ leaderboardData, crown }: ProfileProps) {
    return (
        <div className="bg-sky-50 w-lg rounded-md flex flex-row justify-start items-center p-2">
            {/* <picture>
                <source srcSet={record.user.profile_photo ? record.user.profile_photo! : ""} type="image/webp" />
                <img className="rounded-full h-12 w-12 mr-4" src={record.user.profile_photo ? record.user.profile_photo! : ""} alt={`profile photo for ${record.user.name}`} />
            </picture> */}
            <div className="flex flex-col">
                <h1 className="font-bold">{leaderboardData.participant.name}{`${crown ? ' 👑' : ''}`}</h1>
                <div className="flex flex-row">
                    {leaderboardData.currentStreak.count > 0 ? <h1 className="font-bold mr-2">🔥 x {leaderboardData.currentStreak.count}{`${leaderboardData.currentStreak.count === leaderboardData.bestStreak ? ' 🏆' : ''}`}</h1> : <></>}
                    {leaderboardData.currentStreak.count !== leaderboardData.bestStreak && <h1 className="font-bold mr-2">🏅 {leaderboardData.bestStreak}</h1>}
                    <h1 className="font-bold mr-2">✅ {leaderboardData.totalCompletions}</h1>
                </div>
            </div>

        </div>
    );
}