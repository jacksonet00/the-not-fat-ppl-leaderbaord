import { CURRENT_DAY } from "../app/page";
import { FatPerson } from "../pages/api/data";

export function getCurrentStreak(fatPerson: FatPerson) {
  if (!fatPerson.daysCompleted || fatPerson.daysCompleted[fatPerson.daysCompleted.length - 1] !== CURRENT_DAY) {
    return 0;
  }
  let streak = 1;
  let curr = fatPerson.daysCompleted[fatPerson.daysCompleted.length - 1];
  for (let i = fatPerson.daysCompleted.length - 2; i >= 0; i--) {
    if (fatPerson.daysCompleted[i] === curr - 1) {
      streak++;
      curr = fatPerson.daysCompleted[i];
    } else {
      return streak;
    }
  }
  return streak;
}