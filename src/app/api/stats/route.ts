import { NextResponse } from 'next/server'

// No real analytics source is wired; return zeros rather than call an insecure http:// tracker.
export const runtime = 'edge'

export async function GET() {
  return NextResponse.json({ visitors: 0, pageviews: 0 })
}
