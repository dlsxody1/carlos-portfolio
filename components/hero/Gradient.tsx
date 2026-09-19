'use client'
import { ShaderGradient, ShaderGradientCanvas } from '@shadergradient/react'

// shadergradient 'halo' 프리셋을 오프화이트 톤에 맞게 조정
export default function Gradient() {
  return (
    <ShaderGradientCanvas
      className="!absolute inset-0 -z-10 animate-[fade_2s_ease-out_both]"
      pixelDensity={1}
      fov={45}
      pointerEvents="none"
      lazyLoad
    >
      <ShaderGradient
        control="props"
        type="plane"
        animate="on"
        uSpeed={0.25}
        uStrength={2.2}
        uDensity={1.2}
        uFrequency={5.5}
        uAmplitude={1}
        positionX={-1.4}
        rotationY={10}
        rotationZ={50}
        color1="#f5b08a"
        color2="#f4e9dc"
        color3="#dcd4ea"
        brightness={1.15}
        reflection={0.1}
        lightType="3d"
        grain="off"
        cAzimuthAngle={180}
        cPolarAngle={90}
        cDistance={3.6}
        cameraZoom={1}
      />
    </ShaderGradientCanvas>
  )
}
