import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const snapshots = await prisma.priceSnapshot.findMany({
    where: { listingId: params.id },
    orderBy: { recordedAt: "asc" },
  });

  return NextResponse.json(snapshots);
}
