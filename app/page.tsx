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

function renderChallengeList(challenges: Challenge[]) {
  return challenges.map((challenge) => (
    <div key={challenge.id}>
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
