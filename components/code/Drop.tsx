import type { ReactNode } from 'react'
import { CaretDown } from '@phosphor-icons/react/dist/ssr'

/**
 * 네이티브 details. 클라이언트 JS 0줄이고 키보드·브라우저 내 찾기가 공짜다.
 * 여는 애니메이션은 app/globals.css 의 .drop (::details-content) 가 맡는다.
 */
export function Drop({ label, children }: { label: string; children: ReactNode }) {
  return (
    <details className="drop group">
      <summary className="inline-flex w-fit items-center gap-1.5 rounded-full border border-line px-3.5 py-1.5 text-sm text-ink-soft transition-colors hover:border-ink hover:text-ink">
        {label}
        <CaretDown size={12} weight="bold" aria-hidden className="transition-transform duration-300 group-open:rotate-180" />
      </summary>
      <div className="pt-4">{children}</div>
    </details>
  )
}
