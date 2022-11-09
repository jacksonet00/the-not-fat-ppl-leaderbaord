// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import * as fs from "fs";
import * as path from 'path';
import { parse } from 'csv-parse';

export type FatPerson = {
    name: string
    daysCompleted: number[]
}

const fatPeople: string[] = ['jason','justin','ethan','katherine','ashlin','jackson','liza','sarah','tori'];

const defaultData: FatPerson[] = [
  {
    name: 'jason',
    daysCompleted: [
       0,  1,  2,  3,  4,  5,  6,  7,
       8,  9, 10, 11, 12, 13, 14, 15,
      16, 17, 18, 19, 20, 21, 22, 23,
      24
    ]
  },
  {
    name: 'justin',
    daysCompleted: [
       1,  9, 10, 11, 12,
      14, 16, 18, 19, 20,
      21, 24
    ]
  },
  {
    name: 'ethan',
    daysCompleted: [
      1, 2,  3,  5,
      6, 8, 20, 24
    ]
  },
  { name: 'katherine', daysCompleted: [ 2, 3, 4, 9, 12, 20 ] },
  {
    name: 'ashlin',
    daysCompleted: [
       2,  3,  4,  5,
      12, 13, 14, 21
    ]
  },
  {
    name: 'jackson',
    daysCompleted: [
       0,  1,  2,  3,  9, 10, 11,
      12, 14, 15, 16, 17, 18, 19,
      20, 21, 22, 23, 24
    ]
  },
  {
    name: 'liza',
    daysCompleted: [
       2,  3,  6,  9,
      16, 18, 20, 22
    ]
  },
  { name: 'sarah', daysCompleted: [] },
  {
    name: 'tori',
    daysCompleted: [
       0,  1,  2,  3,  4,  6,
       8,  9, 12, 14, 16, 20,
      22, 24
    ]
  }
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<FatPerson[]|null>
) {
    return res.status(200).json(defaultData);
    // const data: FatPerson[] = fatPeople.map((name) => ({ name, daysCompleted: []}));

    // const filePath = path.resolve('.', 'data/data.csv');

    // return fs.createReadStream(filePath)
    // .pipe(parse({ delimiter: ",", from_line: 2 }))
    // .on("data", function (row) {
    //     row.slice(1).forEach((entry: string, idx: number) => {
    //         if (entry === "TRUE") {
    //             data[idx].daysCompleted.push(Number(row[0]));
    //         }
    //     })
    // })
    // .on("error", function (_) {
    //     res.status(500).json(null);
    // })
    // .on("end", () => {
    //     console.log(data);
    //     res.status(200).json(data);
    // });
}
