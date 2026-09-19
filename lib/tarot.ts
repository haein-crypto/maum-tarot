export type Suit = "wands" | "cups" | "swords" | "pentacles";
export type Rank = "ace" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "page" | "knight" | "queen" | "king";
export type Position = "past" | "present" | "future";

export type TarotCard = {
  id: string;
  name: string;
  arcana: "major" | "minor";
  number: number | null;
  suit: Suit | null;
  rank: Rank | null;
  symbol: string;
  keywords: [string, string, string];
  message: string;
  meaning: string;
  positive: string;
  caution: string;
  advice: string;
  positionMeanings: Record<Position, string>;
  positivity: number;
};

type CardSeed = Omit<TarotCard, "id" | "arcana" | "number" | "suit" | "rank" | "positionMeanings">;

const majorSeeds: CardSeed[] = [
  { name: "바보", symbol: "✦", keywords: ["시작", "자유", "모험"], message: "가벼운 마음으로 새로운 가능성에 첫발을 내디뎌 보세요.", meaning: "아직 정해지지 않은 길 앞에서 호기심이 깨어납니다. 완벽한 준비보다 경험을 향한 열린 태도가 중요한 때입니다.", positive: "고정관념에서 벗어나 예상 밖의 기회를 발견할 수 있습니다.", caution: "충동만 앞세우면 중요한 조건을 놓칠 수 있습니다.", advice: "설렘을 따르되 꼭 확인할 한 가지는 챙긴 뒤 움직이세요.", positivity: 75 },
  { name: "마법사", symbol: "✧", keywords: ["의지", "창조", "집중"], message: "이미 가진 자원을 모아 생각을 현실의 행동으로 바꾸세요.", meaning: "능력과 도구가 손 닿는 곳에 모여 있습니다. 분명한 의도를 세우고 집중하면 원하는 방향으로 흐름을 만들 수 있습니다.", positive: "재능을 능동적으로 사용해 좋은 출발을 만들 힘이 있습니다.", caution: "말과 재주를 과장하거나 여러 일에 힘을 흩뜨리지 마세요.", advice: "가장 중요한 목표 하나를 정하고 오늘 가능한 첫 행동을 시작하세요.", positivity: 88 },
  { name: "여사제", symbol: "☾", keywords: ["직관", "침묵", "통찰"], message: "서두르기보다 조용한 마음속 신호를 먼저 들어보세요.", meaning: "겉으로 드러난 정보 뒤에 아직 읽어야 할 맥락이 있습니다. 잠시 멈추면 이성만으로 보이지 않던 답이 선명해집니다.", positive: "깊은 관찰과 직관이 중요한 선택을 안내합니다.", caution: "침묵을 회피로 만들거나 근거 없는 불안을 진실로 여기지 마세요.", advice: "답을 재촉하지 말고 반복해서 떠오르는 감각을 기록해 보세요.", positivity: 72 },
  { name: "여제", symbol: "❀", keywords: ["풍요", "돌봄", "성장"], message: "잘 돌본 마음과 관계가 풍성한 결실로 돌아옵니다.", meaning: "창조와 돌봄의 에너지가 삶을 부드럽게 키웁니다. 자신과 주변을 충분히 보살필수록 자연스러운 성장이 이어집니다.", positive: "관계와 창작에서 넉넉한 결실을 기대할 수 있습니다.", caution: "지나친 보호나 편안함에 머물러 성장을 늦추지 마세요.", advice: "몸과 마음에 실제로 영양을 주는 일을 하나 선택하세요.", positivity: 92 },
  { name: "황제", symbol: "♜", keywords: ["질서", "책임", "기반"], message: "흔들리지 않을 기준을 세우고 책임 있게 이끌어 가세요.", meaning: "구조와 원칙이 복잡한 상황에 안정감을 줍니다. 감정에 휘둘리지 않는 현실적인 판단이 필요한 때입니다.", positive: "계획과 리더십으로 든든한 기반을 만들 수 있습니다.", caution: "통제하려는 마음이 타인의 의견을 막지 않도록 주의하세요.", advice: "지켜야 할 기준과 조정 가능한 부분을 분명히 나누세요.", positivity: 70 },
  { name: "교황", symbol: "⚜", keywords: ["지혜", "전통", "배움"], message: "검증된 지혜를 배우되 자신의 가치와 맞는지 살펴보세요.", meaning: "오래 쌓인 지식과 공동체의 기준이 길잡이가 됩니다. 좋은 스승이나 체계적인 배움에서 답을 얻을 수 있습니다.", positive: "신뢰할 만한 조언과 소속감이 안정적인 성장을 돕습니다.", caution: "관습을 무조건 따르며 자신의 판단을 놓치지 마세요.", advice: "경험 많은 사람에게 구체적인 질문 하나를 건네보세요.", positivity: 68 },
  { name: "연인", symbol: "♡", keywords: ["선택", "조화", "진실"], message: "마음과 가치가 같은 방향을 가리키는 선택을 하세요.", meaning: "관계의 끌림과 중요한 선택이 함께 나타납니다. 솔직한 소통을 통해 서로의 차이까지 받아들일 때 연결이 깊어집니다.", positive: "진심에 기반한 선택이 관계와 삶에 조화를 가져옵니다.", caution: "순간의 매력만 좇거나 결정을 타인에게 맡기지 마세요.", advice: "무엇을 얻을지보다 어떤 사람이 되고 싶은지 먼저 물어보세요.", positivity: 90 },
  { name: "전차", symbol: "➶", keywords: ["전진", "의지", "승리"], message: "흩어진 힘을 한 방향으로 모아 힘차게 나아가세요.", meaning: "상반된 욕구를 다루는 단단한 의지가 추진력을 만듭니다. 목적지가 분명하다면 장애물도 성장의 동력이 됩니다.", positive: "집중력과 결단으로 빠른 진전을 만들 가능성이 큽니다.", caution: "속도에 취해 감정이나 주변 상황을 무시하지 마세요.", advice: "목표와 멈춰야 할 기준을 함께 정한 뒤 출발하세요.", positivity: 82 },
  { name: "힘", symbol: "∞", keywords: ["용기", "인내", "온화함"], message: "부드럽지만 단단한 태도로 내면의 힘을 다루세요.", meaning: "진짜 강함은 억누르는 힘보다 이해하고 조절하는 힘에 가깝습니다. 불안과 욕망을 친절하게 바라볼 때 용기가 자랍니다.", positive: "차분한 인내가 어려운 상황을 변화시키는 힘이 됩니다.", caution: "참는 것을 강함으로 착각해 감정을 쌓아두지 마세요.", advice: "자신에게 다정한 말로 시작해 필요한 경계를 분명히 하세요.", positivity: 84 },
  { name: "은둔자", symbol: "✺", keywords: ["성찰", "탐색", "지혜"], message: "잠시 소음을 떠나 자신만의 답을 깊이 살펴보세요.", meaning: "외부의 평가보다 내면의 등불이 중요한 시기입니다. 혼자만의 성찰은 다음 방향을 정하는 지혜를 길러 줍니다.", positive: "깊은 집중을 통해 본질적인 답을 찾을 수 있습니다.", caution: "성찰이 고립이나 끝없는 고민으로 굳어지지 않게 하세요.", advice: "조용한 시간을 확보하고 지금 가장 중요한 질문을 적어보세요.", positivity: 60 },
  { name: "운명의 수레바퀴", symbol: "◉", keywords: ["전환", "순환", "기회"], message: "변화의 흐름을 읽고 열리는 기회에 유연하게 올라타세요.", meaning: "삶의 주기가 움직이며 예상하지 못한 전환점이 찾아옵니다. 모든 것을 통제하기보다 변화 속에서 선택할 수 있는 부분을 찾으세요.", positive: "막혀 있던 상황이 움직이며 새로운 기회가 열립니다.", caution: "행운만 기다리거나 일시적인 변화에 지나치게 흔들리지 마세요.", advice: "바뀐 조건을 빠르게 파악하고 지금 가능한 선택을 하세요.", positivity: 78 },
  { name: "정의", symbol: "⚖", keywords: ["균형", "책임", "판단"], message: "사실을 고르게 살피고 선택의 책임까지 받아들이세요.", meaning: "감정과 사실을 구분하는 공정한 시선이 필요합니다. 지금의 결과는 이전 선택과 연결되어 있으며 정직한 판단이 균형을 되찾습니다.", positive: "명확한 기준과 투명한 소통이 올바른 결론으로 이끕니다.", caution: "자신에게만 유리한 근거를 고르거나 지나치게 냉정해지지 마세요.", advice: "확인된 사실과 추측을 나누어 적은 뒤 결정하세요.", positivity: 66 },
  { name: "매달린 사람", symbol: "▽", keywords: ["멈춤", "관점", "수용"], message: "억지로 밀어붙이기보다 다른 각도에서 상황을 바라보세요.", meaning: "잠시 멈춘 시간은 손실이 아니라 관점을 바꾸는 여백입니다. 익숙한 방식과 집착을 내려놓을 때 새로운 의미가 보입니다.", positive: "기다림 속에서 중요한 통찰과 새로운 해법을 얻습니다.", caution: "희생을 반복하며 스스로 선택할 힘까지 포기하지 마세요.", advice: "지금 바꿀 수 없는 것 하나를 놓고 관찰의 시간을 가지세요.", positivity: 48 },
  { name: "죽음", symbol: "✣", keywords: ["끝맺음", "변화", "재생"], message: "끝난 것을 놓아주고 다음 계절을 위한 자리를 만드세요.", meaning: "한 흐름이 분명히 마무리되며 깊은 전환이 시작됩니다. 익숙함을 놓는 일은 어렵지만 새 삶이 들어올 공간을 만듭니다.", positive: "불필요한 것을 정리해 강력한 재출발을 만들 수 있습니다.", caution: "이미 끝난 상황을 두려움 때문에 붙잡지 마세요.", advice: "더는 나를 살리지 않는 습관 하나를 정리해 보세요.", positivity: 42 },
  { name: "절제", symbol: "⌁", keywords: ["조율", "회복", "균형"], message: "서두르지 말고 서로 다른 요소를 알맞게 조율하세요.", meaning: "극단 사이에서 나만의 적절한 온도를 찾는 과정입니다. 작은 조정이 쌓이면 몸과 마음, 관계의 흐름이 자연스럽게 회복됩니다.", positive: "유연한 조율을 통해 안정과 치유가 이어집니다.", caution: "갈등을 피하려고 필요한 결정까지 미루지 마세요.", advice: "과한 부분은 덜고 부족한 부분은 조금씩 보충하세요.", positivity: 76 },
  { name: "악마", symbol: "♢", keywords: ["집착", "욕망", "자각"], message: "나를 붙잡는 욕망의 정체를 솔직하게 바라보세요.", meaning: "습관과 두려움이 선택을 제한하고 있을 수 있습니다. 얽매임을 알아차리는 순간부터 끊어낼 힘도 다시 돌아옵니다.", positive: "숨겨둔 욕구를 인정하면 현실적인 변화의 출발점이 생깁니다.", caution: "즉각적인 만족이나 불균형한 관계에 주도권을 넘기지 마세요.", advice: "반복되는 패턴 하나의 대가와 이득을 정직하게 적어보세요.", positivity: 28 },
  { name: "탑", symbol: "ϟ", keywords: ["변화", "재정비", "깨달음"], message: "흔들리는 기반을 살피고 다시 세울 때입니다.", meaning: "견고해 보이던 구조가 흔들리며 감춰졌던 진실이 드러납니다. 갑작스러운 변화는 불편하지만 더 정직한 기반을 만드는 계기가 됩니다.", positive: "낡은 한계를 빠르게 걷어내고 본질을 확인할 수 있습니다.", caution: "당황한 마음으로 모든 것을 한꺼번에 무너뜨리지 마세요.", advice: "가장 안전한 부분부터 확인하고 다시 세울 우선순위를 정하세요.", positivity: 20 },
  { name: "별", symbol: "★", keywords: ["희망", "회복", "영감"], message: "작은 회복의 신호를 믿고 다음 걸음을 준비하세요.", meaning: "거친 시간을 지나 맑은 희망과 영감이 찾아옵니다. 당장 완벽하지 않아도 진실한 바람을 따라가면 회복의 길이 이어집니다.", positive: "마음이 정화되고 미래를 향한 신뢰가 살아납니다.", caution: "막연한 기대만 품고 현실의 작은 행동을 놓치지 마세요.", advice: "원하는 미래를 한 문장으로 쓰고 오늘의 작은 실천을 연결하세요.", positivity: 85 },
  { name: "달", symbol: "☽", keywords: ["불확실", "감수성", "무의식"], message: "흐릿한 감정 속에서 사실과 상상을 천천히 구분하세요.", meaning: "익숙한 길도 낯설게 보이는 안개 같은 시기입니다. 예민해진 감각은 깊은 마음을 보여주지만 결론은 충분한 확인 뒤에 내려야 합니다.", positive: "꿈과 직관을 통해 숨겨진 감정을 이해할 수 있습니다.", caution: "불안을 사실로 단정하거나 모호한 말에 휩쓸리지 마세요.", advice: "느낌을 존중하되 중요한 판단은 정보를 더 확인한 뒤 하세요.", positivity: 45 },
  { name: "태양", symbol: "☀", keywords: ["기쁨", "활력", "명료함"], message: "분명해진 마음으로 기쁨과 성과를 나누세요.", meaning: "따뜻한 자신감과 선명한 이해가 삶을 밝힙니다. 숨길 것 없는 태도로 사람들과 연결될 때 성취의 기쁨이 커집니다.", positive: "활력과 낙관이 좋은 결과와 관계를 이끌어 냅니다.", caution: "자신감이 타인의 속도나 어려움을 가볍게 여기지 않게 하세요.", advice: "잘된 일을 충분히 기뻐하고 도움을 준 사람과 나누세요.", positivity: 95 },
  { name: "심판", symbol: "♬", keywords: ["각성", "결단", "회복"], message: "지난 경험의 부름을 듣고 새로운 선택으로 응답하세요.", meaning: "지나온 시간을 이해하며 더 큰 관점에서 자신을 바라보게 됩니다. 후회보다 배움을 선택할 때 오래 미룬 결단을 내릴 수 있습니다.", positive: "과거를 통합하고 진정 원하는 방향으로 다시 일어설 수 있습니다.", caution: "자기비판이나 남의 평가에 갇혀 부름을 외면하지 마세요.", advice: "반복해서 돌아오는 과제가 무엇을 요구하는지 답해 보세요.", positivity: 74 },
  { name: "세계", symbol: "◯", keywords: ["완성", "통합", "성취"], message: "긴 여정의 결실을 온전히 받아들이고 다음 원을 준비하세요.", meaning: "여러 경험이 하나의 의미로 연결되며 중요한 주기가 완성됩니다. 성취를 충분히 인정하면 더 넓은 단계로 자연스럽게 나아갈 수 있습니다.", positive: "노력의 결실과 충만한 완성감을 누릴 수 있습니다.", caution: "완벽한 마무리에 집착해 이미 이룬 것을 축소하지 마세요.", advice: "여정을 돌아보며 배운 것과 감사한 것을 분명히 남기세요.", positivity: 96 },
];

