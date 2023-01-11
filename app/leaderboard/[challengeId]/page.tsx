import { logEvent } from "firebase/analytics";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import LeaderboardEntry from "../../../components/LeaderboardEntry";
import { db, getAnalyticsSafely } from "../../../firebase";
import { Challenge, LeaderboardData, Participant } from "../../../types";
import { daysBetween, genKey } from "../../../util";

export type LeaderboardProps = {
    params: { challengeId: string; },
    searchParams: { id: string; },
};

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
    return participants
        .map(participant => new LeaderboardData(participant, currentDay))
        .sort(LeaderboardData.compare)
        .map((leaderboardData, index) => (
            <LeaderboardEntry
                key={genKey()}
                crown={index === 0}
                leaderboardData={leaderboardData}
            />
        ));
}

export default async function Leaderboard({ params }: LeaderboardProps) {
    const { challengeId } = params;

    const challenge = await fetchChallenge(challengeId);
    const participants = await fetchParticipants(challengeId);

    let currentDay = daysBetween(challenge!.startDate);
    if (currentDay >= challenge!.dayCount) {
        currentDay = challenge!.dayCount - 1;
    }

    const analytics = getAnalyticsSafely();
    if (analytics) {
        logEvent(analytics, 'page_view', {
            page_title: `${challenge.name} leaderboard`,
            page_path: `/leaderboard/${challenge.id}`
        });
    }

    return (
        <div className="flex items-center justify-center flex-col">
            <h1 className="font-bold underline mb-8">{challenge!.name}: Day #{currentDay + 1}</h1>
            <div className="w-80 flex flex-col justify-start mb-10">
                {renderLeaderboard(participants, currentDay)}
            </div>
        </div>
    );
}