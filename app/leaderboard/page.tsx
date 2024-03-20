import { prisma } from "@/lib/prisma";
import React from "react";

async function getData() {
  const entries = await prisma.highScore.findMany();
  return entries;
}

export default async function Leaderboard() {
  const data = await getData();
  return (
    <div>
      <h1 className="text-2xl font-bold">Leaderboard</h1>
      {data.length ? (
        <>
          {data.map((v, i) => {
            return (
              <div key={i}>
                <p>Name: {v.name}</p>
                <p>Score: {v.score}</p>
                <p>Game Mode: {v.mode}</p>
                <p>{v.date.toUTCString()}</p>
              </div>
            );
          })}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
