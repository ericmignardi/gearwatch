import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { Condition, Source } from "@prisma/client";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";
  const source = searchParams.get("source")?.split(",");
  const condition = searchParams.get("condition");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const pageSize = 10;

  const where: any = {
    title: { contains: q, mode: "insensitive" },
  };
  
  if (source) where.source = { in: source as Source[] };
  if (condition) where.condition = condition as Condition;
  if (minPrice) where.price = { gte: parseFloat(minPrice) };
  if (maxPrice) {
    where.price = { ...where.price, lte: parseFloat(maxPrice) };
  }

  const listings = await prisma.listing.findMany({
    where,
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: { listedAt: "desc" },
  });

  return NextResponse.json(listings);
}
