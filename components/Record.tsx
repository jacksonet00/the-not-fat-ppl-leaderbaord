import { LeaderboardData } from "../types/LeaderboardData";
import ProfileSmall from "./ProfileSmall";
import ProgressBars from "./ProgressBars";

export default function Record(props: { record: LeaderboardData, index: number; }) {
    const { record, index } = props;
    return (
        <div className="pb-4 h-20 flex flex-col w-80 mb-12">
            <div>
                <div className="mb-4">
                    <ProfileSmall record={record} crown={index === 0} />
                </div>
                <ProgressBars record={record} currentDay={31} />
            </div>
        </div>
    );
}