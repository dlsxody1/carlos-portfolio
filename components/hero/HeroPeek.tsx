import Image from 'next/image'
import type { Project } from '@/content/resume'

/**
 * "작업 보기" 버튼 대신, 아래 섹션의 실제 화면들이 히어로 바닥에서 누운 채 삐져나와 있다.
 * 스크롤하면 화면들이 일어서며 부채꼴로 펼쳐진다 (CSS scroll-driven animation, JS 없음).
 * 다 일어선 뒤의 크기(카드 높이 0.625w + 부채꼴로 기운 옆 카드가 처지는 만큼)를 문서 흐름 안에 잡아 두어
 * 아래 섹션과 겹치지 않는다. 위치는 히어로 본문 바로 아래라 짧은 화면에서도 첫 화면에 걸친다.
 */
export function HeroPeek({ projects, label }: { projects: Project[]; label: string }) {
  return (
    <a
      href="#work"
      aria-label={label}
      className="peek group relative mx-auto block h-[calc(min(86vw,44rem)*0.72+2rem)] w-full max-w-5xl shrink-0 outline-none [perspective:1400px]"
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
