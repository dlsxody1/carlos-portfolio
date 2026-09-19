import Image from 'next/image'
import type { Project } from '@/content/resume'

/**
 * "작업 보기" 버튼 대신, 아래 섹션의 실제 화면들이 히어로 바닥에서 누운 채 삐져나와 있다.
 * 스크롤하면 화면들이 일어서며 부채꼴로 펼쳐진다 (CSS scroll-driven animation, JS 없음).
 * 문서 흐름 안에 높이(clamp)를 잡아 두어 화면 높이가 낮아도 항상 보인다.
 */
export function HeroPeek({ projects, label }: { projects: Project[]; label: string }) {
  return (
    <a
      href="#work"
      aria-label={label}
      className="peek group relative mx-auto block h-[clamp(9rem,30svh,17rem)] w-full max-w-5xl shrink-0 outline-none [perspective:1400px]"
    >
      <span className="peek-stack absolute top-4 left-1/2 block aspect-[16/10] w-[min(86vw,44rem)] -translate-x-1/2 [transform-style:preserve-3d]">
        {projects.map((p, i) => {
          const offset = i - (projects.length - 1) / 2
          return (
            <span
              key={p.slug}
              className="peek-card absolute inset-0 block overflow-hidden rounded-xl border border-ink/10 bg-paper shadow-[0_30px_60px_-30px_oklch(24%_0.03_258/0.5)]"
              style={{ '--x': `${offset * 40}%`, '--r': `${offset * 7}deg`, '--z': `${-Math.abs(offset) * 70}px`, zIndex: 10 - Math.abs(offset) } as React.CSSProperties}
            >
              <Image src={p.shot} alt="" fill sizes="44rem" className="object-cover object-top" priority={i === 1} />
            </span>
          )
        })}
      </span>
    </a>
  )
}
