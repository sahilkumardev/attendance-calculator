import { NextRequest, NextResponse } from 'next/server';

// In-memory storage (for demo purposes)
// In production, use a database like MongoDB, PostgreSQL, or Redis
let visitorCount = 0;
const uniqueVisitors = new Set<string>();

export async function GET() {
  try {
    return NextResponse.json({
      total: visitorCount,
      unique: uniqueVisitors.size,
      success: true
    });
  } catch {
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

    // Increment total count
    visitorCount++;

    // Track unique visitors if ID is provided
    if (visitorId) {
      uniqueVisitors.add(visitorId);
    }

    return NextResponse.json({
      total: visitorCount,
      unique: uniqueVisitors.size,
      success: true
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to update visitor count', success: false },
      { status: 500 }
    );
  }
}
