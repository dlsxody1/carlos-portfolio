'use client'
import type { RefObject } from 'react'
import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Image as DreiImage, RoundedBox } from '@react-three/drei'
import { easing } from 'maath'
import type { Group } from 'three'

export type Shot = { slug: string; shot: string; aspect: number }

const WIDTH = 3.1 // 가로 기준 패널 폭(월드 단위)

function Panel({ project, index, progressRef }: { project: Shot; index: number; progressRef: RefObject<number> }) {
  const ref = useRef<Group>(null!)
  const w = project.aspect >= 1 ? WIDTH : WIDTH * 0.62
  const h = w / project.aspect

  useFrame((_, dt) => {
    // d = 0 이면 정면. 다음 화면은 아래·뒤에서 기울어진 채 올라오고, 지난 화면은 위·뒤로 빠진다
    const d = index - progressRef.current
    const ad = Math.abs(d)
    easing.damp3(ref.current.position, [d * 0.6, -d * 3.1, -ad * 3], 0.25, dt)
    easing.dampE(ref.current.rotation, [0.45 * Math.max(-1, Math.min(1, d)), -0.3 * d, 0.04 * d], 0.25, dt)
    const s = 1 - Math.min(ad, 2) * 0.08
    easing.damp3(ref.current.scale, [s, s, s], 0.25, dt)
  })

  return (
    <group ref={ref}>
      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.25}>
        <RoundedBox args={[w + 0.12, h + 0.12, 0.08]} radius={0.06} smoothness={4} position-z={-0.05}>
          <meshStandardMaterial color="#1d2433" roughness={0.35} metalness={0.4} />
        </RoundedBox>
        <DreiImage url={project.shot} scale={[w, h]} radius={0.04} toneMapped={false} />
      </Float>
    </group>
  )
}

/**
 * 스크롤 진행도를 scroll 리스너 대신 렌더 루프에서 읽는다.
 * 화면 중앙이 몇 번째 [data-block] 의 어디쯤인지 → 0 … n-1 연속값 (React state 아님 → 리렌더 없음)
 */
function ScrollProgress({ progressRef }: { progressRef: RefObject<number> }) {
  const blocksRef = useRef<NodeListOf<HTMLElement> | null>(null)
  useFrame(() => {
    blocksRef.current ??= document.querySelectorAll<HTMLElement>('#story [data-block]')
    const blocks = blocksRef.current
    if (!blocks.length) return
    const mid = window.innerHeight / 2
    let p = 0
    blocks.forEach((el, i) => {
      const r = el.getBoundingClientRect()
      if (r.top <= mid) p = i + Math.min(1, (mid - r.top) / r.height) - 0.5
    })
    progressRef.current = Math.max(0, Math.min(blocks.length - 1, p))
  }, -1)
  return null
}

export default function ScreensScene({ shots }: { shots: Shot[] }) {
  const wrap = useRef<HTMLDivElement>(null)
  const progress = useRef(0)
  const [visible, setVisible] = useState(false)

  // 화면 밖이면 렌더 루프 정지
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting))
    io.observe(wrap.current!)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={wrap} className="h-full w-full" aria-hidden>
      <Canvas
        frameloop={visible ? 'always' : 'never'}
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 6.2], fov: 38 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={1.4} />
        <directionalLight position={[3, 4, 5]} intensity={2} />
        <ScrollProgress progressRef={progress} />
        <Suspense fallback={null}>
          {shots.map((p, i) => (
            <Panel key={p.slug} project={p} index={i} progressRef={progress} />
          ))}
        </Suspense>
      </Canvas>
    </div>
  )
}
