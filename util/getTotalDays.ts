import { FatPerson } from "../pages/api/data";

export function getTotalDays(fatPerson: FatPerson) {
  return fatPerson.daysCompleted.length;
}