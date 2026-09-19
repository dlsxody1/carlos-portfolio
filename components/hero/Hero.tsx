import type { Locale } from '@/content/resume'
import { profile, ui } from '@/content/resume'
import { HeroVisuals, HeroLogo } from './HeroVisuals'

export function Hero({ lang }: { lang: Locale }) {
  return (
    <section className="relative isolate flex min-h-svh flex-col overflow-hidden">
      {/* 셰이더가 뜨기 전·모션 축소 시 보이는 정적 배경 */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_85%_20%,oklch(80%_0.12_45)_0%,transparent_55%),radial-gradient(ellipse_at_10%_90%,oklch(88%_0.05_300)_0%,transparent_50%)]"
      />
      <HeroVisuals />
      {/* 본문 대비 확보용 왼쪽 베일 + 셰이더 아래 경계를 종이색으로 녹인다 */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-r from-paper/70 via-paper/25 to-transparent" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-linear-to-b from-transparent to-paper" />

      <div className="mx-auto grid w-full max-w-7xl flex-1 items-end gap-10 px-5 pt-32 pb-16 sm:px-10 lg:grid-cols-[1.8fr_1fr] lg:items-center lg:pb-24">
        <div className="animate-[rise_1.1s_var(--ease-out-expo)_both]">
          <p className="mb-6 text-sm font-medium tracking-wide text-ink-soft">
            {profile.name[lang]} · {profile.role[lang]}
          </p>
          <h1 className="font-display text-[clamp(2.6rem,6.2vw,5.6rem)] leading-[1.02] font-semibold tracking-[-0.035em] whitespace-pre-line">
            {profile.headline[lang]}
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-soft">{profile.summary[lang]}</p>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href="#work"
              className="rounded-full bg-ink px-6 py-3 font-medium text-paper transition-transform duration-300 ease-(--ease-out-expo) hover:-translate-y-0.5"
            >
              {ui.heroCta[lang]} ↓
            </a>
            <a href={`mailto:${profile.email}`} className="font-medium underline decoration-line underline-offset-4 hover:decoration-ink">
              {profile.email}
            </a>
          </div>
        </div>
        <HeroLogo />
      </div>
    </section>
  )
}
