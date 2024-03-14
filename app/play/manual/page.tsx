"use client";

import getRandomIcon from "@/util/simpleIcons";
import type { SimpleIcon } from "simple-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { FormEvent, useEffect, useState } from "react";
import { Heart } from "lucide-react";

export default function Multiple() {
  const [guess, setGuess] = useState<string>("");

  const [icon, setIcon] = useState<SimpleIcon>(getRandomIcon());
  const [options, setOptions] = useState<SimpleIcon[]>([]);
  const [score, setScore] = useState<number>(0);
  const [lives, setLives] = useState<number>(3);

  const [open, setOpen] = useState<boolean>(false);

  function guessHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (guess.length <= 0) return alert("Type your guess");
    if (guess.toUpperCase() == icon.title.toUpperCase()) {
      alert("Correct!");
      setScore(score + 1);
    } else {
      alert(`Incorrect. Answer was ${icon.title}`);
      setLives(lives - 1);
    }
    setIcon(getRandomIcon());
    setGuess("");
  }

  function resetHandler() {
    setScore(0);
    setLives(3);
    setOpen(false);
  }

  useEffect(() => {
    const arr = [getRandomIcon(), getRandomIcon(), getRandomIcon(), icon];
    setOptions(arr.sort((a, b) => 0.5 - Math.random()));
  }, [icon]);

  useEffect(() => {
    if (lives <= 0) setOpen(true);
  }, [lives]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 bg-primary-foreground rounded-md py-5 px-7 w-fit">
      <AlertDialog open={open}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>You lost :(</AlertDialogTitle>
            <AlertDialogDescription>
              Final score: {score.toString()}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => resetHandler()}>
              Restart
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="flex flex-row gap-2">
        Lives:
        {Array.from({ length: lives }, () => "value").map((v, i) => {
          if (v) return <Heart key={i} className="text-red-700" />;
        })}
      </div>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Score: {score.toString()}
      </h3>
      <svg
        role="img"
        viewBox="0 0 24 24"
        fill="currentColor"
        width="240px"
        height="240px"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          color: `#${icon.hex}`,
        }}
        className="bg-white p-3 rounded-sm"
      >
        <title>Brand icon</title>
        <path d={icon.path}></path>
      </svg>
      <form onSubmit={guessHandler} className="text-center">
        <Input
          type="text"
          placeholder="Your guess here"
          className="bg-foreground text-background mb-2"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
        />
        <Button disabled={open} type="submit">
          Guess
        </Button>
      </form>
    </div>
  );
}
