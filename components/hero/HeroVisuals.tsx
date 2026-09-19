'use client'
import dynamic from 'next/dynamic'
import { RICH_MOTION, useInView, useMediaQuery } from '@/lib/useMediaQuery'

const Gradient = dynamic(() => import('./Gradient'), { ssr: false })
const LiquidLogo = dynamic(() => import('./LiquidLogo'), { ssr: false })

export function HeroVisuals() {
  const motionOk = useMediaQuery('(prefers-reduced-motion: no-preference)')
  const inView = useInView('top')
  // 히어로를 벗어나면 셰이더 캔버스를 내려 GPU 를 비운다
  return motionOk && inView ? <Gradient /> : null
}

export function HeroLogo() {
  const rich = useMediaQuery(RICH_MOTION)
  const inView = useInView('top')
  // 자리는 서버에서 잡아 두고(rich:block), 셰이더 번들은 필요한 환경에서만 받는다
  return (
    <div aria-hidden className="hidden size-[380px] justify-self-end rich:block">
      {rich ? <LiquidLogo playing={inView} /> : null}
    </div>
  )
}
