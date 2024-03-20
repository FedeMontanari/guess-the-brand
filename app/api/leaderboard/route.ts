import { prisma } from "@/lib/prisma";
import { Leaderboard } from "@/types/GameTypes";

export async function GET() {
  const entries = await prisma.highScore.findMany();

  return Response.json(entries.sort((a, b) => b.score - a.score));
}

export async function POST(req: Request) {
  const data: Leaderboard = await req.json();
  try {
    const newEntry = await prisma.highScore.create({
      data,
    });
    return Response.json(
      { message: "Entry created", newEntry },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      { error },
      {
        status: 500,
      }
    );
  }
}
