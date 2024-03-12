"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  return (
    <>
      {theme === "light" ? (
        <Button variant="ghost" onClick={() => setTheme("dark")}>
          <Moon />
        </Button>
      ) : (
        <Button variant="ghost" onClick={() => setTheme("light")}>
          <Sun />
        </Button>
      )}
    </>
  );
}
