import { DocumentData, DocumentSnapshot, Timestamp } from "firebase/firestore";

export type Challenge = {
    id: string
    name: string
    startDate: Date
    dayCount: number
}

export type ChallengeDocument = {
    name: string
    startDate: Timestamp
    dayCount: number
}

export function genChallenge(doc: DocumentSnapshot<DocumentData>): Challenge {
    const { name, startDate, dayCount } = doc.data()! as ChallengeDocument;
    return {
        id: doc.id,
        name,
        startDate: startDate.toDate(),
        dayCount,
    }
}

export type Participant = {
    id: string
    name: string
    challengeId: string
    daysCompleted: number[]
}

export type ParticipantDocument = {
    name: string
    challengeId: string
    daysCompleted: number[]
}

export function genParticipant(doc: DocumentSnapshot<DocumentData>): Participant {
    const { name, challengeId, daysCompleted } = doc.data()! as ParticipantDocument;
    return {
        id: doc.id,
        name,
        challengeId,
        daysCompleted
    }
} 

export type LeaderboardEntryData = {
    participant: Participant
    totalCompletions: number
    currentStreak: { count: number, weak: boolean }
    bestStreak: number
}

export function genLeaderboardEntry(participant: Participant, currentDay: number): LeaderboardEntryData {
    const  { daysCompleted } = participant;

    function genCurrentStreak(daysCompleted: number[], currentDay: number): { count: number, weak: boolean} {
        let weak = false;
        if (!daysCompleted || daysCompleted[daysCompleted.length - 1] < currentDay - 1) {
            return { count: 0, weak: true };
        }

        if (daysCompleted[daysCompleted.length - 1] === currentDay - 1) {
            weak = true;
        }

        let streak = 1;
        let curr = daysCompleted[daysCompleted.length - 1];
        for (let i = daysCompleted.length - 2; i >= 0; i--) {
            if (daysCompleted[i] === curr - 1) {
            streak++;
            curr = daysCompleted[i];
            } else {
            return { count: streak, weak };
            }
        }
        return { count: streak, weak };
    }

    function genBestStreak(daysCompleted: number[], currentDay: number) {
        if (!daysCompleted) {
            return 0;
        }
        const n = daysCompleted.length;
        let currentStreak = daysCompleted[n - 1] == currentDay ? 1 : 0;
        let bestStreak = currentStreak;
        for (let i = 1; i < n; i++) {
            if (daysCompleted[i] == daysCompleted[i - 1] + 1) {
            bestStreak = Math.max(currentStreak + 1, bestStreak);
            currentStreak++;
            } else {
            currentStreak = 0;
            }
        }
        bestStreak = Math.max(currentStreak, bestStreak);
        return bestStreak;
    }


    return {
        participant,
        totalCompletions: daysCompleted.length,
        currentStreak: genCurrentStreak(daysCompleted, currentDay),
        bestStreak: genBestStreak(daysCompleted, currentDay),
    }
}

export function compareLeaderboardEntries(a: LeaderboardEntryData, b: LeaderboardEntryData) {
    return b.currentStreak.count - a.currentStreak.count || b.bestStreak - a.bestStreak || b.totalCompletions - a.totalCompletions;
}