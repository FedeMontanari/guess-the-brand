import React from "react";
import { Button } from "./ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import Link from "next/link";
import { ChevronsUpDown, ExternalLink } from "lucide-react";

const issues: { desc: string; fixed: boolean }[] = [
  {
    desc: "Some white icons will blend with the background, making them hard to identify.",
    fixed: false,
  },
  {
    desc: "Sometimes the first icon will not line up with the options on the Multiple Choice mode.",
    fixed: false,
  },
  {
    desc: "Very rare occasions where you get repeated options on the Multiple Choice mode.",
    fixed: false,
  },
  {
    desc: "Sometimes the color of the icon will not match exactly with the real one.",
    fixed: false,
  },
];

export default function Footer() {
  return (
    <footer className="text-center">
      <div className="mb-4">
        <p>
          Icons from{" "}
          <Button asChild variant="link" className="inline p-0 text-lg">
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
        <p className="italic">Licenses and use guidelines on their website.</p>
      </div>
      <Collapsible className="bg-slate-700 p-3 rounded-md mx-4 md:mx-auto mb-4 md:w-1/3">
        <div className="flex items-center justify-between space-x-4 px-4">
          <h4 className="text-sm font-semibold">Some known issues</h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-9 p-0">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="flex flex-col gap-2">
          {issues.map((v, i) => {
            if (!v.fixed)
              return (
                <p
                  className="rounded-md border px-4 py-3 font-mono text-sm"
                  key={i}
                >
                  - {v.desc}
                </p>
              );
          })}
        </CollapsibleContent>
      </Collapsible>
      <p className="bg-primary-foreground rounded-md w-screen py-1">
        Made by{" "}
        <Button
          asChild
          variant="link"
          className="p-0 inline text-lg font-semibold"
        >
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://itsyaki.online"
          >
            Yaki
          </Link>
        </Button>
      </p>
    </footer>
  );
}
