import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { Challenge } from "../types/Challenge";

async function fetchChallenges() {
  const prisma = new PrismaClient();
  return prisma.challenges.findMany();
}


function renderChallengeList(challenges: Challenge[]) {
  return challenges.map((challenge) => (
    <div className="bg-slate-200 hover:bg-slate-400 text-zinc-900 font-bold py-2 px-4 rounded inline-flex items-center" key={challenge.id}>
      <Link href={`/leaderboard/${challenge.id}`}>{challenge.name}</Link>
    </div>
  ));
}

export default async function Home() {
  const challenges: Challenge[] = await fetchChallenges();

  return (
    <div>
      {renderChallengeList(challenges)}
    </div>
  );
}
