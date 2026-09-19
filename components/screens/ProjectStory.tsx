'use client'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useRef } from 'react'
import type { Locale, Project } from '@/content/resume'
import { RICH_MOTION, useMediaQuery } from '@/lib/useMediaQuery'

const ScreensScene = dynamic(() => import('./ScreensScene'), { ssr: false })

export function ProjectStory({ projects, lang }: { projects: Project[]; lang: Locale }) {
  const rich = useMediaQuery(RICH_MOTION)
  const sectionRef = useRef<HTMLDivElement>(null)

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
            <p className="mt-6 text-sm text-ink-soft">{p.stack.join(', ')}</p>
          </article>
        ))}
      </div>

      {rich && (
        <div className="sticky top-0 h-svh">
          <ScreensScene projects={projects} container={sectionRef} />
        </div>
      )}
    </div>
  )
}
