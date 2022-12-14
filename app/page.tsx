import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import Record from "../components/Record";
import { Challenge } from "../types/Challenge";
import { User } from "../types/User";

async function fetchUsers() {
  const prisma = new PrismaClient();
  const users = await prisma.users.findMany({
    include: {
      completions: true,
    }
  });
  return users;
}

async function fetchChallenges() {
  const prisma = new PrismaClient();
  return prisma.challenges.findMany();
}


// a string with the class types for a bootstrap button with a grey container
const buttonClass = "bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center";

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
