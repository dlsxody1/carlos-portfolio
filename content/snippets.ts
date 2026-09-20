import type { Snippet } from './resume'

/**
 * 회사 레포의 코드를 그대로 옮기지 않는다. 엔드포인트·도메인 용어·상수는 들어가지 않고,
 * 무엇을 어떤 단위로 쪼갰는지(경계·의존 방향·테스트가 붙는 자리)만 남긴 최소 코드다.
 * 좁은 단에 들어가므로 한 줄은 58칸(한글 2칸)을 넘기지 않는다.
 */

export const chartMemo: Snippet = {
  label: {
    ko: '표 → 행 → 셀. memo 경계와 각 단이 받는 데이터',
    en: 'Table to row to cell: where memo sits, what each level gets',
  },
  lang: 'tsx',
  code: `// 셀과 행에만 memo 경계를 둔다
// 행은 표 전체가 아니라 자기 행만 받는다
const Cell = memo(function Cell(p: CellProps) {
  return <input value={p.cell.value} onChange={p.onEdit} />
})

const Row = memo(function Row(p: RowProps) {
  return (
    <tr>
      {p.row.cells.map((c) => (
        <Cell key={c.id} cell={c} onEdit={p.onEdit} />
      ))}
    </tr>
  )
})

export function ChartTable({ rows }: TableProps) {
  // 콜백이 매 렌더 새로 생기면 memo 가 전부 무효다
  // 최신 구현은 ref 에, 내려가는 함수는 한 번만
  const latest = useRef<EditFn>(null!)
  latest.current = (id, value) => save({ id, value })
  const onEdit = useCallback<EditFn>(
    (id, value) => latest.current(id, value),
    [],
  )

  // 행 단위로 잘라 넘긴다 → 고친 행만 다시 그려진다
  return (
    <tbody>
      {rows.map((row) => (
        <Row key={row.id} row={row} onEdit={onEdit} />
      ))}
    </tbody>
  )
}`,
}

export const paymentState: Snippet = {
  label: {
    ko: '상태 전이는 순수 함수로, 네트워크는 훅으로',
    en: 'Pure function for the transitions, a hook for the network',
  },
  lang: 'ts',
  code: `// 화면도 네트워크도 모르는 순수 함수
// 그래서 테스트가 값 비교로 끝난다
export function next(s: PayState, e: PayEvent): PayState {
  switch (e.type) {
    case 'START':  return s === 'idle' ? 'pending' : s
    case 'FAIL':   return s === 'pending' ? 'failed' : s
    case 'SETTLE': return s === 'pending' ? 'done' : s
  }
}

// 입력값은 react-hook-form 하나가 들고
// 이 훅은 값을 받아 요청만 한다.
// 폼을 바꿔도 요청이, 요청을 바꿔도 폼이 안 바뀐다
export function usePay() {
  const [state, dispatch] = useReducer(next, 'idle')
  const { mutateAsync } = useMutation({ mutationFn: pay })

  const submit = async (values: PayForm) => {
    dispatch({ type: 'START' })
    track('payment_start')
    try {
      const at = await mutateAsync(values)
      dispatch({ type: 'SETTLE', at })
    } catch (e) {
      dispatch({ type: 'FAIL' })
      throw e
    }
  }

  return { state, submit }
}

// 전이 규칙은 화면을 띄우지 않고 34건을 돌린다
it('결제 중이 아닐 때 온 실패는 상태를 안 바꾼다', () => {
  expect(next('done', { type: 'FAIL' })).toBe('done')
})`,
}

export const rowSubscription: Snippet = {
  label: {
    ko: '행이 자기 슬라이스만 구독하고, 그 경계를 테스트가 지킨다',
    en: 'Each row subscribes to its own slice; a test keeps it that way',
  },
  lang: 'tsx',
  code: `// 표 전체 atom 을 읽으면 한 칸을 고쳐도
// 모든 행이 구독자로 깨어난다.
// 행마다 자기 조각만 보는 파생 atom 으로 범위를 좁힌다
const rowAtom = atomFamily((id: string) =>
  selectAtom(expenseAtom, (f) => f.rows[id], shallowEq),
)

const Row = memo(function Row({ id }: { id: string }) {
  const row = useAtomValue(rowAtom(id))
  return <tr>{/* … */}</tr>
})

// 한 번 좁힌 범위는 다음 사람이 무심코 넓힐 수 있다
it('1번 행을 고쳐도 2번 행은 안 그려진다', async () => {
  const renders = countRenders(Row)
  render(<ExpenseTable />)

  await user.type(amountOf(1), '10000')

  expect(renders.of('row-2')).toBe(1) // 최초 1회 그대로
})`,
}

