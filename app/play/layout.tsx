import { ModeToggle } from "@/components/ModeToggle";
import { Analytics } from "@vercel/analytics/react";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";

import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex items-center flex-col justify-center pb-20">
      <div className="top-5 py-3 flex flex-row items-center justify-center md:fixed">
        <Button asChild variant="link">
          <Link href="/">&lt;&lt; Back</Link>
        </Button>
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
