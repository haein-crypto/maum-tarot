"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import {
  Position,
  TarotCard,
  scoreLevel,
  shuffleDeck,
  summarizeTrend,
  tarotDeck,
  validateDeck,
} from "@/lib/tarot";

type DrawMode = 1 | 3;
type SelectedCard = { card: TarotCard; deckIndex: number };

const positions: { key: Position; label: string }[] = [
  { key: "past", label: "과거" },
  { key: "present", label: "현재" },
  { key: "future", label: "미래" },
];

function CardBack({ index }: { index: number }) {
  return (
    <div className="card-back" aria-hidden="true">
      <span className="corner-star">✦</span>
      <span className="moon-mark">☾</span>
      <span className="center-star">✧</span>
      <span className="moon-mark moon-mark-right">☽</span>
      <span className="corner-star corner-star-bottom">✦</span>
      <span className="card-index">{String(index + 1).padStart(2, "0")}</span>
    </div>
  );
}

function CardFace({ card, compact = false }: { card: TarotCard; compact?: boolean }) {
  const numeral = card.arcana === "major" ? String(card.number).padStart(2, "0") : card.rank?.toUpperCase();
  const majorNumber = card.number ?? 0;
  const sheetNumber = Math.min(4, Math.floor(majorNumber / 6) + 1);
  const sheetIndex = sheetNumber === 4 ? majorNumber - 18 : majorNumber % 6;
  const columns = sheetNumber === 4 ? 2 : 3;
  const column = sheetIndex % columns;
  const row = Math.floor(sheetIndex / columns);
  const rankOrder = ["ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "page", "knight", "queen", "king"];
  const minorIndex = rankOrder.indexOf(card.rank ?? "ace");
  const minorColumn = minorIndex % 4;
  const minorRow = Math.floor(minorIndex / 4);
  const gridPosition = (index: number) => index === 0 ? "0%" : index === 3 ? "100%" : `${index * 33.333}%`;
  const artStyle = card.arcana === "major"
    ? majorNumber === 0
      ? { backgroundImage: "url(/images/tarot/major-fool.png)", backgroundSize: "cover", backgroundPosition: "center" }
      : {
          backgroundImage: `url(/images/tarot/major-0${sheetNumber}.png)`,
          backgroundSize: `${columns * 100}% 200%`,
          backgroundPosition: `${column === 0 ? "0%" : column === columns - 1 ? "100%" : "50%"} ${row === 0 ? "0%" : "100%"}`,
        }
    : {
        backgroundImage: `url(/images/tarot/minor-${card.suit}.png)`,
        backgroundSize: "400% 400%",
        backgroundPosition: `${gridPosition(minorColumn)} ${gridPosition(minorRow)}`,
      };
  return (
    <div className={`card-face card-${card.arcana} ${compact ? "card-face-compact" : ""}`} aria-hidden="true">
      <span className="face-number">{numeral}</span>
      <span className={`generated-card-art generated-${card.arcana} ${card.arcana === "major" && majorNumber > 0 && majorNumber < 18 ? "generated-major-tall" : ""}`} style={artStyle} />
      <strong>{card.name}</strong>
    </div>
  );
}

function ReadingCard({ selected, label, onOpen }: { selected?: SelectedCard; label: string; onOpen: (selected: SelectedCard, element: HTMLButtonElement) => void }) {
  if (!selected) {
    return (
      <div className="reading-slot empty-slot">
        <span className="position-label">{label}</span>
        <div className="empty-card"><span>✦</span></div>
        <p>카드를 기다리고 있어요</p>
      </div>
    );
  }
  return (
    <div className="reading-slot revealed-slot">
      <span className="position-label">{label}</span>
      <button className="result-card-button" onClick={(event) => onOpen(selected, event.currentTarget)} aria-label={`${label} ${selected.card.name} 자세히 보기`}>
        <CardFace card={selected.card} compact />
      </button>
      <div className="result-copy">
        <strong>{selected.card.name}</strong>
        <p>{selected.card.message}</p>
        <small>카드를 눌러 자세히 보기</small>
      </div>
    </div>
  );
}

function FlowChart({ cards }: { cards: SelectedCard[] }) {
  const chartId = useId().replace(/:/g, "");
  const scores = cards.map(({ card }) => card.positivity);
  const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
  const points = scores.map((score, index) => ({ x: 82 + index * 180, y: 218 - score * 1.72 }));
  const path = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
  return (
    <section className="flow-panel" aria-labelledby={`${chartId}-title`}>
      <div className="flow-heading">
        <div>
          <span className="eyebrow">THREE CARD FLOW</span>
          <h2 id={`${chartId}-title`}>마음의 흐름</h2>
        </div>
        <div className="flow-summary">
          <span>평균 긍정도</span>
          <strong>{average.toFixed(1)} · {scoreLevel(average)}</strong>
          <em>{summarizeTrend(scores)}</em>
        </div>
      </div>
      <div className="chart-wrap">
        <svg className="flow-chart" viewBox="0 0 524 262" role="img" aria-labelledby={`${chartId}-title ${chartId}-desc`}>
          <desc id={`${chartId}-desc`}>과거, 현재, 미래 카드의 긍정도를 연결한 선 그래프</desc>
          <defs>
            <linearGradient id={`${chartId}-line`} x1="0" x2="1">
              <stop offset="0" stopColor="#b98d43" />
              <stop offset=".5" stopColor="#f2d795" />
              <stop offset="1" stopColor="#d3a64e" />
            </linearGradient>
            <filter id={`${chartId}-glow`}><feGaussianBlur stdDeviation="3" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          </defs>
          {[0, 25, 50, 75, 100].map((tick) => {
            const y = 218 - tick * 1.72;
            return <g key={tick}><line x1="48" x2="492" y1={y} y2={y} className="grid-line" /><text x="38" y={y + 4} className="tick-label">{tick}</text></g>;
          })}
          <path d={path} fill="none" stroke={`url(#${chartId}-line)`} strokeWidth="3" filter={`url(#${chartId}-glow)`} />
          {points.map((point, index) => (
            <g key={cards[index].card.id}>
              <circle cx={point.x} cy={point.y} r="7" className={`chart-point level-${scoreLevel(scores[index])}`} />
              <text x={point.x} y={point.y - 15} className="score-label">{scores[index]}</text>
              <text x={point.x} y="249" className="axis-label">{positions[index].label}</text>
            </g>
          ))}
        </svg>
      </div>
      <div className="chart-legend">
        {cards.map(({ card }, index) => (
          <span key={card.id}><b>{positions[index].label}</b> {card.name} {card.positivity}점 <i className={`level-text level-${scoreLevel(card.positivity)}`}>{scoreLevel(card.positivity)}</i></span>
        ))}
      </div>
      <p className="sr-only">{cards.map(({ card }, index) => `${positions[index].label}: ${card.name} ${card.positivity}점(${scoreLevel(card.positivity)})`).join(" → ")}</p>
    </section>
  );
}

function CustomReading({ cards, mode }: { cards: SelectedCard[]; mode: DrawMode }) {
  const [question, setQuestion] = useState("");
  const [submittedQuestion, setSubmittedQuestion] = useState("");

  const interpretation = useMemo(() => {
    if (!submittedQuestion) return null;
    const normalized = submittedQuestion.replace(/\s/g, "");
    const topic = /연애|사랑|마음|관계|재회|상대/.test(normalized)
      ? { name: "관계", lens: "서로의 마음과 관계의 균형" }
      : /직장|직업|취업|이직|일|사업|진로/.test(normalized)
        ? { name: "일과 진로", lens: "현실적인 선택과 성장의 방향" }
        : /돈|재정|금전|투자|수입|재물/.test(normalized)
          ? { name: "재정", lens: "안정적인 기반과 자원의 흐름" }
          : /시험|공부|합격|학업/.test(normalized)
            ? { name: "학업", lens: "집중력과 꾸준한 진전" }
            : { name: "현재의 고민", lens: "지금 가장 중요하게 살펴볼 마음" };
    const average = cards.reduce((sum, item) => sum + item.card.positivity, 0) / cards.length;
    const tone = average >= 70
      ? "전체적으로 가능성이 밝게 열려 있습니다. 좋은 흐름을 기다리기보다 지금 할 수 있는 행동으로 이어갈 때 힘이 커집니다."
      : average >= 40
        ? "가능성과 주의점이 함께 놓여 있습니다. 성급히 결론 내리기보다 상황을 조율하며 한 단계씩 확인하는 태도가 도움이 됩니다."
        : "지금은 결과를 서두르기보다 지친 부분을 돌보고 기준을 다시 세울 때입니다. 어려운 흐름도 방향을 바꾸라는 신호로 활용할 수 있습니다.";

    return { topic, average, tone };
  }, [cards, submittedQuestion]);

  const submitQuestion = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = question.trim();
    if (trimmed) setSubmittedQuestion(trimmed);
  };

  return (
    <section className="custom-reading" aria-labelledby="custom-reading-title">
      <div className="custom-reading-heading">
        <span className="eyebrow">A QUESTION FOR THE CARDS</span>
        <h2 id="custom-reading-title">이번 리딩이 끝났습니다</h2>
        <p>마음에 남은 질문이 있다면 카드의 메시지와 함께 다시 바라보세요.</p>
      </div>
      <form className="question-form" onSubmit={submitQuestion}>
        <label htmlFor="custom-question">카드에게 묻고 싶은 질문</label>
        <div className="question-input-row">
          <input
            id="custom-question"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            maxLength={120}
            placeholder="예: 지금 이 관계에서 제가 살펴봐야 할 것은 무엇인가요?"
          />
          <button type="submit" disabled={!question.trim()}>맞춤 뜻풀이 보기 <span>✦</span></button>
        </div>
        <small>{question.length}/120 · 질문과 결과는 저장되지 않습니다.</small>
      </form>
      {interpretation && (
        <div className="custom-answer" aria-live="polite">
          <div className="answer-question"><span>당신의 질문</span><p>“{submittedQuestion}”</p></div>
          <div className="answer-intro">
            <span>{interpretation.topic.name}에 관한 카드의 답</span>
            <p>이 질문에서는 <b>{interpretation.topic.lens}</b>을 중심으로 카드를 읽어볼 수 있습니다. {interpretation.tone}</p>
          </div>
          <div className={`answer-cards answer-cards-${mode}`}>
            {cards.map(({ card }, index) => {
              const position = mode === 3 ? positions[index] : null;
              return (
                <article key={card.id}>
                  <div className="answer-card-title"><i>{card.symbol}</i><span>{position?.label ?? "핵심 메시지"}</span><strong>{card.name}</strong></div>
                  <p>{position ? card.positionMeanings[position.key] : card.meaning}</p>
                  <em>{card.advice}</em>
                </article>
              );
            })}
          </div>
          <div className="answer-closing"><span>마지막 조언</span><p>{cards[cards.length - 1].card.message} 카드는 미래를 확정하지 않으니, 이 해석을 지금의 마음을 살피는 하나의 관점으로 활용해 보세요.</p></div>
        </div>
      )}
    </section>
  );
}

