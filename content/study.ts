import type { Locale } from './resume'

type L = Record<Locale, string>

const REPO = 'https://github.com/after-study/Study'
/**
 * 지금은 어디에도 렌더하지 않는다 — 레포에 책 지면을 촬영한 이미지가 섞여 있어
 * (복제권) 정리되기 전까지 포트폴리오에서 트래픽을 보내지 않는다.
 * 정리되면 page.tsx 에서 이 href 들을 다시 링크로 쓰면 된다.
 */
const notes = (dir: string) => `${REPO}/tree/main/${encodeURIComponent(dir)}`

export type Book = {
  slug: string
  title: L
  /** 스터디에서 이 책을 다룬 기간 (레포 커밋 기준) */
  period: string
  /** 본인이 쓴 정리 노트 수 */
  notes: number
  href: string
  /** 이 책이 실제 작업의 무엇을 바꿨는지. 읽었다는 말은 쓰지 않는다 */
  changed: L
  /** 직접 정리한 장 가운데 몇 개. 파일명 그대로가 아니라 읽히는 제목으로 */
  chapters: L[]
}

export const study = {
  title: { ko: '읽고 정리한 것', en: 'What I read, and what changed' } satisfies L,
  lede: {
    ko: '2025년 6월부터 동료 한 명과 매주 토요일 아침에 책을 읽고 정리합니다. 담당한 장을 발표하고 남은 시간은 토론에 씁니다. 여기 적은 건 읽은 목록이 아니라, 그 책이 이 사이트의 어느 작업을 바꿨는지입니다.',
    en: 'Since June 2025 a colleague and I have read a book together every Saturday morning: whoever owns the chapter presents it, then we argue about it. What follows is not a reading list but what each book changed in the work on this site.',
  } satisfies L,
  repo: REPO,
  meta: {
    ko: '2인 스터디 · 매주 토요일 오전 · 책 5권 · 본인 정리 노트 47건',
    en: 'Two people · every Saturday morning · 5 books · 47 notes of my own',
  } satisfies L,
  /** 한국어는 수를 뒤에 붙여야 읽힌다 ("6 정리 노트" 가 아니라 "정리 노트 6건") */
  noteCount: (n: number): L => ({ ko: `정리 노트 ${n}건`, en: `${n} notes` }),
  labels: {
    open: { ko: '정리한 내용 보기', en: 'See the notes' },
    back: { ko: '포트폴리오로', en: 'Back to the portfolio' },
  },
  books: [
    {
      slug: 'fp',
      title: { ko: '쏙쏙 들어오는 함수형 코딩', en: 'Grokking Simplicity' },
      period: '2025.06 - 2025.09',
      notes: 6,
      href: `${REPO}/tree/main/${encodeURIComponent('쏙쏙 들어오는 함수형 코딩')}`,
      changed: {
        ko: '액션과 계산을 갈라 놓는 습관이 여기서 왔습니다. 모퉁이의 추천 점수는 시간도 네트워크도 읽지 않는 순수 함수로 꺼내 뒀고, 그래서 "236건 중 30건만 채점되고 있었다"는 사실을 화면 없이 값으로 확인할 수 있었습니다.',
        en: 'The habit of separating actions from calculations came from here. motungi’s scorer is a pure function that reads neither the clock nor the network, which is how "only 30 of 236 were ever scored" could be established as a value, with no screen involved.',
      },
      chapters: [
        { ko: '액션·계산·데이터 구분하기', en: 'Actions, calculations, data' },
        { ko: '암묵적 입력과 출력 줄이기', en: 'Shrinking implicit inputs and outputs' },
        { ko: '일급 함수와 고차 함수', en: 'First-class and higher-order functions' },
        { ko: 'map · filter · reduce 와 체이닝', en: 'map, filter, reduce and chaining' },
      ],
    },
    {
      slug: 'algorithms',
      title: {
        ko: '자바스크립트로 하는 자료 구조와 알고리즘',
        en: 'Data Structures and Algorithms with JavaScript',
      },
      period: '2025.09 - 2026.01',
      notes: 10,
      href: notes('자바스크립트로 하는 자료 구조와 알고리즘 - 배세민') + '/intae',
      changed: {
        ko: '공연마다 API를 한 번씩 부르는 대신 공연장 이름으로 색인을 만들어 한 번에 맞추는 선택이 여기서 나왔습니다. 모퉁이 카탈로그가 520건에서 902건으로 늘어난 건 새 데이터가 아니라 조회 방식을 바꾼 결과입니다.',
        en: 'Indexing venues by name instead of calling the API once per show came from this book. motungi’s catalog going from 520 to 902 items was not new data — it was a different lookup.',
      },
      chapters: [
        { ko: '빅오 표기법과 재귀', en: 'Big-O and recursion' },
        { ko: '해시 테이블', en: 'Hash tables' },
        { ko: '트리와 순회', en: 'Trees and traversal' },
        { ko: '정렬과 검색', en: 'Sorting and searching' },
      ],
    },
    {
      slug: 'inside-react',
      title: { ko: '다시 깊게 익히는 인사이드 리액트', en: 'Inside React, revisited' },
      period: '2026.01 - 2026.06',
      notes: 11,
      href: notes('다시 깊게 익히는 인사이드 리액트') + '/intae',
      changed: {
        ko: '재조정과 메모이제이션 장을 정리하면서, 리렌더는 줄이는 게 아니라 범위를 정하는 문제라는 쪽으로 생각이 바뀌었습니다. VitalVET 입원 차트와 Office 지출품의서의 재렌더 범위 축소가 그 다음에 나온 작업이고, 둘 다 경계를 테스트로 박아 뒀습니다.',
        en: 'Writing up the reconciliation and memoisation chapters moved me from "reduce re-renders" to "decide their scope". Narrowing the re-render scope in the VitalVET chart and the Office expense table came after that, and both boundaries are pinned by tests.',
      },
      chapters: [
        { ko: '8. 리액트 재조정과 키 프롭스', en: '8. Reconciliation and key props' },
        { ko: '9. 리액트 렌더링 규칙', en: '9. Rendering rules' },
        { ko: '11. 리액트의 상태와 배칭', en: '11. State and batching' },
        { ko: '15. 메모이제이션 돌아보기', en: '15. Memoisation, revisited' },
        { ko: '17. 동시성 기능과 심화 훅', en: '17. Concurrency and advanced hooks' },
      ],
    },
    {
      slug: 'agentic',
      title: {
        ko: '클로드 코드로 시작하는 실전 에이전틱 코딩',
        en: 'Agentic Coding with Claude Code',
      },
      period: '2026.06 - 2026.08',
      notes: 12,
      href: notes('클로드 코드로 시작하는 실전 에이전틱 코딩') + '/intae',
      changed: {
        ko: '훅과 서브에이전트 장을 정리한 게 VitalVET의 PostToolUse 린트 훅으로 이어졌습니다. 규칙을 CLAUDE.md에 적어 두는 것과, 파일을 저장하는 순간 검사해 exit 2로 돌려보내는 것은 전혀 다른 일이었습니다.',
        en: 'The chapters on hooks and sub-agents turned into VitalVET’s PostToolUse lint hook. Writing a rule in CLAUDE.md and checking it the moment a file is saved — exiting 2 and handing the violation back — turned out to be entirely different things.',
      },
      chapters: [
        { ko: '02. 워크플로와 설정', en: '02. Workflow and settings' },
        { ko: '03. 에이전트 스킬', en: '03. Agent skills' },
        { ko: '04. 서브에이전트', en: '04. Sub-agents' },
        { ko: '06. 메모리와 대화 세션 관리', en: '06. Memory and session management' },
        { ko: '07. 자동화', en: '07. Automation' },
      ],
    },
    {
      slug: 'pragmatic',
      title: { ko: '실용주의 프로그래머', en: 'The Pragmatic Programmer' },
      period: '2026.08 -',
      notes: 8,
      href: notes('실용주의 프로그래머') + '/intae',
      changed: {
        ko: '지금 읽는 중입니다. "지식을 일반 텍스트로 두라"는 장이 팀 사이 컨텍스트를 채팅 대신 공유 레포에 두기로 한 판단과 맞물렸습니다.',
        en: 'Currently reading. The chapter on keeping knowledge in plain text lined up with the decision to keep cross-team context in a shared repo instead of chat.',
      },
      chapters: [
        { ko: '01. 실용주의 철학', en: '01. A pragmatic philosophy' },
        { ko: '02. 실용주의 접근법', en: '02. A pragmatic approach' },
        { ko: '04. 실용주의 편집증', en: '04. Pragmatic paranoia' },
        { ko: '06. 코딩하는 동안 해야 할 일들', en: '06. While you are coding' },
      ],
    },
  ] satisfies Book[],
}
