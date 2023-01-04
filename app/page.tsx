import { collection, getDocs, query } from "firebase/firestore";
import Link from "next/link";
import { db } from '../firebase';
import { Challenge, genChallenge } from "../types";

async function fetchChallenges() {
  const snapshot = await getDocs(query(collection(db, 'challenges')));
  return snapshot.docs.map(doc => genChallenge(doc));
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
