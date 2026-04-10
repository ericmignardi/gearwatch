import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';
import { auth } from '@clerk/nextjs/server';

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { query, filters } = await req.json();

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (!user)
    return NextResponse.json({ error: 'User not found' }, { status: 404 });

  const watchlist = await prisma.watchlist.create({
    data: {
      userId: user.id,
      query,
      filters,
    },
  });

  return NextResponse.json(watchlist);
}
