import Link from 'next/link'
import type { Locale } from '@/content/resume'
import { profile, ui } from '@/content/resume'

export function Nav({ lang }: { lang: Locale }) {
  const links = [
    ['#work', ui.nav.work],
    ['#ai', ui.nav.ai],
    ['#stack', ui.nav.stack],
    ['#contact', ui.nav.contact],
  ] as const
  const other: Locale = lang === 'ko' ? 'en' : 'ko'
  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <nav className="glass mx-auto flex max-w-3xl items-center gap-1 rounded-full py-1.5 pr-1.5 pl-5 text-sm">
        <a href="#top" className="mr-auto font-display font-semibold tracking-tight">
          {profile.name[lang]}
        </a>
        {links.map(([href, label]) => (
          <a
            key={href}
            href={href}
            className="hidden rounded-full px-3 py-1.5 text-ink-soft transition-colors hover:text-ink sm:block"
          >
            {label[lang]}
          </a>
        ))}
        <Link
          href={`/${other}`}
          hrefLang={other}
          className="rounded-full bg-ink px-3.5 py-1.5 font-medium text-paper transition-opacity hover:opacity-85"
        >
          {other.toUpperCase()}
        </Link>
      </nav>
    </header>
  )
}
