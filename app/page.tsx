"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Footer from "@/components/Footer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import LeaderboardTable from "@/components/LeaderboardTable";

import Link from "next/link";
import { Gamemode } from "@/types/GameTypes";
import { useState } from "react";
import { ModeToggle } from "@/components/ModeToggle";

const gamemodes: Gamemode[] = [
  {
    name: "Multiple Choice",
    slug: "multiple",
    desc: "Try to guess the name by selecting one of the options",
    dif: "Medium",
    badgeColor: "bg-orange-400",
  },
  {
    name: "Manual",
    slug: "manual",
    desc: "Try to guess the name by manually typing on the input field",
    dif: "Hard",
    badgeColor: "bg-red-600",
  },
  {
    name: "Timed M/C",
    slug: "timed-multiple",
    desc: "Try to guess the name by selecting one of the options",
    dif: "Medium",
    badgeColor: "bg-orange-400",
  },
  {
    name: "Timed Manual",
    slug: "timed-manual",
    desc: "Try to guess the name by manually typing on the input field",
    dif: "Hard",
    badgeColor: "bg-red-600",
  },
];

export default function Home() {
  const [gamemode, setGamemode] = useState<string>("multiple");

  return (
    <main className="flex flex-col items-center mt-3 h-screen gap-5">
      <h1 className="scroll-m-20 border-b pb-2 text-4xl font-semibold tracking-tight text-center mb-5 lg:text-5xl">
        Guess the brand name
      </h1>
      <div className="text-center flex flex-col items-center gap-5 h-fit grow px-3">
        {/* <div className="flex flex-row items-center justify-center">
          <Badge className="bg-green-600">New!</Badge>
          <Dialog>
            <Button asChild variant="link" className="p-1 pr-3">
              <DialogTrigger>Leaderboard</DialogTrigger>
            </Button>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Highest Scores</DialogTitle>
                <LeaderboardTable />
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div> */}
        <h2 className="scroll-m-20 text-3xl font-medium tracking-tight">
          How to play:
        </h2>
        <div className="bg-primary-foreground p-4 rounded-md pb-6 w-80 md:w-fit">
          <h4>
            <Badge variant="outline">1</Badge> Select a game mode
          </h4>
          <Tabs defaultValue="multiple">
            <TabsList className="bg-inherit flex flex-wrap">
              {gamemodes.map((gm, i) => {
                return (
                  <TabsTrigger
                    value={gm.slug}
                    onClick={() => setGamemode(gm.slug)}
                    key={i}
                  >
                    {gm.name}
                  </TabsTrigger>
                );
              })}
            </TabsList>
            {gamemodes.map((gm, i) => {
              return (
                <TabsContent className="pt-6 md:pt-0" value={gm.slug} key={i}>
                  {gm.desc}
                  <br />
                  <Badge className={`${gm.badgeColor}`}>{gm.dif}</Badge>
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
        <div className="bg-primary-foreground p-4 rounded-md w-72">
          <h4>
            <Badge variant="outline">2</Badge>
            {gamemode.includes("timed") ? (
              <>
                <p className="inline">Timed mode</p>
                <br />
                <span>
                  Guess correctly and get a point.
                  <br />
                  Try to get as many points in the span of 60 seconds.
                </span>
              </>
            ) : (
              <>
                <p className="inline">Normal mode</p>
                <br />
                <span>
                  Guess correctly and get a point.
                  <br />
                  Guess incorrectly and lose a life.
                  <br />
                  Lose 3 lives and game is over.
                </span>
              </>
            )}
          </h4>
        </div>
        <div className="bg-primary-foreground p-4 rounded-md">
          <h4>
            <Badge variant="outline">3</Badge> Get a high score and share it
            with your friends!
          </h4>
        </div>
        <Button asChild>
          <Link href={`/play/${gamemode}`}>Play!</Link>
        </Button>
      </div>
      <Footer />
    </main>
  );
}
