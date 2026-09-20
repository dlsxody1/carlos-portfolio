import 'server-only'
import { createHighlighterCore } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'

export const codeLangs = ['ts', 'tsx', 'json', 'bash'] as const
export type CodeLang = (typeof codeLangs)[number]

/**
 * 페이지가 전부 정적 생성이라 이 하이라이터는 빌드 때만 돈다 (클라이언트 번들 0 바이트).
 * React 의 cache() 는 요청 단위라 빌드 중 페이지마다 하이라이터를 새로 만든다 → 모듈 스코프에 promise 를 캐시한다.
 * 정규식 엔진은 WASM 대신 JS 쪽을 쓴다. 빌드 때 한 번 도는 코드라 속도 손해가 없고 WASM 로딩 변수를 없앤다.
 */
let ready: ReturnType<typeof createHighlighterCore> | undefined

const init = () =>
  createHighlighterCore({
    themes: [import('shiki/themes/min-light.mjs')],
    langs: [
      import('shiki/langs/ts.mjs'),
      import('shiki/langs/tsx.mjs'),
      import('shiki/langs/json.mjs'),
      import('shiki/langs/bash.mjs'),
    ],
    engine: createJavaScriptRegexEngine(),
  })

/** 넘기는 코드는 레포 안 상수여야 한다 — 결과가 dangerouslySetInnerHTML 로 들어간다 */
export async function highlight(code: string, lang: CodeLang) {
  ready ??= init()
  const shiki = await ready
  return shiki.codeToHtml(code, {
    lang,
    theme: 'min-light',
    // 테마의 흰 배경과 회색 본문색을 사이트 토큰으로 바꾼다
    colorReplacements: { '#ffffff': 'transparent', '#24292eff': 'var(--color-ink)' },
  })
}
