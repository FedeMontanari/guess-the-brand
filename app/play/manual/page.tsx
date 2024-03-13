"use client";

import getRandomIcon from "@/util/simpleIcons";
import type { SimpleIcon } from "simple-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChangeEvent, FormEvent, useState } from "react";

export default function Multiple() {
  const [input, setInput] = useState<string>("");
  const [icon, setIcon] = useState<SimpleIcon>(getRandomIcon());
  const [score, setScore] = useState<number>(0);

  function guessHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (input.toUpperCase() == icon.title.toUpperCase()) {
      alert("Correct!");
      setScore(score + 1);
    } else {
      alert(`Incorrect. Answer was ${icon.title}`);
    }
    setIcon(getRandomIcon());
    setInput("");
  }

  function inputChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

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
        <Input
          type="text"
          placeholder="Your guess here"
          className="bg-foreground text-background mb-2"
          value={input}
          onChange={inputChangeHandler}
        />
        <Button type="submit">Guess</Button>
      </form>
    </div>
  );
}
