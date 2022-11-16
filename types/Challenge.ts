import { Completion } from "./Completion";

export type Challenge = {
    id: number
    name: string
    start_date: Date
    days: number
    completions?: Completion[]
}