function CardModal({ selected, position, onClose, returnFocus }: { selected: SelectedCard; position?: typeof positions[number]; onClose: () => void; returnFocus: React.RefObject<HTMLElement | null> }) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.querySelector<HTMLElement>("button")?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusables = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button, [href], [tabindex]:not([tabindex="-1"])'));
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKey);
      returnFocus.current?.focus();
    };
  }, [onClose, returnFocus]);

  const { card } = selected;
  const classification = card.arcana === "major" ? `메이저 아르카나 · ${card.number}` : `마이너 아르카나 · ${card.name.split(" ")[0]} · ${card.name.split(" ").slice(1).join(" ")}`;
  return (
    <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" ref={dialogRef}>
        <button className="modal-close" onClick={onClose} aria-label="상세 해설 닫기">×</button>
        <div className="modal-visual"><CardFace card={card} /></div>
        <div className="modal-content">
          <span className="eyebrow">{position ? `${position.label} · ` : ""}{classification}</span>
          <h2 id="modal-title">{card.name}</h2>
          <div className="keyword-list">{card.keywords.map((keyword) => <span key={keyword}>{keyword}</span>)}</div>
          <section className="symbol-reading" aria-labelledby="symbol-reading-title">
            <span id="symbol-reading-title">그림 속 상징</span>
            <div className="symbol-list">
              {card.symbols.map((item) => (
                <div key={item.label}><strong>{item.label}</strong><p>{item.meaning}</p></div>
              ))}
            </div>
            <small>상징은 질문과 주변 카드에 따라 여러 방향으로 읽힐 수 있습니다.</small>
          </section>
          {position && <div className="position-reading"><strong>{position.label}의 해설</strong><p>{card.positionMeanings[position.key]}</p></div>}
          <div className="detail-section"><span>전체 의미</span><p>{card.meaning}</p></div>
          <div className="detail-grid">
            <div><span>빛나는 면</span><p>{card.positive}</p></div>
            <div><span>주의할 점</span><p>{card.caution}</p></div>
          </div>
          <div className="advice-box"><span>오늘의 행동 조언</span><p>{card.advice}</p></div>
          <div className="positivity"><div><span>긍정도</span><strong>{card.positivity}</strong><small>/ 100 · {scoreLevel(card.positivity)}</small></div><div className="score-track"><i style={{ width: `${card.positivity}%` }} /></div></div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const validationErrors = useMemo(() => validateDeck(tarotDeck), []);
  const [view, setView] = useState<"home" | "draw">("home");
  const [mode, setMode] = useState<DrawMode>(1);
  const [deck, setDeck] = useState<TarotCard[]>(tarotDeck);
  const [selected, setSelected] = useState<SelectedCard[]>([]);
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const resultRef = useRef<HTMLElement>(null);
  const modalTriggerRef = useRef<HTMLElement | null>(null);

  const startDraw = () => {
    setDeck(shuffleDeck(tarotDeck));
    setSelected([]);
    setModalIndex(null);
    setView("draw");
  };

  const resetDraw = () => {
    setDeck(shuffleDeck(tarotDeck));
    setSelected([]);
    setModalIndex(null);
    setAnnouncement("새로운 카드 78장을 섞었습니다.");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const changeMode = () => {
    setSelected([]);
    setModalIndex(null);
    setView("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const chooseCard = (card: TarotCard, deckIndex: number) => {
    setSelected((current) => {
      if (current.length >= mode || current.some((item) => item.deckIndex === deckIndex)) return current;
      const next = [...current, { card, deckIndex }];
      const position = mode === 3 ? positions[next.length - 1].label : "오늘의 카드";
      setAnnouncement(`${position}, ${card.name}이 공개되었습니다. ${next.length}/${mode} 선택 완료.`);
      if (next.length === mode) requestAnimationFrame(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
      return next;
    });
  };

  const openModal = (item: SelectedCard, element: HTMLElement) => {
    modalTriggerRef.current = element;
    setModalIndex(selected.findIndex((selectedItem) => selectedItem.deckIndex === item.deckIndex));
  };

  if (validationErrors.length > 0) {
    return <main className="error-page"><span className="brand-mark">✦</span><h1>카드를 준비하지 못했어요</h1><p>덱 데이터에 문제가 있어 시작을 멈췄습니다.</p><pre>{validationErrors.join("\n")}</pre></main>;
  }

  if (view === "home") {
    return (
      <main className="landing">
        <div className="ambient-stars" aria-hidden="true">✦　·　✧　　·　✦</div>
        <header className="site-header"><div className="brand"><span>✦</span><b>마음 예보</b></div><p>MAEUM FORECAST</p></header>
        <section className="hero">
          <span className="eyebrow">A QUIET MOMENT FOR YOU</span>
          <h1>지금, 어떤 흐름이<br /><em>궁금한가요?</em></h1>
          <p className="hero-copy">잠시 숨을 고르고 마음이 머무는 방식을 골라보세요.<br />별빛 아래 펼쳐진 카드가 지금의 이야기를 비춰드립니다.</p>
          <div className="mode-picker" role="radiogroup" aria-label="뽑기 방식">
            <button role="radio" aria-checked={mode === 1} className={mode === 1 ? "mode-card active" : "mode-card"} onClick={() => setMode(1)}>
              <span className="mode-icon"><i>☾</i></span><span className="mode-number">01</span><strong>1장 뽑기</strong><em>오늘의 메시지</em><p>지금 내게 필요한 한 가지 이야기를<br />천천히 들여다봅니다.</p><i className="radio-dot" />
            </button>
            <button role="radio" aria-checked={mode === 3} className={mode === 3 ? "mode-card active" : "mode-card"} onClick={() => setMode(3)}>
              <span className="mode-icon triple"><i>☽</i><i>✦</i><i>☾</i></span><span className="mode-number">03</span><strong>3장 뽑기</strong><em>과거 · 현재 · 미래</em><p>시간의 흐름 속에서 마음의 변화와<br />앞으로의 가능성을 살펴봅니다.</p><i className="radio-dot" />
            </button>
          </div>
          <button className="primary-button" onClick={startDraw}><span>카드 펼치기</span><b>✦</b></button>
          <p className="gentle-note"><span>☾</span> 정답보다 지금의 마음에 귀 기울여 보세요.</p>
        </section>
        <footer><span>✦</span><p>카드는 미래를 단정하지 않습니다.<br />당신의 마음을 비추는 작은 거울로 바라봐 주세요.</p><span>✦</span></footer>
      </main>
    );
  }

  const isComplete = selected.length === mode;
  return (
    <main className="draw-page">
      <div className="live-region sr-only" aria-live="polite">{announcement}</div>
      <header className="draw-header">
        <button className="brand brand-button" onClick={changeMode}><span>✦</span><b>마음 예보</b></button>
        <div className="progress"><span>{mode === 1 ? "오늘의 메시지" : "과거 · 현재 · 미래"}</span><strong>{selected.length}<i>/</i>{mode}</strong></div>
        <button className="text-button" onClick={changeMode}>방식 바꾸기</button>
      </header>

      <section className="result-area" ref={resultRef} tabIndex={-1}>
        <div className="section-intro">
          <span className="eyebrow">YOUR READING</span>
          <h1>{isComplete ? "카드가 전하는 이야기" : mode === 1 ? "마음이 이끄는 한 장을 골라보세요" : `${positions[selected.length].label}의 카드를 골라보세요`}</h1>
          <p>{isComplete ? "카드를 누르면 더 깊은 해설을 볼 수 있어요." : `서두르지 않아도 괜찮아요. ${mode - selected.length}장의 카드가 당신을 기다리고 있습니다.`}</p>
        </div>
        <div className={`reading-row mode-${mode}`}>
          {(mode === 1 ? [{ key: "present" as Position, label: "오늘의 카드" }] : positions).map((position, index) => (
            <ReadingCard key={position.label} selected={selected[index]} label={position.label} onOpen={openModal} />
          ))}
        </div>
        {mode === 3 && isComplete && <FlowChart cards={selected} />}
        {isComplete && <div className="result-actions"><button className="primary-button small" onClick={resetDraw}><span>다시 뽑기</span><b>↻</b></button><button className="secondary-button" onClick={changeMode}>방식 바꾸기</button></div>}
      </section>

      {!isComplete && (
        <section className="deck-section" aria-label="카드 덱">
          <div className="deck-heading"><div><span className="eyebrow">THE DECK · 78 CARDS</span><h2>마음이 머무는 카드를 선택하세요</h2></div><p>새로고침하면 현재 리딩은 초기화됩니다.</p></div>
          <div className="card-grid">
            {deck.map((card, index) => {
              const picked = selected.some((item) => item.deckIndex === index);
              return (
                <button key={`${card.id}-${index}`} className={`deck-card ${picked ? "picked" : ""}`} disabled={picked} onClick={() => chooseCard(card, index)} aria-label={`뒤집힌 카드 ${index + 1} 선택`}>
                  {picked ? <span className="picked-placeholder"><b>✦</b><em>선택한 카드</em></span> : <CardBack index={index} />}
                </button>
              );
            })}
          </div>
        </section>
      )}
      {isComplete && <CustomReading key={selected.map((item) => item.card.id).join("-")} cards={selected} mode={mode} />}
      {modalIndex !== null && selected[modalIndex] && <CardModal selected={selected[modalIndex]} position={mode === 3 ? positions[modalIndex] : undefined} onClose={() => setModalIndex(null)} returnFocus={modalTriggerRef} />}
    </main>
  );
}
