"use client";

import getRandomIcon from "@/util/simpleIcons";
import type { SimpleIcon } from "simple-icons";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { FormEvent, useEffect, useState } from "react";

export default function Multiple() {
  const [guess, setGuess] = useState<string>("");

  const [icon, setIcon] = useState<SimpleIcon>(getRandomIcon());
  const [options, setOptions] = useState<SimpleIcon[]>([]);
  const [score, setScore] = useState<number>(0);

  function guessHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (guess.toUpperCase() == icon.title.toUpperCase()) {
      alert("Correct!");
      setScore(score + 1);
    } else {
      alert(`Incorrect. Answer was ${icon.title}`);
    }
    setIcon(getRandomIcon());
    setGuess("");
  }

  useEffect(() => {
    const arr = [getRandomIcon(), getRandomIcon(), getRandomIcon(), icon];
    setOptions(arr.sort((a, b) => 0.5 - Math.random()));
  }, [icon]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 bg-primary-foreground rounded-md py-5 px-7 w-fit">
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
        {options.length ? (
          <RadioGroup
            onValueChange={(v) => setGuess(v)}
            defaultValue={options[0].title}
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

        <Button type="submit">Guess</Button>
      </form>
    </div>
  );
}
