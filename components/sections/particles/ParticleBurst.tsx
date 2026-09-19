'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import { AdditiveBlending, BufferAttribute, BufferGeometry, Color } from 'three'
import type { Group, ShaderMaterial } from 'three'

/**
 * Originkit 'Glowing Particles' 를 참고한 R3F 버전.
 * 황금각 나선으로 뿌린 광선 위를 입자가 중심에서 바깥으로 흘러가며 식는다(hot → accent).
 * 원본과 다른 점: 섹션에 들어오는 순간 한 번 '터지고'(uBurst), 포인터 쪽으로 기울며, 화면 밖이면 멈춘다.
 * 블룸 멀티패스는 빼고, 입자 자체의 부드러운 falloff + 헤이즈로 광량을 낸다.
 */

const REACH = 2.7
const RAYS = 1400
const PER_RAY = 12

function buildCloud() {
  const count = RAYS * PER_RAY
  const dir = new Float32Array(count * 3)
  const offset = new Float32Array(count)
  const seed = new Float32Array(count)
  const golden = Math.PI * (3 - Math.sqrt(5))
  let i = 0
  for (let r = 0; r < RAYS; r++) {
    const y = 1 - (r / (RAYS - 1)) * 2
    const ring = Math.sqrt(1 - y * y)
    let dx = Math.cos(golden * r) * ring + (Math.random() - 0.5) * 0.1
    let dy = y + (Math.random() - 0.5) * 0.1
    let dz = Math.sin(golden * r) * ring + (Math.random() - 0.5) * 0.1
    const len = Math.hypot(dx, dy, dz) || 1
    dx /= len
    dy /= len
    dz /= len
    const life = 0.6 + Math.random() * 0.4
    const phase = Math.random()
    for (let p = 0; p < PER_RAY; p++, i++) {
      dir.set([dx, dy, dz], i * 3)
      offset[i] = phase + (p / PER_RAY) * 0.2
      seed[i] = life
    }
  }
  const g = new BufferGeometry()
  g.setAttribute('position', new BufferAttribute(dir, 3))
  g.setAttribute('aOffset', new BufferAttribute(offset, 1))
  g.setAttribute('aSeed', new BufferAttribute(seed, 1))
  return g
}

const vertex = /* glsl */ `
  attribute float aOffset;
  attribute float aSeed;
  uniform float uTime;
  uniform float uRadius;
  uniform float uSize;
  uniform float uBurst;
  uniform float uPixelRatio;
  varying float vLife;
  varying float vBright;

  void main() {
    float t = fract(aOffset + uTime * (0.65 + aSeed * 0.7));
    // 터지는 순간엔 모든 광선이 끝까지(rim) 뻗는다
    float life = mix(aSeed, 1.0, 0.55 + 0.45 * uBurst);
    float r = uRadius * life * (1.0 - pow(1.0 - t, 3.0)) * (1.0 + uBurst * 0.25);
    vec4 mv = modelViewMatrix * vec4(position * r, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * (1.0 - t * 0.45) * (1.0 + uBurst) * uPixelRatio * (10.0 / max(0.001, -mv.z));
    float flick = 0.5 + 0.5 * sin(uTime * 9.0 + aSeed * 43.0 + aOffset * 61.0);
    vBright = smoothstep(0.0, 0.05, t) * (1.0 - smoothstep(0.82, 1.0, t)) * flick;
    vLife = t;
  }
`

const fragment = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uHot;
  varying float vLife;
  varying float vBright;

  void main() {
    float d = length(gl_PointCoord - 0.5) * 2.0;
    if (d > 1.0) discard;
    float fall = 1.0 - d;
    float shape = pow(fall, 5.0) + pow(fall, 1.6) * 0.3;
    vec3 col = mix(uHot, uColor, smoothstep(0.0, 0.55, vLife));
    float a = shape * vBright;
    gl_FragColor = vec4(col * a, a);
    #include <colorspace_fragment>
  }
`

const hazeVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const hazeFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform float uHaze;
  varying vec2 vUv;
  void main() {
    float d = length(vUv - 0.5) * 2.0;
    if (d > 1.0) discard;
    float a = clamp(pow(1.0 - d, 1.5) * uHaze, 0.0, 1.0);
    gl_FragColor = vec4(uColor * a, a);
    #include <colorspace_fragment>
  }
`

function Burst({ active }: { active: boolean }) {
  const group = useRef<Group>(null!)
  const points = useRef<ShaderMaterial>(null!)
  const haze = useRef<ShaderMaterial>(null!)
  const geometry = useMemo(() => buildCloud(), [])
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uRadius: { value: REACH },
      uSize: { value: 5.5 },
      uBurst: { value: 1 },
      uPixelRatio: { value: 1 },
      uColor: { value: new Color('#f07a45') },
      uHot: { value: new Color('#fff4e8') },
    }),
    [],
  )
  const hazeUniforms = useMemo(() => ({ uColor: { value: new Color('#f07a45') }, uHaze: { value: 0.5 } }), [])

  // 섹션에 들어올 때마다 다시 터진다
  useEffect(() => {
    if (active) points.current.uniforms.uBurst.value = 1
  }, [active])

  useEffect(() => () => geometry.dispose(), [geometry])

  useFrame((state, dt) => {
    const u = points.current.uniforms
    u.uPixelRatio.value = state.gl.getPixelRatio()
    // 터짐은 빠르게 가라앉고, 그동안 시간도 빨리 흐른다
    easing.damp(u.uBurst, 'value', 0, 0.6, dt)
    u.uTime.value += dt * 0.35 * (1 + u.uBurst.value * 2.5)
    haze.current.uniforms.uHaze.value = 0.35 + u.uBurst.value * 0.5

    const g = group.current
    g.rotation.y += dt * 0.25
    // 포인터 쪽으로 살짝 기운다
    easing.dampE(g.rotation, [state.pointer.y * -0.35 + Math.sin(g.rotation.y * 0.6) * 0.3, g.rotation.y, state.pointer.x * 0.2], 0.4, dt)
  })

  return (
    <>
      <mesh scale={REACH * 2.6}>
        <planeGeometry />
        <shaderMaterial
          ref={haze}
          vertexShader={hazeVertex}
          fragmentShader={hazeFragment}
          uniforms={hazeUniforms}
          transparent
          premultipliedAlpha
          blending={AdditiveBlending}
          depthWrite={false}
          depthTest={false}
        />
      </mesh>
      <group ref={group}>
        <points geometry={geometry} frustumCulled={false}>
          <shaderMaterial
            ref={points}
            vertexShader={vertex}
            fragmentShader={fragment}
            uniforms={uniforms}
            transparent
            premultipliedAlpha
            blending={AdditiveBlending}
            depthWrite={false}
            depthTest={false}
          />
        </points>
      </group>
    </>
  )
}

export default function ParticleBurst() {
  const wrap = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [source, setSource] = useState<HTMLElement>()

  useEffect(() => {
    // 캔버스는 pointer-events 를 막지 않도록 footer 전체를 이벤트 소스로 쓴다
    setSource(wrap.current!.closest('footer') ?? undefined)
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.2 })
    io.observe(wrap.current!)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={wrap} aria-hidden className="h-full w-full">
      {source ? (
        <Canvas
          eventSource={source}
          eventPrefix="client"
          frameloop={visible ? 'always' : 'never'}
          dpr={[1, 1.75]}
          camera={{ position: [0, 0, 7.5], fov: 50 }}
          gl={{ alpha: true, antialias: false, premultipliedAlpha: true }}
        >
          <Burst active={visible} />
        </Canvas>
      ) : null}
    </div>
  )
}
