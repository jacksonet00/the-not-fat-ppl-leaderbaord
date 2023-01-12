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

export interface SerializedLeaderboardData {
    participantId: string;
    participantName: string;
    currentDay: number;
    lineChart: number[];
    currentStreakLength: number;
    currentStreakIncludesToday: boolean;
    bestStreakLength: number;
    totalCompletions: number;
}

export class LeaderboardData {
    private participant: Participant;
    private currentDay: number;

    public lineChart: number[];

    public currentStreakLength: number = 0;
    public currentStreakIncludesToday: boolean = false;
    public bestStreakLength: number;
    public totalCompletions: number;

    static compare(a: LeaderboardData, b: LeaderboardData) {
        return Number(b.currentStreakIncludesToday) - Number(a.currentStreakIncludesToday) ||
                b.currentStreakLength - a.currentStreakLength ||
                b.bestStreakLength - a.bestStreakLength ||
                b.totalCompletions - a.totalCompletions;
    }

    public serialize(): SerializedLeaderboardData {
        return {
            participantId: this.participant.id,
            participantName: this.participant.name,
            currentDay: this.currentDay,
            currentStreakIncludesToday: this.currentStreakIncludesToday,
            currentStreakLength: this.currentStreakLength,
            bestStreakLength: this.bestStreakLength,
            totalCompletions: this.totalCompletions,
            lineChart: this.lineChart,
        }
    }

    constructor(participant: Participant, currentDay: number) {
        this.participant = participant;
        this.currentDay = currentDay;

        let graph = [];
        let streak = 0;
        let best = streak;

        let i = 0;
        for (let j = 0; j < this.participant.daysCompleted.length; j++) {
            while (i < this.participant.daysCompleted[j]) {
                best = Math.max(streak, best);
                streak = 0;
                graph.push(streak);
                i++;
            }
            streak++;
            graph.push(streak);
            i++;
        }
        this.bestStreakLength = Math.max(streak, best);

        while (i < this.currentDay) {
            graph.push(0);
            i++;
        }

        this.lineChart = graph;

        if (participant.daysCompleted.at(-1)! === currentDay) {
            this.currentStreakLength = this.lineChart.at(-1)!;
            this.currentStreakIncludesToday = true;
        }

        if (participant.daysCompleted.at(-1)! === currentDay - 1) {
            this.currentStreakLength = this.lineChart.at(-1)!;
        }

        this.bestStreakLength = Math.max(...this.lineChart);
        this.totalCompletions = participant.daysCompleted.length;
    }
};