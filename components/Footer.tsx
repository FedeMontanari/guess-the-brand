import Link from "next/link";
import { ExternalLink } from "lucide-react";

import { Button } from "./ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
      <div className="bg-zinc-700 rounded-md w-3/4 md:w-1/3 mx-auto mb-4">
        <Accordion type="single" collapsible>
          <AccordionItem value="issues">
            <AccordionTrigger>Known Issues</AccordionTrigger>
            <AccordionContent>
              <ul>
                {issues.map((v, i) => {
                  if (!v.fixed)
                    return (
                      <li key={i} className="pb-3 last:pb-3">
                        - {v.desc}
                      </li>
                    );
                  return;
                })}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
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
      {/* <p className="bg-primary-foreground rounded-md w-screen py-1">
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
      </p> */}
    </footer>
  );
}
