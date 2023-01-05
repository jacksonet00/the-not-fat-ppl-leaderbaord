import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import ParticipantAdminForm from "../../../../components/ParticipantAdminForm";
import { db } from "../../../../firebase";
import { Challenge, Participant } from "../../../../types";
import { daysBetween, genKey } from "../../../../util";

interface LeaderboardAdminProps {
    params: { challengeId: string; };
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

export default async function LeaderboardAdmin({ params }: LeaderboardAdminProps) {
    const { challengeId } = params;

    const challenge = await fetchChallenge(challengeId);
    const participants = await fetchParticipants(challengeId);

    let currentDay = daysBetween(challenge!.startDate);
    if (currentDay >= challenge!.dayCount) {
        currentDay = challenge!.dayCount - 1;
    }

    return (
        <div className="flex flex-col">
            {participants.map(participant =>
                <ParticipantAdminForm
                    currentDay={currentDay}
                    daysCompleted={participant.daysCompleted}
                    participantId={participant.id}
                    participantName={participant.name}
                    key={genKey()}
                />)}
        </div>
    );
}