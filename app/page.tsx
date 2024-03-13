"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [gamemode, setGamemode] = useState<string>("multiple");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="scroll-m-20 border-b pb-2 text-4xl font-semibold tracking-tight first:mt-0 mb-10 lg:text-5xl">
        Guess the brand name
      </h1>
      <div className="text-center flex flex-col items-center gap-5 h-96">
        <h2 className="scroll-m-20 text-3xl font-medium tracking-tight">
          How to play:
        </h2>
        <div className="bg-primary-foreground p-4 rounded-md pb-6">
          <h4 className="inline">
            <Badge variant="outline">1</Badge> Select a game mode:{" "}
          </h4>
          <Tabs defaultValue="multiple" className="inline">
            <TabsList className="bg-inherit">
              <TabsTrigger
                value="multiple"
                onClick={() => setGamemode("multiple")}
              >
                Multiple Choice
              </TabsTrigger>
              <TabsTrigger value="manual" onClick={() => setGamemode("manual")}>
                Manual
              </TabsTrigger>
            </TabsList>
            <TabsContent value="multiple">
              Try to guess the name by selecting one of the options
              <br />
              <Badge className="bg-orange-400">Medium</Badge>
            </TabsContent>
            <TabsContent value="manual">
              Try to guess the name by manually typing on the input field
              <br />
              <Badge variant="destructive">Hard</Badge>
            </TabsContent>
          </Tabs>
        </div>
        <div className="bg-primary-foreground p-4 rounded-md">
          <h4>
            <Badge variant="outline">2</Badge> Try to get the highest score
            possible!
          </h4>
        </div>
        <Button asChild>
          <Link href={`/play/${gamemode}`}>Start!</Link>
        </Button>
      </div>
    </main>
  );
}
