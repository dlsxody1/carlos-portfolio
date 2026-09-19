'use client'
import { useSyncExternalStore } from 'react'

export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (cb) => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', cb)
      return () => mql.removeEventListener('change', cb)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}

/** 3D·셰이더를 돌려도 되는 환경: 넓은 화면 + 모션 허용 */
export const RICH_MOTION = '(min-width: 1024px) and (prefers-reduced-motion: no-preference)'
