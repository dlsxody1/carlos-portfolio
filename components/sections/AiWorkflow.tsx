import type { Locale } from '@/content/resume'
import { aiWorkflow } from '@/content/resume'
import { CodeBlock } from '@/components/code/CodeBlock'

export function AiWorkflow({ lang }: { lang: Locale }) {
  const { labels } = aiWorkflow
  return (
    <section id="ai" className="scroll-mt-24 bg-paper-deep py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <h2 className="max-w-3xl font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-tight font-semibold tracking-[-0.03em] whitespace-pre-line">
          {aiWorkflow.title[lang]}
        </h2>
        <p className="mt-5 max-w-xl text-lg text-ink-soft">{aiWorkflow.lede[lang]}</p>

        <div className="mt-20 space-y-24">
          {aiWorkflow.cases.map((c) => (
            <article key={c.id} className="grid grid-cols-1 gap-8 border-t border-ink/15 pt-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
              <h3 className="font-display text-[clamp(1.5rem,2.4vw,2rem)] leading-snug font-semibold tracking-tight lg:sticky lg:top-28 lg:self-start">
                {c.title[lang]}
              </h3>

              <div className="max-w-[44rem] space-y-8">
                {(['problem', 'approach', 'tradeoff'] as const).map((k) => (
                  <div key={k}>
                    <p className="text-sm font-semibold text-accent">{labels[k][lang]}</p>
                    <p className="mt-2 text-[1.05rem] leading-[1.8]">{c[k][lang]}</p>
                  </div>
                ))}

                {'rules' in c && c.rules && (
                  <div>
                    <p className="text-sm font-semibold text-accent">{labels.rules[lang]}</p>
                    <ul className="mt-3 grid gap-px overflow-hidden rounded-xl border border-ink/10 bg-ink/10 sm:grid-cols-2">
                      {c.rules.map((r) => (
                        <li key={r.en} className="bg-paper px-4 py-3.5 text-[0.95rem] leading-snug last:sm:col-span-2">
                          {r[lang]}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {'snippet' in c && c.snippet && <CodeBlock snippet={c.snippet} locale={lang} />}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
