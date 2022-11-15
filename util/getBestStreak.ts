import { CURRENT_DAY } from "../app/page";
import { FatPerson } from "../pages/api/data";

export function getBestStreak(fatPerson: FatPerson) {
  if (!fatPerson.daysCompleted) {
    return 0;
  }
  const n = fatPerson.daysCompleted.length;
  let currentStreak = fatPerson.daysCompleted[n - 1] == CURRENT_DAY ? 1 : 0;
  let bestStreak = currentStreak;
  for (let i = 1; i < n; i++) {
    if (fatPerson.daysCompleted[i] == fatPerson.daysCompleted[i - 1] + 1) {
      currentStreak++;
      bestStreak = Math.max(currentStreak, bestStreak);
    } else {
      currentStreak = 0;
    }
  }
  return bestStreak;
}