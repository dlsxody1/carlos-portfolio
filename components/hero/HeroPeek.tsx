import Image from 'next/image'
import type { Project } from '@/content/resume'

/**
 * "작업 보기" 버튼 대신, 아래 섹션의 실제 화면들이 히어로 바닥에서 기울어진 채 삐져나온다.
 * 전체가 #work 로 가는 링크. 호버하면 화면들이 펼쳐지며 올라온다.
 */
export function HeroPeek({ projects, label }: { projects: Project[]; label: string }) {
  return (
    <a
      href="#work"
      aria-label={label}
      className="group absolute inset-x-0 -bottom-24 mx-auto flex h-72 w-full max-w-5xl justify-center [perspective:1400px] outline-none sm:-bottom-16"
    >
      <span className="relative block h-full w-[min(88vw,46rem)] [transform-style:preserve-3d] [transform:rotateX(38deg)] transition-transform duration-700 ease-(--ease-out-expo) group-hover:[transform:rotateX(26deg)_translateY(-24px)] group-focus-visible:[transform:rotateX(26deg)_translateY(-24px)]">
        {projects.map((p, i) => {
          const offset = i - (projects.length - 1) / 2
          return (
            <span
              key={p.slug}
              className="peek-card absolute inset-x-0 top-0 block overflow-hidden rounded-xl border border-ink/10 bg-paper shadow-[0_30px_60px_-30px_oklch(24%_0.03_258/0.5)] transition-transform duration-700 ease-(--ease-out-expo)"
              style={{ '--x': `${offset * 38}%`, '--r': `${offset * 7}deg`, '--z': `${-Math.abs(offset) * 60}px`, zIndex: 10 - Math.abs(offset) } as React.CSSProperties}
            >
              <Image src={p.shot} alt="" width={1600} height={Math.round(1600 / p.aspect)} className="block w-full" priority={i === 1} />
            </span>
          )
        })}
      </span>
    </a>
  )
}
