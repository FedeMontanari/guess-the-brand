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
import { Heart, Share2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import HighscoreForm from "./HighscoreForm";

export default function BaseGame({
  gameMode,
  ...props
}: {
  gameMode: "Multiple" | "Manual";
}) {
  // Initiating game states
  const [guess, setGuess] = useState<string>("");
  const [icon, setIcon] = useState<SimpleIcon>(getRandomIcon());
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [lives, setLives] = useState<number>(3);
  const [open, setOpen] = useState<boolean>(false);
  const [options, setOptions] = useState<SimpleIcon[]>([]);

  // Handler function for user guess input
  function guessHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Empty guess toasts
    if (guess.length <= 0 && gameMode == "Multiple")
      return toast.warning("Select an option first!");
    if (guess.length <= 0 && gameMode == "Manual")
      return toast.warning("Type your guess first!");
    // Correct answer
    if (guess.toUpperCase() == icon.title.toUpperCase()) {
      toast.success("Correct!");
      setScore(score + 1);
      // Incorrect answer
    } else {
      toast.error(`Incorrect. Answer was ${icon.title}`, {
        duration: 2500,
        closeButton: true,
      });
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

  function saveScoreHandler() {
    localStorage.setItem(gameMode, score.toString());
    resetHandler();
  }

  function shareHandler() {
    const message = `I got a score of ${score} in Normal ${
      gameMode == "Multiple" ? "Multiple Choice" : "Manual"
    } mode!\nTry and do better than me!\nhttps://guessthebrand.vercel.app/`;

    navigator.clipboard
      .writeText(message)
      .then(() => {
        toast.success("Message copied to the clipboard!");
      })
      .catch(() => toast.error("An error occurred, try again!"));
  }

  // Refresh the options array from the new icon trigger
  useEffect(() => {
    const arr = [getRandomIcon(), getRandomIcon(), getRandomIcon(), icon];
    setOptions(arr.sort((a, b) => 0.5 - Math.random()));
  }, [icon]);

  // Toggle the alert dialog popup
  useEffect(() => {
    if (lives <= 0) setOpen(true);
  }, [lives]);

  // Get the highest score from localStorage
  useEffect(() => {
    const score = localStorage.getItem(gameMode);
    if (score) setHighScore(Number(score));
  }, [open]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 bg-primary-foreground rounded-md py-5 px-7 w-fit">
      {/* Game finished dialog alert. Contains variable renders depending on score state */}
      <AlertDialog open={open}>
        <AlertDialogContent className="w-3/4 rounded-md">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {score > highScore ? "New high score!" : "You lost"}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              <p className="text-lg font-semibold">
                Final score: {score.toString()} Highest score:{" "}
                {highScore.toString()}
                <br />
                {score > highScore ? (
                  <span className="font-normal text-base">
                    Upload score to the leaderboard?
                  </span>
                ) : (
                  ""
                )}
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-row justify-center">
            {score > highScore ? (
              <div className="flex flex-col space-y-3 w-full">
                <HighscoreForm score={score} mode={gameMode} variant="Normal" />
                <div className="flex items-center justify-evenly">
                  <Button onClick={() => shareHandler()}>
                    Share
                    <Share2 className="pl-1" />
                  </Button>
                  <AlertDialogAction onClick={() => saveScoreHandler()}>
                    Play again
                  </AlertDialogAction>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-evenly w-full">
                <Button onClick={() => shareHandler()}>
                  Share
                  <Share2 className="pl-1" />
                </Button>
                <AlertDialogAction onClick={() => resetHandler()}>
                  Play Again
                </AlertDialogAction>
              </div>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {/* Life hearts display */}
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
      {/* Main game section. Contains the user input for both games (manual and multiple choice) */}
      <form onSubmit={guessHandler} className="text-center">
        {gameMode == "Multiple" ? (
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
        {gameMode == "Manual" ? (
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
