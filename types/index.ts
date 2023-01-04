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
    currentStreak: number
    bestStreak: number
}

export function genLeaderboardEntry(participant: Participant, currentDay: number): LeaderboardEntryData {
    const  { daysCompleted } = participant;

    function genCurrentStreak(daysCompleted: number[], currentDay: number) {
        if (!daysCompleted || daysCompleted[daysCompleted.length - 1] !== currentDay) {
            return 0;
        }
        let streak = 1;
        let curr = daysCompleted[daysCompleted.length - 1];
        for (let i = daysCompleted.length - 2; i >= 0; i--) {
            if (daysCompleted[i] === curr - 1) {
            streak++;
            curr = daysCompleted[i];
            } else {
            return streak;
            }
        }
        return streak;
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
            currentStreak++;
            bestStreak = Math.max(currentStreak, bestStreak);
            } else {
            currentStreak = 0;
            }
        }
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
    if (a.currentStreak - a.currentStreak > 0) {
        return -1;
    }

    else if (b.currentStreak - a.currentStreak > 0) {
        return 1;
    }

    else if (a.bestStreak - b.bestStreak > 0) {
        return -1;
    }

    else if (b.bestStreak - a.bestStreak > 0) {
        return 1;
    }

    else if (a.totalCompletions - b.totalCompletions > 0) {
        return -1;
    }

    else if (b.totalCompletions - a.totalCompletions > 0) {
        return 1;
    }

    else {
        return 0;
    }
}