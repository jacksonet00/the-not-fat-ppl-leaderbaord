'use client';

import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

interface CheckButtonProps {
    participantId: string;
    participantName: string;
    daysCompleted: number[];
    currentDay: number;
}

export default function CheckButton({
    participantId,
    participantName,
    daysCompleted,
    currentDay
}: CheckButtonProps) {
    async function toggleCompletion() {
        if (daysCompleted.at(-1) !== currentDay) {
            await setDoc(doc(db, 'participants', participantId), {
                daysCompleted: [
                    ...daysCompleted,
                    currentDay,
                ]
            }, { merge: true });
        }
        else {
            await setDoc(doc(db, 'participants', participantId), {
                daysCompleted: daysCompleted.slice(0, -1),
            }, { merge: true });
        }
    }

    return (
        <div className="mb-2 bg-slate-200 p-2 rounded-sm justify-center items-center align-middle">
            <button className="text-center w-auto" onClick={toggleCompletion}>{`${daysCompleted.at(-1) === currentDay ? 'Remove' : 'Add'} ✅ for ${participantName}`}</button>
        </div>
    );
}