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

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<FatPerson[]|null>
) {
    const data: FatPerson[] = fatPeople.map((name) => ({ name, daysCompleted: []}));

    const filePath = path.resolve('.', 'data/data.csv');

    return fs.createReadStream(filePath)
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", function (row) {
        row.slice(1).forEach((entry: string, idx: number) => {
            if (entry === "TRUE") {
                data[idx].daysCompleted.push(Number(row[0]));
            }
        })
    })
    .on("error", function (_) {
        res.status(500).json(null);
    })
    .on("end", () => {
        res.status(200).json(data);
    });
}
