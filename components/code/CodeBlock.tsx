import type { Locale, Snippet } from '@/content/resume'
import { highlight } from '@/lib/highlighter'

/**
 * 서버 컴포넌트. 하이라이팅은 빌드 때 끝나고 클라이언트로는 HTML 만 간다.
 * 사이트의 코드 블록 스타일은 여기 하나뿐이다 — 밝게/어둡게를 뒤집을 일이 있으면 이 파일만 고친다.
 */
export async function CodeBlock({ snippet, locale }: { snippet: Snippet; locale: Locale }) {
  const html = await highlight(snippet.code, snippet.lang)

  return (
    <figure className="overflow-hidden rounded-xl border border-line bg-paper-deep/40">
      <figcaption className="border-b border-line px-4 py-2.5 text-[0.8rem] leading-snug text-ink-soft">
        {snippet.label[locale]}
      </figcaption>
      {/* 좁은 단에 들어가므로 가로 스크롤 대신 접는다 — 숨겨진 줄이 생기면 안 읽힌다 */}
      <div
        className="p-4 font-mono text-[0.76rem] leading-[1.8] [&_pre]:bg-transparent! [&_pre]:break-words [&_pre]:whitespace-pre-wrap"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </figure>
  )
}
