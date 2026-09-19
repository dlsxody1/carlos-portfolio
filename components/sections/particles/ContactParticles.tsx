'use client'
import dynamic from 'next/dynamic'
import { RICH_MOTION, useMediaQuery } from '@/lib/useMediaQuery'

const ParticleBurst = dynamic(() => import('./ParticleBurst'), { ssr: false })

export function ContactParticles() {
  return useMediaQuery(RICH_MOTION) ? <ParticleBurst /> : null
}
