"use client";

import getRandomIcon from "@/util/simpleIcons";
import type { SimpleIcon } from "simple-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChangeEvent, FormEvent, useState } from "react";

export default function SimpleIcon() {
  const [input, setInput] = useState<string>("");
  const [icon, setIcon] = useState<SimpleIcon>(getRandomIcon());

  function guessHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (input.toUpperCase() == icon.title.toUpperCase()) {
      alert("Correct!");
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
    <div className="flex flex-col items-center justify-center gap-4">
      <svg
        role="img"
        viewBox="0 0 24 24"
        fill="currentColor"
        width="120px"
        height="120px"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          color: `#${icon.hex}`,
        }}
        className="bg-white p-3 rounded-sm"
      >
        <title>{icon.title}</title>
        <path d={icon.path}></path>
      </svg>
      <form onSubmit={guessHandler} className="text-center">
        <Input
          type="text"
          placeholder="Your guess here"
          className="bg-secondary-foreground text-secondary"
          value={input}
          onChange={inputChangeHandler}
        />
        <Button type="submit">Guess</Button>
      </form>
    </div>
  );
}
