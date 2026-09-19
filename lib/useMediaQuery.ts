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

/** id 로 찾은 요소가 뷰포트에 있는지. 화면 밖 셰이더를 멈추는 데 쓴다 */
export function useInView(id: string) {
  return useSyncExternalStore(
    (cb) => {
      const el = document.getElementById(id)
      if (!el) return () => {}
      const io = new IntersectionObserver(([e]) => {
        visible.set(id, e.isIntersecting)
        cb()
      })
      io.observe(el)
      return () => io.disconnect()
    },
    () => visible.get(id) ?? true,
    () => true,
  )
}
const visible = new Map<string, boolean>()
