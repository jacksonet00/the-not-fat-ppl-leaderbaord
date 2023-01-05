import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import LeaderboardEntry from "../../../components/LeaderboardEntry";
import { db } from "../../../firebase";
import { Challenge, LeaderboardEntryData, Participant } from "../../../types";
import { genKey } from "../../../util";

export type LeaderboardProps = {
    params: { slug: string; },
    searchParams: { id: string; },
};

function daysBetween(date: Date) {
    return Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24)) + 1;
}

async function fetchChallenge(challengeId: string): Promise<Challenge> {
    const snapshot = await getDoc(doc(db, 'challenges', challengeId));
    return new Challenge(snapshot);
}

async function fetchParticipants(challengeId: string): Promise<Participant[]> {
    const snapshot = await getDocs(
        query(collection(db, 'participants'),
            where('challengeId', '==', challengeId)));
    return snapshot.docs.map(doc => new Participant(doc));
}

function renderLeaderboard(participants: Participant[], currentDay: number) {
    const leaderboardEntries =
        participants.map(participant => new LeaderboardEntryData(participant, currentDay));

    return leaderboardEntries
        .sort(LeaderboardEntryData.compare)
        .map((entry, index) => (
            <LeaderboardEntry
                key={genKey()}
                index={index}
                data={entry}
                currentDay={currentDay}
            />
        ));
}

export default async function Leaderboard({ params }: LeaderboardProps) {
    const { slug } = params;
    const challengeId = slug;

    const challenge = await fetchChallenge(challengeId);
    const participants = await fetchParticipants(challengeId);

    let currentDay = daysBetween(challenge!.startDate);
    if (currentDay >= challenge!.dayCount) {
        currentDay = challenge!.dayCount - 1;
    }

    return (
        <div className="flex items-center justify-center flex-col">
            <h1 className="font-bold underline mb-8">{challenge!.name}: Day #{currentDay + 1}</h1>
            <div className="w-80 flex flex-col justify-start">
                {renderLeaderboard(participants, currentDay)}
            </div>
        </div>
    );
}