import LeaderboardTable from "@/components/LeaderboardTable";
import { ModeToggle } from "@/components/ModeToggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Toaster } from "@/components/ui/sonner";

import Link from "next/link";

export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center flex-col justify-center pb-20">
      <div className="top-5 py-3 flex flex-row items-center justify-center gap-10 w-full 2xl:fixed">
        <Button asChild variant="link">
          <Link href="/">&lt;&lt; Back</Link>
        </Button>
        <div>
          <Badge className="bg-green-600">New!</Badge>
          <Dialog>
            <Button asChild variant="link" className="p-1">
              <DialogTrigger>Leaderboard</DialogTrigger>
            </Button>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Highest Scores</DialogTitle>
                <LeaderboardTable />
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <ModeToggle />
      </div>
      <div>{children}</div>
      <Toaster
        position="bottom-center"
        expand={false}
        visibleToasts={1}
        richColors
        duration={1000}
      />
    </div>
  );
}
