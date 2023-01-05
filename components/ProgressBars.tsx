'use client';

import { ChakraProvider, Progress } from "@chakra-ui/react";

type ProgressBarsProps = {
    currentStreakLength: number;
    bestStreakLength: number;
    totalCompletions: number;
    currentDay: number;
};

export default function ProgressBars({
    currentStreakLength,
    bestStreakLength,
    totalCompletions,
    currentDay,
}: ProgressBarsProps) {
    return (
        <ChakraProvider>
            <Progress colorScheme="yellow" value={(currentStreakLength / currentDay) * 100} />
            <Progress colorScheme="blue" value={(bestStreakLength / currentDay) * 100} />
            <Progress colorScheme="gray" value={(totalCompletions / currentDay) * 100} />
        </ChakraProvider>
    );
}