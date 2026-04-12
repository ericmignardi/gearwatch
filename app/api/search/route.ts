import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { Prisma, Source, Condition } from "@prisma/client";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";
  const source = searchParams.get("source")?.split(",") as Source[] | undefined;
  const condition = searchParams.get("condition") as Condition | undefined;
  const minPrice = searchParams.get("minPrice") ? parseFloat(searchParams.get("minPrice")!) : undefined;
  const maxPrice = searchParams.get("maxPrice") ? parseFloat(searchParams.get("maxPrice")!) : undefined;
  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const pageSize = 10;

  const where: Prisma.ListingWhereInput = {
    title: { contains: q, mode: "insensitive" },
  };
  
  if (source) where.source = { in: source };
  if (condition) where.condition = condition;
  if (minPrice !== undefined || maxPrice !== undefined) {
    where.price = {
      gte: minPrice,
      lte: maxPrice,
    };
  }

  const listings = await prisma.listing.findMany({
    where,
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: { listedAt: "desc" },
  });

  return NextResponse.json(listings);
}
