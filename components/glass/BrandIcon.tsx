import type { SimpleIcon } from 'simple-icons'

/** simple-icons 의 브랜드 로고를 currentColor 로 그린다 */
export function BrandIcon({ icon, className }: { icon: SimpleIcon; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d={icon.path} />
    </svg>
  )
}
