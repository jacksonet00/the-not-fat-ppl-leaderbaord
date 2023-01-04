'use client';

import { ChakraProvider, Progress } from "@chakra-ui/react";
import { LeaderboardEntryData } from "../types";

type ProgressBarsProps = {
    leaderboardData: LeaderboardEntryData;
    currentDay: number;
};

export default function ProgressBars({ leaderboardData, currentDay }: ProgressBarsProps) {
    return (
        <ChakraProvider>
            <Progress colorScheme="yellow" value={(leaderboardData.currentStreak / currentDay) * 100} />
            <Progress colorScheme="blue" value={(leaderboardData.bestStreak / currentDay) * 100} />
            <Progress colorScheme="gray" value={(leaderboardData.totalCompletions / currentDay) * 100} />
        </ChakraProvider>
    );
}