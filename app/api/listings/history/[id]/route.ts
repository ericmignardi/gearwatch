import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const snapshots = await prisma.priceSnapshot.findMany({
    where: { listingId: id },
    orderBy: { recordedAt: "asc" },
  });

  return NextResponse.json(snapshots);
}
