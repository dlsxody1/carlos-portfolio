'use client'
import { LiquidMetal } from '@paper-design/shaders-react'

export default function LiquidLogo({ playing }: { playing: boolean }) {
  return (
    <LiquidMetal
      className="animate-[rise_1.4s_0.2s_var(--ease-out-expo)_both]"
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
      speed={playing ? 0.6 : 0}
      scale={0.8}
    />
  )
}
