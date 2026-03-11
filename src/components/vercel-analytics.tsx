'use client'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'

export function VercelAnalytics() {
  return (
    <>
      <SpeedInsights />
      <Analytics />
    </>
  )
}
