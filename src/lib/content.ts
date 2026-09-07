import { get } from '@vercel/edge-config'
import { unstable_cache } from 'next/cache'

export interface ContentOverrides {
  headline?: string
  subheadline?: string
  cta?: string
  tagline?: string
}

const SITE_ID = 'roamplan'

const fetchContentOverrides = unstable_cache(
  async (): Promise<ContentOverrides> => {
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
      return data
    } catch {
      return {}
    }
  },
  [`content-overrides-${SITE_ID}`],
  { revalidate: 600 }
)

export async function getContentOverrides(): Promise<ContentOverrides> {
  return fetchContentOverrides()
}
