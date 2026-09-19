import type { Locale } from '@/content/resume'
import { profile, ui } from '@/content/resume'
import { EnvelopeSimple } from '@phosphor-icons/react/dist/ssr'
import { siGithub, siVelog } from 'simple-icons'
import { BrandIcon } from '@/components/glass/BrandIcon'
import { GlassLink } from '@/components/glass/GlassLink'

export function Contact({ lang }: { lang: Locale }) {
  return (
    <footer
      id="contact"
      className="relative overflow-hidden text-paper"
      // liquid-glass 가 html2canvas 스냅샷을 굴절시키는데, 스냅샷이 oklch 그라디언트를 못 그려서 여기만 rgb
      style={{
        background:
          'radial-gradient(ellipse at 80% 110%, #d7663a 0%, transparent 60%), radial-gradient(ellipse at 0% 0%, #4f3b6b 0%, transparent 55%), #1a2230',
      }}
    >
      <div className="mx-auto max-w-7xl px-5 pt-32 pb-12 sm:px-10 sm:pt-44">
        <h2 className="font-display text-[clamp(2.4rem,6vw,5rem)] leading-[1.05] font-semibold tracking-[-0.035em] whitespace-pre-line">
          {ui.contactTitle[lang]}
        </h2>
        <div className="mt-12 flex flex-wrap gap-4">
          <GlassLink href={`mailto:${profile.email}`} label={profile.email} icon={<EnvelopeSimple size={20} weight="bold" aria-hidden />} />
          <GlassLink href={profile.github} label="GitHub" icon={<BrandIcon icon={siGithub} className="size-5" />} />
          <GlassLink href={profile.velog} label="velog" icon={<BrandIcon icon={siVelog} className="size-5" />} />
        </div>
        <p className="mt-32 text-sm text-paper/60">© 2026 {profile.name[lang]}</p>
      </div>
    </footer>
  )
}
