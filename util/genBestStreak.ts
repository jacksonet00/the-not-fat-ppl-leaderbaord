export function genBestStreak(daysCompleted: number[], currentDay: number) {
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