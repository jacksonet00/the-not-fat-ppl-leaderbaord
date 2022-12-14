import { Completion } from "./Completion";

export type User = {
    id: number;
    name: string;
    profile_photo: string | null;
    completions?: Completion[]
};