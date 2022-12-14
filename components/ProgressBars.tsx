'use client';

import { ChakraProvider, Progress } from "@chakra-ui/react";
import { LeaderboardData } from "../types/LeaderboardData";

type ProgressBarsProps = {
    record: LeaderboardData;
    currentDay: number;
};

export default function ProgressBars({ record, currentDay }: ProgressBarsProps) {
    return (
        <ChakraProvider>
            <Progress colorScheme="yellow" value={(record.currentStreak / currentDay) * 100} />
            <Progress colorScheme="blue" value={(record.bestStreak / currentDay) * 100} />
            <Progress colorScheme="gray" value={(record.totalCompletions / currentDay) * 100} />
        </ChakraProvider>
    );
}