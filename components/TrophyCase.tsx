import { SerializedLeaderboardData } from '../types';

interface TrophyCaseRowProps {
  icon: string;
  text: string;
}

function TrophyCaseRow({
  icon,
  text,
}: TrophyCaseRowProps) {
  return (
    <div className="flex flex-row w-52 items-center">
      <div className="bg-sky-200 w-8 h-8 rounded-sm flex items-center justify-center mr-2">
        <h1 className="font-bold text-2xl">{icon}</h1>
      </div>
      <h1 className="font-bold text-md">{text}</h1>
    </div>
  );
}

interface TrophyCaseProps {
  winners: SerializedLeaderboardData[];
}

export default function TrophyCase({
  winners
}: TrophyCaseProps) {
  return (
    <div className="bg-sky-50 w-60 h-40 rounded-md flex flex-col items-center pt-2 pb-2 justify-evenly">
      <TrophyCaseRow icon="🥇" text={winners[0].participantName} />
      {winners.length > 1 && <TrophyCaseRow icon="🥈" text={winners[1].participantName} />}
      {winners.length > 2 && <TrophyCaseRow icon="🥉" text={winners[2].participantName} />}
    </div>
  );
}