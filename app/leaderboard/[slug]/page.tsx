import { PrismaClient } from "@prisma/client";
import Record from "../../../components/Record";
import { Completion } from "../../../types/Completion";
import { LeaderboardData } from "../../../types/LeaderboardData";
import { genLeaderboardData } from "../../../util/genLeaderboardData";

export type LeaderboardProps = {
    params: { slug: string; },
    searchParams: { id: string; },
};

async function fetchCompletions(challengeId: string): Promise<Completion[]> {
    const prisma = new PrismaClient();
    const completions: Completion[] = await prisma.completions.findMany({
        where: {
            challenge_id: Number(challengeId),
        },
        include: {
            challenge: true,
            user: true,
        }
    });
    return completions;
}

function renderRecords(records: LeaderboardData[]) {
    return records.map((record, index) => (
        <div key={record.user.id}>
            <Record record={record} index={index} />
        </div>
    ));
}

function daysBetween(date: Date) {
    return Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));
}

export default async function Leaderboard({ params }: LeaderboardProps) {
    const { slug } = params;
    const completions = await fetchCompletions(slug);

    let currentDay = daysBetween(completions[0].challenge!.start_date);
    if (currentDay >= completions[0].challenge!.days) {
        currentDay = completions[0].challenge!.days - 1;
    }

    return (
        <div className="flex items-center justify-center flex-col">
            <h1 className="font-bold underline mb-8">{completions && completions[0].challenge!.name}: Day #{currentDay + 1}</h1>
            <div className="w-80 flex flex-col justify-start">
                {renderRecords(genLeaderboardData(completions, currentDay))}
            </div>
        </div>
    );
}