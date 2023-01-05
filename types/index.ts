import { DocumentData, DocumentSnapshot, Timestamp } from "firebase/firestore";

export interface ChallengeDocument {
    name: string;
    startDate: Timestamp;
    dayCount: number;
}

export class Challenge {
    id: string;
    name: string;
    startDate: Date;
    dayCount: number;

    constructor(doc: DocumentSnapshot<DocumentData>) {
        const { name, startDate, dayCount } = doc.data()! as ChallengeDocument;

        this.id = doc.id;
        this.name = name;
        this.startDate = startDate.toDate();
        this.dayCount = dayCount;
    }
};


export interface ParticipantDocument {
    name: string;
    challengeId: string;
    daysCompleted: number[];
}

export class Participant {
    id: string;
    name: string;
    challengeId: string;
    daysCompleted: number[];

    constructor(doc: DocumentSnapshot<DocumentData>) {
        const { name, challengeId, daysCompleted } = doc.data()! as ParticipantDocument;

        this.id = doc.id;
        this.name = name;
        this.challengeId = challengeId;
        this.daysCompleted = daysCompleted;
    }
};

export class Streak {
    length: number;
    includesToday: boolean;

    constructor() {
        this.length = 0;
        this.includesToday = false;
    }
}

export class LeaderboardEntryData {
    private participant: Participant;
    private currentDay: number;

    static compare(a: LeaderboardEntryData, b: LeaderboardEntryData) {
        return b.currentStreak().length - a.currentStreak().length ||
                b.bestStreakLength() - a.bestStreakLength() ||
                b.totalCompletions() - a.totalCompletions();
    }
    
    currentStreak(): Streak {
        let streak = new Streak();
        let { daysCompleted } = this.participant;

        if (!daysCompleted.length || daysCompleted.at(-1)! < this.currentDay - 1) {
            return streak;
        }

        streak.length = 1;

        if (daysCompleted.at(-1) == this.currentDay) {
            streak.includesToday = true;
        }

        if (daysCompleted.length < 2) {
            return streak;
        }

        for (let i = daysCompleted.length - 1; i > 0; i--) {
            if (daysCompleted[i] === daysCompleted[i - 1] + 1) {
                streak.length += 1;
            }
            else {
                return streak;
            }
        }

        return streak;
    }

    bestStreakLength(): number {
        let { daysCompleted } = this.participant;

        if (!daysCompleted.length) {
            return 0;
        }

        let curr = 1;
        let best = curr;
        for (let i = daysCompleted.length - 1; i > 0; i--) {
            if (daysCompleted[i] === daysCompleted[i - 1] + 1) {
                curr += 1;
                best = Math.max(curr, best);
            }
            else {
                curr = 1;
            }
        }
        return best;
    }

    totalCompletions(): number {
        return this.participant.daysCompleted.length;
    }

    getParticipantName(): string {
        return this.participant.name;
    }

    getLineChart(): number[] {
        let graph = [];
        let streak = 0;

        let i = 0;
        for (let j = 0; j < this.participant.daysCompleted.length; j++) {
            while (i < this.participant.daysCompleted[j]) {
            streak = 0;
            graph.push(streak);
            i++;
            }
            streak++;
            graph.push(streak);
            i++;
        }

        while (i < this.currentDay) {
            graph.push(0);
            i++;
        }

        return graph;
    }

    constructor(participant: Participant, currentDay: number) {
        this.participant = participant;
        this.currentDay = currentDay;
    }
};