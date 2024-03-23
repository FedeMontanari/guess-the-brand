"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Leaderboard } from "@/types/GameTypes";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";

export default function LeaderboardTable() {
  const [table, setTable] = useState<Leaderboard[]>([]);

  useEffect(() => {
    fetch("/api/leaderboard")
      .then((res) => res.json())
      .then((data) => setTable(data.slice(0, 10)));
  }, []);

  if (!table.length)
    return (
      <div className="w-full text-center">
        <p>
          <LoaderCircle className="animate-spin inline p-1" />
          Fetching data
        </p>
      </div>
    );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Game Mode</TableHead>
          {/* <TableHead>Variant</TableHead> */}
          {/* <TableHead>Date</TableHead> */}
          <TableHead className="text-right">Score</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {table.length ? (
          <>
            {table.map((v, i) => {
              return (
                <TableRow key={i}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell className="font-medium">{v.name}</TableCell>
                  <TableCell>{`${v.mode}(${v.variant})`}</TableCell>
                  {/* <TableCell>{v.variant}</TableCell> */}
                  {/* <TableCell>{new Date(v.date).toDateString()}</TableCell> */}
                  <TableCell className="text-right">{v.score}</TableCell>
                </TableRow>
              );
            })}
          </>
        ) : (
          <></>
        )}
      </TableBody>
    </Table>
  );
}
