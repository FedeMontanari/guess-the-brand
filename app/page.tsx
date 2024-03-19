"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const gamemodes: {
  name: string;
  slug: string;
  desc: string;
  dif: string;
  badgeColor: string;
}[] = [
  {
    name: "Multiple Choice",
    slug: "multiple",
    desc: "Try to guess the name by selecting one of the options",
    dif: "Medium",
    badgeColor: "orange-400",
  },
  {
    name: "Manual",
    slug: "manual",
    desc: "Try to guess the name by manually typing on the input field",
    dif: "Hard",
    badgeColor: "red-600",
  },
  {
    name: "Timed M/C",
    slug: "timed-multiple",
    desc: "Try to guess the name by selecting one of the options",
    dif: "Medium",
    badgeColor: "orange-400",
  },
  {
    name: "Timed Manual",
    slug: "timed-manual",
    desc: "Try to guess the name by manually typing on the input field",
    dif: "Hard",
    badgeColor: "red-600",
  },
];

export default function Home() {
  const [gamemode, setGamemode] = useState<string>("multiple");

  return (
    <main className="flex flex-col items-center justify-start mt-4 p-4 md:p-0">
      <h1 className="scroll-m-20 border-b pb-2 text-4xl font-semibold tracking-tight text-center mb-10 lg:text-5xl">
        Guess the brand name
      </h1>
      <div className="text-center flex flex-col items-center gap-5 h-96">
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
                  <Badge className={`bg-${gm.badgeColor}`}>{gm.dif}</Badge>
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
          <Link href={`/play/${gamemode}`}>Start!</Link>
        </Button>
      </div>
      <section className="text-center mt-52 md:mt-32 2xl:absolute bottom-5">
        <p>
          Icons provided by{" "}
          <Button asChild variant="link" className="inline p-0">
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://simpleicons.org/"
            >
              Simple Icons
              <ExternalLink className="inline scale-75" />
            </Link>
          </Button>
        </p>
        <p>Licenses and use guidelines on their website.</p>
        <br />
        <p className="bg-primary-foreground rounded-md">
          Made by{" "}
          <Button asChild variant="link" className="p-0 inline">
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://itsyaki.online"
            >
              Yaki
              <ExternalLink className="inline scale-75" />
            </Link>
          </Button>
        </p>
      </section>
    </main>
  );
}
