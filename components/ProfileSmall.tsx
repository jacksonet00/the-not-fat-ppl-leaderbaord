import Image from 'next/image';

export type ProfileProps = {
    participantName: string;
    currentStreakLength: number;
    currentStreakIncludesToday: boolean;
    bestStreakLength: number;
    totalCompletions: number;
    crown: boolean;
};

export default function ProfileSmall({
    participantName,
    currentStreakLength,
    currentStreakIncludesToday,
    bestStreakLength,
    totalCompletions,
    crown,
}: ProfileProps) {
    function renderStreakIcon() {
        if (currentStreakIncludesToday) {
            return `🔥 x ${currentStreakLength} ${currentStreakIncludesToday ? ' 🏆' : ''}`;
        }
        return <div className="flex flex-row">
            <Image src="/frozen-fire.svg" height={20} width={20} alt={"streak freeze"} />
            x {`${currentStreakLength} ${currentStreakLength === bestStreakLength ? ' 🏆' : ''}`}
        </div>;
    }

    return (
        <div className="bg-sky-50 w-lg rounded-md flex flex-row justify-start items-center p-2">
            {/* <picture>
                <source srcSet={record.user.profile_photo ? record.user.profile_photo! : ""} type="image/webp" />
                <img className="rounded-full h-12 w-12 mr-4" src={record.user.profile_photo ? record.user.profile_photo! : ""} alt={`profile photo for ${record.user.name}`} />
            </picture> */}
            <div className="flex flex-col">
                <h1 className="font-bold">{participantName}{`${crown ? ' 👑' : ''}`}</h1>
                <div className="flex flex-row">
                    {currentStreakLength > 0 ? <h1 className="font-bold mr-2">{renderStreakIcon()}</h1> : <></>}
                    {currentStreakLength !== bestStreakLength && <h1 className="font-bold mr-2">🏅 {bestStreakLength}</h1>}
                    <h1 className="font-bold mr-2">✅ {totalCompletions}</h1>
                </div>
            </div>

        </div>
    );
}