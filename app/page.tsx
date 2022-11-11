'use client';

import { FatPerson } from "../pages/api/data";
import styles from './page.module.css';
import { Box, Button, ChakraProvider, Heading, Menu, MenuButton, Progress, Spinner, Text, useColorMode } from '@chakra-ui/react';
import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

const currentDay = 26;

async function fetchData() {
  const res = await fetch('https://nfp-leaderboard.vercel.app/api/data', {
    cache: 'no-store'
  });
  return res.json();
}

function getTotalDays(fatPerson: FatPerson) {
  return fatPerson.daysCompleted.length;
}

function getCurrentStreak(fatPerson: FatPerson) {
  if (!fatPerson.daysCompleted || fatPerson.daysCompleted[fatPerson.daysCompleted.length - 1] !== currentDay) {
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

const defaultData: FatPerson[] = [
  {
    name: 'jason',
    daysCompleted: [
      0, 1, 2, 3, 4, 5, 6, 7,
      8, 9, 10, 11, 12, 13, 14, 15,
      16, 17, 18, 19, 20, 21, 22, 23,
      24, 25, 26
    ]
  },
  {
    name: 'justin',
    daysCompleted: [
      1, 9, 10, 11, 12,
      14, 16, 18, 19, 20,
      21, 24, 25, 26
    ]
  },
  {
    name: 'ethan',
    daysCompleted: [
      1, 2, 3, 5,
      6, 8, 20, 24
    ]
  },
  { name: 'katherine', daysCompleted: [2, 3, 4, 9, 12, 20] },
  {
    name: 'ashlin',
    daysCompleted: [
      2, 3, 4, 5,
      12, 13, 14, 21
    ]
  },
  {
    name: 'jackson',
    daysCompleted: [
      0, 1, 2, 3, 9, 10, 11,
      12, 14, 15, 16, 17, 18, 19,
      20, 21, 22, 23, 24, 25, 26
    ]
  },
  {
    name: 'liza',
    daysCompleted: [
      2, 3, 6, 9,
      16, 18, 20, 22, 24, 26
    ]
  },
  { name: 'sarah', daysCompleted: [] },
  {
    name: 'tori',
    daysCompleted: [
      0, 1, 2, 3, 4, 6,
      8, 9, 12, 14, 16, 20,
      22, 24, 26
    ]
  }
];

export default function Home() {
  const [data, setData] = useState<FatPerson[] | null>(defaultData);
  const { colorMode, toggleColorMode } = useColorMode();

  // useEffect(() => {
  //   fetch('https:///api/data', {
  //     cache: 'no-store'
  //   })
  //     .then((_data) => _data.json())
  //     .then((json) => setData(json));
  // }, []);

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
          <Heading size="md" textDecoration="underline">100 Day Challenge: Day #{currentDay + 1}</Heading>
        </Box>
        <Box w={{ base: "95%", lg: 'lg' }} padding={4}>
          {data.sort((left: FatPerson, right: FatPerson) => (getTotalDays(right) - getTotalDays(left))).sort((left: FatPerson, right: FatPerson) => (getCurrentStreak(right) - getCurrentStreak(left))).map((fatPerson: FatPerson, idx: number) => (
            <Box key={fatPerson.name} paddingTop={2} paddingBottom={2}>
              <Text fontWeight="bold">{`${fatPerson.name[0].toUpperCase()}${fatPerson.name.slice(1).toLowerCase()}${idx === 0 ? ' 👑' : ''}`}</Text>
              <Box>Current streak: {getCurrentStreak(fatPerson)} | Total Completions: {getTotalDays(fatPerson)}</Box>
              <Progress colorScheme={colorMode === 'dark' ? 'orange' : 'yellow'} value={(getCurrentStreak(fatPerson) / currentDay) * 100} />
              <Progress colorScheme="blue" value={(getTotalDays(fatPerson) / currentDay) * 100} />
            </Box>
          ))}
        </Box>
      </Box >
    </>
  )
}
