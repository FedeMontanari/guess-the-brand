"use client";

import getRandomIcon from "@/util/simpleIcons";
import type { SimpleIcon } from "simple-icons";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

import { FormEvent, useEffect, useState } from "react";
import { Input } from "./ui/input";
import useCountDown from "react-countdown-hook";

export default function TimedGame({
  gameMode,
  ...props
}: {
  gameMode: "multiple" | "manual";
}) {
  const [guess, setGuess] = useState<string>("");

  const [icon, setIcon] = useState<SimpleIcon>(getRandomIcon());
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);

  const [open, setOpen] = useState<boolean>(false);
  const [gameStartAlert, setGameStartAlert] = useState<boolean>(true);
  const [timeLeft, { start, pause, resume, reset }] = useCountDown(
    60 * 1000,
    55
  );

  const [options, setOptions] = useState<SimpleIcon[]>([]);

  function guessHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (guess.length <= 0 && gameMode == "multiple")
      return toast.warning("Select an option first!");
    if (guess.length <= 0 && gameMode == "manual")
      return toast.warning("Type your guess first!");
    if (guess.toUpperCase() == icon.title.toUpperCase()) {
      toast.success("Correct!");
      setScore(score + 1);
    } else {
      toast.error(`Incorrect. Answer was ${icon.title}`, {
        duration: 5000,
        closeButton: true,
      });
    }
    setIcon(getRandomIcon());
    setGuess("");
  }

  function resetHandler() {
    setScore(0);
    setOpen(false);
    reset();
    start();
  }

  function saveScoreHandler() {
    localStorage.setItem(`${gameMode}-timed`, score.toString());
    resetHandler();
  }

  // Refresh the options array from the new icon trigger
  useEffect(() => {
    const arr = [getRandomIcon(), getRandomIcon(), getRandomIcon(), icon];
    setOptions(arr.sort((a, b) => 0.5 - Math.random()));
  }, [icon]);

  // Toggle the alert dialog popup
  useEffect(() => {
    if (!gameStartAlert && timeLeft <= 0) {
      setOpen(true);
    }
  }, [timeLeft]);

  // Get the highest score from localStorage
  useEffect(() => {
    const score = localStorage.getItem(`${gameMode}-timed`);
    if (score) setHighScore(Number(score));
  }, [open]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 bg-primary-foreground rounded-md py-5 px-7 w-fit">
      <AlertDialog open={open}>
        <AlertDialogContent className="w-3/4 rounded-md md:w-fit">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {score > highScore ? "New high score!" : "You lost"}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              <p className="text-lg font-semibold">
                Final score: {score.toString()}
                <br />
                Highest score: {highScore.toString()}
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            {score > highScore ? (
              <AlertDialogAction onClick={() => saveScoreHandler()}>
                Play again
              </AlertDialogAction>
            ) : (
              <AlertDialogAction onClick={() => resetHandler()}>
                Play Again
              </AlertDialogAction>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog open={gameStartAlert}>
        <AlertDialogContent className="w-3/4 rounded-md md:w-fit">
          <AlertDialogHeader>
            <AlertDialogTitle>Start when ready</AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              <p className="text-lg font-semibold">
                You have 60 seconds to guess as many names as you can!
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => {
                setGameStartAlert(false);
                start();
              }}
            >
              Start
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="flex flex-row gap-2">
        <h5 className="scroll-m-20 text-2xl font-semibold tracking-wider p-2 rounded-md bg-background">
          {(timeLeft / 1000).toFixed(2)}
        </h5>
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
        {gameMode == "multiple" ? (
          <>
            {options.length ? (
              <RadioGroup
                onValueChange={(v) => setGuess(v)}
                className="grid grid-cols-1 md:grid-cols-2 p-7 gap-5"
              >
                {options.map((opt, i) => {
                  return (
                    <div key={i} className="flex items-center space-x-2">
                      <RadioGroupItem value={opt.title} id={`option-${i}`} />
                      <Label className="text-md" htmlFor={`option-${i}`}>
                        {opt.title}
                      </Label>
                    </div>
                  );
                })}
              </RadioGroup>
            ) : (
              <></>
            )}
          </>
        ) : (
          <></>
        )}
        {gameMode == "manual" ? (
          <Input
            type="text"
            placeholder="Your guess here"
            className="bg-foreground text-background mb-2"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
          />
        ) : (
          <></>
        )}
        <Button disabled={open} type="submit">
          Guess
        </Button>
      </form>
    </div>
  );
}
