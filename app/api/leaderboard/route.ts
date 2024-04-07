import { prisma } from "@/lib/prisma";
import { Leaderboard } from "@/types/GameTypes";
import { NextApiRequest } from "next";

export async function GET(req: NextApiRequest) {
  const { searchParams } = new URL(req.url || "");
  const uuid = searchParams.get("uuid");

  if (uuid) {
    const entry = await prisma.highScore.findMany({
      where: {
        uuid: {
          equals: uuid,
        },
      },
    });
    return Response.json(entry.sort((a, b) => b.score - a.score));
  }

  const entries = await prisma.highScore.findMany();
  return Response.json(entries.sort((a, b) => b.score - a.score));
}

export async function POST(req: Request) {
  const data: Leaderboard = await req.json();
  try {
    const entry = await prisma.highScore.findFirst({
      where: {
        uuid: data.uuid,
        mode: data.mode,
        variant: data.variant,
      },
    });

    if (!entry) {
      const newEntry = await prisma.highScore.create({
        data,
      });
      return Response.json(
        { message: "Entry created", newEntry },
        {
          status: 201,
        }
      );
    }

    const editedEntry = await prisma.highScore.update({
      where: {
        uuid: data.uuid,
      },
      data: data,
    });

    return Response.json(
      {
        message: "Entry edited correctly",
        editedEntry,
      },
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
