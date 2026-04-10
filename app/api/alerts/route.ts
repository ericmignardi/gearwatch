import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { query, targetPrice, condition, sources } = await req.json();
  const alert = await prisma.priceAlert.create({
    data: {
      userId,
      query,
      targetPrice,
      condition,
      sources,
    },
  });

  return NextResponse.json(alert);
}