const suits: Record<Suit, { name: string; symbol: string; theme: string; strength: string; caution: string }> = {
  wands: { name: "완드", symbol: "♨", theme: "열정과 실행", strength: "용기 있는 추진력", caution: "조급함과 과열" },
  cups: { name: "컵", symbol: "♧", theme: "감정과 관계", strength: "마음을 나누는 공감", caution: "감정에 휩쓸림" },
  swords: { name: "소드", symbol: "†", theme: "생각과 판단", strength: "진실을 가르는 명료함", caution: "날카로운 말과 과도한 걱정" },
  pentacles: { name: "펜타클", symbol: "⬟", theme: "현실과 기반", strength: "꾸준히 쌓는 안정감", caution: "소유와 결과에 대한 집착" },
};

const ranks: Record<Rank, { name: string; keywords: [string, string, string]; phase: string; action: string; score: number }> = {
  ace: { name: "에이스", keywords: ["씨앗", "기회", "출발"], phase: "새로운 가능성이 막 싹트는 순간", action: "작더라도 분명한 첫걸음을 내딛기", score: 80 },
  "2": { name: "2", keywords: ["교감", "선택", "균형"], phase: "두 방향이나 두 사람이 서로를 비추는 순간", action: "차이를 살피며 균형점을 찾기", score: 74 },
  "3": { name: "3", keywords: ["확장", "협력", "표현"], phase: "혼자 시작한 일이 관계 속에서 넓어지는 단계", action: "아이디어를 나누고 함께 구체화하기", score: 78 },
  "4": { name: "4", keywords: ["안정", "경계", "유지"], phase: "지금까지 만든 토대를 지키고 쉬어 가는 단계", action: "안정과 정체 사이의 차이를 점검하기", score: 62 },
  "5": { name: "5", keywords: ["긴장", "변화", "도전"], phase: "익숙한 질서가 흔들리며 갈등이 드러나는 구간", action: "갈등의 핵심을 분리해 한 가지씩 다루기", score: 34 },
  "6": { name: "6", keywords: ["회복", "조화", "이동"], phase: "거친 흐름을 지나 균형을 되찾는 과정", action: "도움을 주고받으며 다음 자리로 이동하기", score: 72 },
  "7": { name: "7", keywords: ["점검", "의지", "선별"], phase: "여러 가능성 속에서 진짜 가치를 가려내는 때", action: "우선순위를 세우고 선택을 지켜내기", score: 58 },
  "8": { name: "8", keywords: ["속도", "숙련", "전개"], phase: "반복한 노력이 탄력을 얻어 빠르게 전개되는 단계", action: "집중을 유지하며 완성도를 높이기", score: 76 },
  "9": { name: "9", keywords: ["성숙", "인내", "결실"], phase: "완성을 앞두고 경험의 무게를 확인하는 시점", action: "경계를 지키며 마지막 힘을 현명하게 쓰기", score: 68 },
  "10": { name: "10", keywords: ["완결", "책임", "전환"], phase: "한 주기가 가득 차 결과와 부담이 함께 나타나는 순간", action: "완료할 것과 내려놓을 것을 구분하기", score: 55 },
  page: { name: "시종", keywords: ["호기심", "소식", "배움"], phase: "낯선 세계를 호기심으로 배우기 시작하는 때", action: "서툶을 두려워하지 말고 질문하기", score: 70 },
  knight: { name: "기사", keywords: ["행동", "추구", "전진"], phase: "원하는 것을 향해 행동력이 강해지는 구간", action: "속도와 방향을 함께 점검하며 전진하기", score: 73 },
  queen: { name: "여왕", keywords: ["수용", "성숙", "돌봄"], phase: "경험을 내면화해 자신과 주변을 돌보는 단계", action: "직관을 믿고 건강한 환경을 만들기", score: 82 },
  king: { name: "왕", keywords: ["통솔", "완성", "책임"], phase: "축적한 힘을 책임 있게 이끌어야 하는 자리", action: "큰 그림을 보고 일관된 기준으로 결정하기", score: 85 },
};

