import SimpleIcon from "@/components/SimpleIcon";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-secondary">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl pb-24">
        Guess the brand name!
      </h1>
      <div className="flex flex-row flex-wrap gap-3 items-center justify-center">
        <SimpleIcon />
      </div>
    </main>
  );
}
