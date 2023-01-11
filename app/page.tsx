import { logEvent } from "firebase/analytics";
import { collection, getDocs, query } from "firebase/firestore";
import Link from "next/link";
import { db, getAnalyticsSafely } from '../firebase';
import { Challenge } from "../types";

async function fetchChallenges() {
  const snapshot = await getDocs(query(collection(db, 'challenges')));
  return snapshot.docs.map(doc => new Challenge(doc));
}

function renderChallengeList(challenges: Challenge[]) {
  return challenges.map((challenge, index) => (
    <div
      className="bg-slate-200 hover:bg-slate-400 text-zinc-900 font-bold py-2 px-4 rounded inline-flex items-center"
      key={challenge.id}
    >
      <Link href={`/leaderboard/${challenge.id}`}>{challenge.name}</Link>
    </div>
  ));
}

export default async function Home() {
  const challenges: Challenge[] = await fetchChallenges();
  const analytics = getAnalyticsSafely();
  if (analytics) {
    logEvent(analytics, 'page_view', {
      page_title: 'home',
      page_path: '/',
    });
  }

  return (
    <div>
      {renderChallengeList(challenges)}
    </div>
  );
}
