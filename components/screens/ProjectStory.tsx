import Image from 'next/image'
import type { Locale, Project } from '@/content/resume'
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import { StoryScene } from './StoryScene'
import { CodeBlock } from '@/components/code/CodeBlock'
import { Drop } from '@/components/code/Drop'
import { CodeSlider } from '@/components/code/CodeSlider'

export function ProjectStory({
  projects,
  lang,
  visitLabel,
  codeLabels,
}: {
  projects: Project[]
  lang: Locale
  visitLabel: string
  codeLabels: { open: string; prev: string; next: string }
}) {
  // 3D 씬에는 텍스트 없이 캡쳐 정보만 넘긴다 (RSC 직렬화 최소화)
  const shots = projects.map(({ slug, shot, aspect }) => ({ slug, shot, aspect }))

  return (
    <div id="story" className="relative mx-auto max-w-7xl px-5 sm:px-10 rich:grid rich:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] rich:gap-10">
      <div>
        {projects.map((p) => (
          <article key={p.slug} data-block className="flex min-h-svh flex-col justify-center py-16">
            <p className="text-sm text-ink-soft">
              {typeof p.company === 'string' ? p.company : p.company[lang]}, {p.period}
            </p>
            <h3 className="mt-2 font-display text-4xl font-semibold tracking-[-0.03em]">{p.name}</h3>
            <p className="mt-1 text-lg text-accent">{p.kind[lang]}</p>

            {/* 3D 가 없는 환경(모바일·모션 축소)에서만 보이는 2D 캡쳐 */}
            <Image
              src={p.shot}
              alt={`${p.name}, ${p.kind[lang]}`}
              width={1600}
              height={Math.round(1600 / p.aspect)}
              className="mt-8 w-full rounded-xl border border-line shadow-[0_24px_60px_-30px_oklch(24%_0.03_258/0.45)] rich:hidden"
            />

            <dl className="mt-8 space-y-6">
              {p.points.map((pt) => (
                <div key={pt.title.en} className="border-t border-line pt-4">
                  <dt className="font-semibold">{pt.title[lang]}</dt>
                  <dd className="mt-1.5 leading-relaxed text-ink-soft">{pt.body[lang]}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-sm text-ink-soft">{p.stack.join(', ')}</p>

            {/* 훑는 흐름을 끊지 않게 기본은 접어 두고, 열면 이 프로젝트의 코드를 슬라이드로 넘긴다 */}
            {p.snippets?.length ? (
              <div className="mt-6">
                <Drop label={codeLabels.open}>
                  <CodeSlider
                    prevLabel={codeLabels.prev}
                    nextLabel={codeLabels.next}
                    slides={p.snippets.map((snippet) => (
                      <CodeBlock key={snippet.label.en} snippet={snippet} locale={lang} />
                    ))}
                  />
                </Drop>
              </div>
            ) : null}
            {p.url ? (
              <a
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex w-fit items-center gap-1.5 rounded-full border border-ink/15 px-4 py-2 text-sm font-medium transition-colors hover:border-ink hover:bg-ink hover:text-paper"
              >
                {visitLabel}
                <ArrowUpRight size={14} weight="bold" aria-hidden />
              </a>
            ) : null}
          </article>
        ))}
      </div>

      <div className="sticky top-0 hidden h-svh rich:block">
        <StoryScene shots={shots} />
      </div>
    </div>
  )
}
