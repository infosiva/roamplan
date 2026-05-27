import { NextResponse } from 'next/server'

export const runtime = 'edge'
export const revalidate = 3600

export async function GET() {
  try {
    const res = await fetch('http://31.97.56.148:3099/api/stats?site=roamplan.app', {
      next: { revalidate: 3600 },
    })
    if (!res.ok) return NextResponse.json({ visitors: 0, pageviews: 0 })
    return NextResponse.json(await res.json())
  } catch {
    return NextResponse.json({ visitors: 0, pageviews: 0 })
  }
}
