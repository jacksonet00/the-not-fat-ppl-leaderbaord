'use client';

import { FatPerson } from "../pages/api/data";
import { Box, Button, Heading, Menu, MenuButton, Progress, Spinner, Text, useColorMode } from '@chakra-ui/react';
import { useState } from "react";
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import { getBestStreak, getCurrentStreak, getTotalDays } from "../util";
import { appData } from "../data/appData";

export const CURRENT_DAY = 30;

export default function Home() {
  const [data, setData] = useState<FatPerson[] | null>(appData);
  const { colorMode, toggleColorMode } = useColorMode();

  if (!data) {
    return (
      <Box w="100vw" h="100vh" alignItems="center" justifyContent="center" display="flex">
        <Spinner
          size='xl'
        />
      </Box>
    );
  }


  return (
    <>
      <Box position="absolute" top={0} right={0} padding={4}>
        <Menu>
          <MenuButton as={Button} onClick={toggleColorMode}>
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </MenuButton>
        </Menu>
      </Box>
      <Box alignItems="center" justifyContent="center" display="flex" flexDirection="column">
        <Box w={{ base: "95%", lg: 'lg' }} padding={4} alignItems="center" justifyContent="center" display="flex" >
          <Heading size="2xl">🍏</Heading>
        </Box>
        <Box w={{ base: "95%", lg: 'lg' }} padding={4} alignItems="center" justifyContent="center" display="flex" >
          <Heading size="2xl">the not fat ppl</Heading>
        </Box>
        <Box w={{ base: "95%", lg: 'lg' }} padding={4} alignItems="center" justifyContent="center" display="flex" >
          <Heading size="md" textDecoration="underline">100 Day Challenge: Day #{CURRENT_DAY + 1}</Heading>
        </Box>
        <Box w={{ base: "95%", lg: 'lg' }} padding={4}>
          {data.sort((left: FatPerson, right: FatPerson) => (getTotalDays(right) - getTotalDays(left))).sort((left: FatPerson, right: FatPerson) => (getBestStreak(right) - getBestStreak(left))).sort((left: FatPerson, right: FatPerson) => (getCurrentStreak(right) - getCurrentStreak(left))).map((fatPerson: FatPerson, idx: number) => (
            <Box key={fatPerson.name} paddingTop={2} paddingBottom={2}>
              <Text fontWeight="bold">{`${fatPerson.name[0].toUpperCase()}${fatPerson.name.slice(1).toLowerCase()}${idx === 0 ? ' 👑' : ''}`}</Text>
              <Box alignItems="left" justifyContent="left" display="flex" flexDirection="column">
                <Text>Current streak: {getCurrentStreak(fatPerson)}{`${getCurrentStreak(fatPerson) == getBestStreak(fatPerson) && getCurrentStreak(fatPerson) > 0 ? ' 🏆' : ''}`}</Text>
                <Text>Best streak: {getBestStreak(fatPerson)}</Text>
                <Text>Total Completions: {getTotalDays(fatPerson)}</Text>
              </Box>
              <Progress colorScheme={colorMode === 'dark' ? 'orange' : 'yellow'} value={(getCurrentStreak(fatPerson) / CURRENT_DAY) * 100} />
              <Progress colorScheme="blue" value={(getBestStreak(fatPerson) / CURRENT_DAY) * 100} />
              <Progress colorScheme="gray" value={(getTotalDays(fatPerson) / CURRENT_DAY) * 100} />
            </Box>
          ))}
        </Box>
      </Box >
    </>
  )
}
