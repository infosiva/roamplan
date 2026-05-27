import { get } from '@vercel/edge-config'

export interface ContentOverrides {
  headline?: string
  subheadline?: string
  cta?: string
  tagline?: string
}

const SITE_ID = 'roamplan'
const TTL = 60_000

let _cache: { data: ContentOverrides; ts: number } | null = null

export async function getContentOverrides(): Promise<ContentOverrides> {
  if (_cache && Date.now() - _cache.ts < TTL) return _cache.data
  try {
    const [headline, subheadline, cta, tagline] = await Promise.all([
      get(`content_${SITE_ID}_headline`),
      get(`content_${SITE_ID}_subheadline`),
      get(`content_${SITE_ID}_cta`),
      get(`content_${SITE_ID}_tagline`),
    ])
    const data: ContentOverrides = {}
    if (typeof headline === 'string') data.headline = headline
    if (typeof subheadline === 'string') data.subheadline = subheadline
    if (typeof cta === 'string') data.cta = cta
    if (typeof tagline === 'string') data.tagline = tagline
    _cache = { data, ts: Date.now() }
    return data
  } catch {
    return {}
  }
}
