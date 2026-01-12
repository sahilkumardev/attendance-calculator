import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

// Keys for Redis storage
const VISITOR_COUNT_KEY = 'visitor:count';
const UNIQUE_VISITORS_KEY = 'visitor:unique';

// In-memory fallback for development (when KV is not configured)
let fallbackVisitorCount = 0;
const fallbackUniqueVisitors = new Set<string>();

// Check if KV is configured
const isKVConfigured = () => {
  return !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
};

export async function GET() {
  try {
    let total: number;
    let unique: number;

    if (isKVConfigured()) {
      // Production: Use Redis/Vercel KV
      const [countResult, uniqueResult] = await Promise.all([
        kv.get<number>(VISITOR_COUNT_KEY),
        kv.scard(UNIQUE_VISITORS_KEY)
      ]);

      total = countResult ?? 0;
      unique = uniqueResult ?? 0;
    } else {
      // Development: Use in-memory fallback
      total = fallbackVisitorCount;
      unique = fallbackUniqueVisitors.size;
    }

    return NextResponse.json({
      total,
      unique,
      success: true
    });
  } catch (error) {
    console.error('Failed to fetch visitor count:', error);
    return NextResponse.json(
      { error: 'Failed to fetch visitor count', success: false },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { visitorId } = body;

    let total: number;
    let unique: number;

    if (isKVConfigured()) {
      // Production: Use Redis/Vercel KV
      // Increment total count
      total = await kv.incr(VISITOR_COUNT_KEY);

      // Track unique visitors if ID is provided
      if (visitorId) {
        await kv.sadd(UNIQUE_VISITORS_KEY, visitorId);
      }

      // Get unique count
      unique = await kv.scard(UNIQUE_VISITORS_KEY);
    } else {
      // Development: Use in-memory fallback
      fallbackVisitorCount++;
      total = fallbackVisitorCount;

      if (visitorId) {
        fallbackUniqueVisitors.add(visitorId);
      }

      unique = fallbackUniqueVisitors.size;
    }

    return NextResponse.json({
      total,
      unique,
      success: true
    });
  } catch (error) {
    console.error('Failed to update visitor count:', error);
    return NextResponse.json(
      { error: 'Failed to update visitor count', success: false },
      { status: 500 }
    );
  }
}
