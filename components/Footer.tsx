import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

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
      <div className="bg-zinc-700 p-6 rounded-md text-start w-fit mx-4 md:mx-auto mb-4">
        <span>Known issues:</span>
        <ul className="list-disc">
          {issues.map((v, i) => {
            if (!v.fixed) return <li key={i}>{v.desc}</li>;
          })}
        </ul>
      </div>
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