export const draftHook: Snippet = {
  label: {
    ko: '문서 6종이 함께 쓰는 임시저장 훅 — 화면은 무엇을 저장할지만 정한다',
    en: 'One draft hook for 6 document types; the screen only says what to save',
  },
  lang: 'ts',
  code: `/**
 * 저장·복구·삭제가 일어나는 자리는 여기 하나다.
 * 화면은 IndexedDB 도, 키를 어떻게 만드는지도 모른다
 */
export function useDraft<T>(o: DraftOptions<T>) {
  const key = \`\${o.docType}:\${o.docNo}\`

  useEffect(() => {
    read<T>(key).then((d) => d && o.onRestore(d))
  }, [key])

  useEffect(() => {
    // 타자 중엔 쓰지 않는다
    const t = setTimeout(() => write(key, o.values), 800)
    return () => clearTimeout(t)
  }, [key, o.values])

  // 제출이 성공한 자리에서만 부른다
  return { clear: () => remove(key) }
}`,
}

export const scrollAttribute: Snippet = {
  label: {
    ko: '스크롤 상태를 state 가 아니라 DOM attribute 로',
    en: 'Scroll state as a DOM attribute instead of React state',
  },
  lang: 'tsx',
  code: `// 스크롤마다 setState 를 하면
// 헤더 아래 트리가 통째로 다시 그려진다.
// 상태를 attribute 로 내려 CSS 가 읽게 하면
// React 는 스크롤에 한 번도 관여하지 않는다
useEffect(() => {
  const el = headerRef.current!
  let last = 0

  const onScroll = () => {
    const y = window.scrollY
    const dir = y > last ? 'away' : 'back'
    const next = y < 80 ? 'top' : dir
    // 렌더가 아니라 attribute 쓰기
    if (el.dataset.scroll !== next) {
      el.dataset.scroll = next
    }
    last = y
  }

  addEventListener('scroll', onScroll, { passive: true })
  return () => removeEventListener('scroll', onScroll)
}, [])

// 보이기·숨기기는 전부 CSS 가 한다
// [data-scroll='away'] { translate: 0 -100%; }`,
}

export const seoPrerender: Snippet = {
  label: {
    ko: '빌드 뒤, 라우트마다 크롤러가 읽을 HTML 한 장씩',
    en: 'After the build, one crawler-readable HTML per route',
  },
  lang: 'ts',
  code: `// SPA 는 빌드 결과가 빈 index.html 한 장이라
// 크롤러가 읽을 게 없다.
// 빌드 뒤에 도는 스크립트가 라우트 수만큼 복제하면서
// 메타와 본문 요약만 갈아 끼운다
for (const route of routes) {
  const html = template
    .replace('<!--head-->', renderHead({
      title: route.title,
      canonical: new URL(route.path, origin).href,
      og: route.og,
      jsonLd: route.jsonLd,
    }))
    // JS 없이도 읽히는 본문
    .replace('<!--summary-->', route.summary)

  const dir = join(outDir, route.path)
  await mkdir(dir, { recursive: true })
  await writeFile(join(dir, 'index.html'), html)
}`,
}

export const scoring: Snippet = {
  label: {
    ko: '채점은 순수 함수로 꺼내고, 실측값은 테스트에 박아 둔다',
    en: 'Scoring in a pure function, the measured numbers pinned by a test',
  },
  lang: 'ts',
  code: `/**
 * 시간도 네트워크도 읽지 않는다.
 * 그래서 점수가 왜 그렇게 나왔는지 값으로 따질 수 있다
 */
export function score(c: Candidate, ctx: Ctx): number {
  // 후보를 좁히는 단계에서 관심사가 이미 걸러졌으면
  // 그 축은 모두 같은 값이 된다.
  // 상수가 된 축의 가중치는 남은 축에 비례 배분한다
  const w = ctx.prefiltered
    ? redistribute(WEIGHTS, 'interest')
    : WEIGHTS

  return (
    w.distance * byDistance(c, ctx) +
    w.deadline * byDeadline(c) +
    w.interest * byInterest(c, ctx)
  )
}

// 예전엔 마감 임박순으로 자른 뒤 채점해서,
// 잘려 나간 후보는 점수를 받을 기회가 없었다.
// 창을 넓히고, 자르는 기준을 점수로 바꾼 게 전부다
export const top = (cs: Candidate[], ctx: Ctx, n = 20) =>
  cs
    .map((c) => ({ c, s: score(c, ctx) }))
    .sort((a, b) => b.s - a.s)
    .slice(0, n)

it('반경 안의 후보는 전부 채점된다', () => {
  // 고치기 전에는 30
  expect(scoreAll(mangwon10km, ctx)).toHaveLength(236)
})`,
}

export const lintHook: Snippet = {
  label: {
    ko: '파일을 저장하는 순간 도는 훅과, 어겼을 때 에이전트가 받는 것',
    en: 'The hook that runs on save, and what the agent gets on a violation',
  },
  lang: 'ts',
  code: `// .claude/settings.json
"PostToolUse": [{
  "matcher": "Edit|Write|MultiEdit",
  "hooks": [{
    "type": "command",
    "command": "node .claude/hooks/fsd-lint.mjs"
  }]
}]

// 위반 시 에이전트가 받는 메시지 (exit 2)
// 다음 단계로 넘어가기 전에 그 자리에서 고치게 된다
FSD 룰 위반 1건 (CLAUDE.md 참고):
  [R7] src/features/payment/ui/PayForm.tsx:4
  깊은 경로 import 금지: @/entities/pet/model/types
  슬라이스 Public API 경유: from "@/entities/pet"`,
}
