import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const listingId = searchParams.get('listingId');

  if (!listingId)
    return NextResponse.json({ error: 'Missing listingId' }, { status: 400 });

  const listing = await prisma.listing.findUnique({
    where: { id: listingId },
    include: { priceHistory: true },
  });

  if (!listing)
    return NextResponse.json({ error: 'Listing not found' }, { status: 404 });

  const prompt = `You are a guitar gear market analyst. Given the following data about a listing and recent sold prices for similar items, provide:
1. A buy/sell/wait recommendation with confidence (high/medium/low)
2. A 2-3 sentence rationale
3. A fair market price estimate
4. One trend observation (rising/falling/stable market)

Listing: ${listing.title}, ${listing.condition}, asking ${listing.price} on ${listing.source}
Recent comparable sales: ${JSON.stringify(listing.priceHistory)}
Respond only in JSON with keys: recommendation, confidence, rationale, fairMarketPrice, trend`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response.text();

    // Clean JSON response
    const cleanedResponse = response
      .replace(/^```json\n/, '')
      .replace(/\n```$/, '');

    return NextResponse.json(JSON.parse(cleanedResponse));
  } catch (error) {
    console.error('AI Insights API Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate insights' },
      { status: 500 }
    );
  }
}
