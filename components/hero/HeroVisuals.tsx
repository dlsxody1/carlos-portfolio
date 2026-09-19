'use client'
import dynamic from 'next/dynamic'
import { LiquidMetal } from '@paper-design/shaders-react'
import { RICH_MOTION, useMediaQuery } from '@/lib/useMediaQuery'

const Gradient = dynamic(() => import('./Gradient'), { ssr: false })

export function HeroVisuals() {
  const rich = useMediaQuery('(prefers-reduced-motion: no-preference)')
  return rich ? <Gradient /> : null
}

export function HeroLogo() {
  const rich = useMediaQuery(RICH_MOTION)
  if (!rich) return null
  return (
    <div aria-hidden className="justify-self-end animate-[rise_1.4s_0.2s_var(--ease-out-expo)_both]">
      <LiquidMetal
        image="/logo.svg"
        width={360}
        height={360}
        colorBack="#00000000"
        colorTint="#ffd9c2"
        shape="none"
        repetition={2}
        softness={0.1}
        shiftRed={0.3}
        shiftBlue={0.3}
        distortion={0.07}
        contour={0.4}
        angle={70}
        speed={0.6}
        scale={0.8}
      />
    </div>
  )
}