const suitScoreAdjust: Record<Suit, number> = { wands: 3, cups: 5, swords: -8, pentacles: 1 };

function positionMeanings(cardName: string, theme: string, phase: string): Record<Position, string> {
  return {
    past: `지나온 ${theme}의 경험이 지금의 선택에 배경이 되었습니다. ${cardName}이 보여준 배움을 인정해 보세요.`,
    present: `지금은 ${phase}입니다. ${cardName}의 관점으로 현재의 우선순위를 살펴보세요.`,
    future: `앞으로 ${theme}을 더 성숙하게 다룰 가능성이 열려 있습니다. 서두르지 말고 ${cardName}의 조언을 실천해 보세요.`,
  };
}

const majorCards: TarotCard[] = majorSeeds.map((seed, number) => ({
  ...seed,
  id: `major-${number}`,
  arcana: "major",
  number,
  suit: null,
  rank: null,
  positionMeanings: positionMeanings(seed.name, seed.keywords.join("과 "), "이 카드가 비추는 본질을 마주할 때"),
}));

const minorCards: TarotCard[] = (Object.entries(suits) as [Suit, (typeof suits)[Suit]][]).flatMap(([suit, suitInfo]) =>
  (Object.entries(ranks) as [Rank, (typeof ranks)[Rank]][]).map(([rank, rankInfo]) => {
    const name = `${suitInfo.name} ${rankInfo.name}`;
    const positivity = Math.max(5, Math.min(95, rankInfo.score + suitScoreAdjust[suit]));
    return {
      id: `${suit}-${rank}`,
      name,
      arcana: "minor" as const,
      number: null,
      suit,
      rank,
      symbol: suitInfo.symbol,
      keywords: [rankInfo.keywords[0], rankInfo.keywords[1], suitInfo.theme],
      message: `${suitInfo.theme}의 흐름에서 ${rankInfo.action}에 마음을 기울이세요.`,
      meaning: `${name}은 ${rankInfo.phase}을 보여줍니다. ${suitInfo.theme}을 다룰 때 ${suitInfo.strength}을 살리면 한 단계 더 단단해질 수 있습니다.`,
      positive: `${suitInfo.strength}이 ${rankInfo.keywords[0]}의 가능성을 현실로 이어 줍니다.`,
      caution: `${suitInfo.caution}에 빠지면 ${rankInfo.keywords[1]}의 의미를 놓칠 수 있으니 속도를 조절하세요.`,
      advice: `지금은 ${rankInfo.action}를 실천하고, 결과보다 과정에서 배우는 점을 확인하세요.`,
      positionMeanings: positionMeanings(name, suitInfo.theme, rankInfo.phase),
      positivity,
    };
  }),
);

