'use client'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import type { Locale, Project } from '@/content/resume'
import { RICH_MOTION, useMediaQuery } from '@/lib/useMediaQuery'

const ScreensScene = dynamic(() => import('./ScreensScene'), { ssr: false })

export function ProjectStory({ projects, lang }: { projects: Project[]; lang: Locale }) {
  const rich = useMediaQuery(RICH_MOTION)
  const sectionRef = useRef<HTMLDivElement>(null)
  // 0 … projects.length-1 연속값. React state 가 아니라 ref → 스크롤 중 리렌더 없음
  const progress = useRef(0)

  useEffect(() => {
    if (!rich) return
    const blocks = [...sectionRef.current!.querySelectorAll<HTMLElement>('[data-block]')]
    const update = () => {
      const mid = window.innerHeight / 2
      // 화면 중앙이 몇 번째 블록의 어디쯤에 있는지 → 연속 인덱스
      let p = 0
      blocks.forEach((el, i) => {
        const r = el.getBoundingClientRect()
        if (r.top <= mid) p = i + Math.min(1, (mid - r.top) / r.height) - 0.5
      })
      progress.current = Math.max(0, Math.min(blocks.length - 1, p))
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [rich])

  return (
    <div ref={sectionRef} className="relative mx-auto max-w-7xl px-5 sm:px-10 lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10">
      <div>
        {projects.map((p) => (
          <article key={p.slug} data-block className="flex min-h-svh flex-col justify-center py-16">
            <p className="text-sm text-ink-soft">
              {p.company} · {p.period}
            </p>
            <h3 className="mt-2 font-display text-4xl font-semibold tracking-[-0.03em]">{p.name}</h3>
            <p className="mt-1 text-lg text-accent">{p.kind[lang]}</p>

            {!rich && (
              <Image
                src={p.shot}
                alt={`${p.name} ${p.kind[lang]}`}
                width={1600}
                height={Math.round(1600 / p.aspect)}
                className="mt-8 w-full rounded-xl border border-line shadow-[0_24px_60px_-30px_oklch(24%_0.03_258/0.45)]"
              />
            )}

            <dl className="mt-8 space-y-6">
              {p.points.map((pt) => (
                <div key={pt.title.en} className="border-t border-line pt-4">
                  <dt className="font-semibold">{pt.title[lang]}</dt>
                  <dd className="mt-1.5 leading-relaxed text-ink-soft">{pt.body[lang]}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-sm text-ink-soft">{p.stack.join(' · ')}</p>
          </article>
        ))}
      </div>

      {rich && (
        <div className="sticky top-0 h-svh">
          <ScreensScene projects={projects} progress={progress} />
        </div>
      )}
    </div>
  )
}
