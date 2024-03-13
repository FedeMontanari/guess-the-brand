import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex items-center flex-col justify-center">
      <div className="top-5 py-3 flex flex-row items-center justify-center md:fixed">
        <Button asChild variant="link">
          <Link href="/">&lt;&lt; Back</Link>
        </Button>
        <ModeToggle />
      </div>
      <div>{children}</div>
    </div>
  );
}
