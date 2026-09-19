'use client'
import dynamic from 'next/dynamic'
import { LiquidMetal } from '@paper-design/shaders-react'
import { RICH_MOTION, useInView, useMediaQuery } from '@/lib/useMediaQuery'

const Gradient = dynamic(() => import('./Gradient'), { ssr: false })

export function HeroVisuals() {
  const rich = useMediaQuery('(prefers-reduced-motion: no-preference)')
  const inView = useInView('top')
  // 히어로를 벗어나면 셰이더 캔버스를 내려 GPU 를 비운다
  return rich && inView ? <Gradient /> : null
}

export function HeroLogo() {
  const rich = useMediaQuery(RICH_MOTION)
  const inView = useInView('top')
  if (!rich) return null
  return (
    <div aria-hidden className="justify-self-end animate-[rise_1.4s_0.2s_var(--ease-out-expo)_both]">
      <LiquidMetal
        image="/logo.svg"
        width={380}
        height={380}
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
        speed={inView ? 0.6 : 0}
        scale={0.8}
      />
    </div>
  )
}