export const tarotDeck: TarotCard[] = [...majorCards, ...minorCards];

export function validateDeck(deck: TarotCard[]): string[] {
  const errors: string[] = [];
  if (deck.length !== 78) errors.push(`카드 수가 78장이 아닙니다: ${deck.length}장`);
  const ids = new Set(deck.map((card) => card.id));
  if (ids.size !== deck.length) errors.push("중복된 카드 ID가 있습니다.");
  const majors = deck.filter((card) => card.arcana === "major");
  if (majors.length !== 22) errors.push(`메이저 아르카나가 22장이 아닙니다: ${majors.length}장`);
  (Object.keys(suits) as Suit[]).forEach((suit) => {
    const cards = deck.filter((card) => card.suit === suit);
    if (cards.length !== 14) errors.push(`${suits[suit].name} 슈트가 14장이 아닙니다: ${cards.length}장`);
    (Object.keys(ranks) as Rank[]).forEach((rank) => {
      if (!cards.some((card) => card.rank === rank)) errors.push(`${suits[suit].name} ${ranks[rank].name} 카드가 없습니다.`);
    });
  });
  deck.forEach((card) => {
    if (!card.name || !card.message || !card.meaning || !card.positive || !card.caution || !card.advice) errors.push(`${card.id}: 필수 해설이 비어 있습니다.`);
    if (!Number.isInteger(card.positivity) || card.positivity < 0 || card.positivity > 100) errors.push(`${card.id}: 긍정도 점수가 올바르지 않습니다.`);
  });
  return errors;
}

export function shuffleDeck<T>(items: T[]): T[] {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[randomIndex]] = [result[randomIndex], result[index]];
  }
  return result;
}

export function scoreLevel(score: number): "낮음" | "보통" | "높음" {
  if (score < 40) return "낮음";
  if (score < 70) return "보통";
  return "높음";
}

export function trendBetween(from: number, to: number): "상승" | "하락" | "유지" {
  const difference = to - from;
  if (Math.abs(difference) <= 5) return "유지";
  return difference > 0 ? "상승" : "하락";
}

export function summarizeTrend(scores: number[]): string {
  const first = trendBetween(scores[0], scores[1]);
  const second = trendBetween(scores[1], scores[2]);
  return first === "유지" && second === "유지" ? "고른 흐름" : `${first} → ${second}`;
}
