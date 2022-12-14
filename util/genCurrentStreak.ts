export function genCurrentStreak(daysCompleted: number[], currentDay: number) {
  if (!daysCompleted || daysCompleted[daysCompleted.length - 1] !== currentDay) {
    return 0;
  }
  let streak = 1;
  let curr = daysCompleted[daysCompleted.length - 1];
  for (let i = daysCompleted.length - 2; i >= 0; i--) {
    if (daysCompleted[i] === curr - 1) {
      streak++;
      curr = daysCompleted[i];
    } else {
      return streak;
    }
  }
  return streak;
}