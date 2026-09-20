export type Suit = "wands" | "cups" | "swords" | "pentacles";
export type Rank = "ace" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "page" | "knight" | "queen" | "king";
export type Position = "past" | "present" | "future";
export type CardSymbol = { label: string; meaning: string };

export type TarotCard = {
  id: string;
  name: string;
  arcana: "major" | "minor";
  number: number | null;
  suit: Suit | null;
  rank: Rank | null;
  symbol: string;
  symbols: CardSymbol[];
  keywords: [string, string, string];
  message: string;
  meaning: string;
  positive: string;
  caution: string;
  advice: string;
  positionMeanings: Record<Position, string>;
  positivity: number;
};

type CardSeed = Omit<TarotCard, "id" | "arcana" | "number" | "suit" | "rank" | "symbols" | "positionMeanings">;

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

const majorSymbols: CardSymbol[][] = [
  [{ label: "절벽", meaning: "아직 알 수 없는 세계로 넘어가는 경계와 모험을 나타냅니다." }, { label: "흰 장미와 작은 개", meaning: "순수한 의도와 본능적인 경고가 함께 길을 동행함을 뜻합니다." }],
  [{ label: "위와 아래를 향한 손", meaning: "아이디어를 현실로 이어 주는 의지와 매개를 상징합니다." }, { label: "탁자 위 네 도구", meaning: "감정·생각·열정·현실이라는 삶의 자원이 이미 갖추어져 있음을 보여줍니다." }],
  [{ label: "검은 기둥과 흰 기둥", meaning: "서로 반대되는 힘 사이의 균형과 보이지 않는 경계를 뜻합니다." }, { label: "달과 두루마리", meaning: "직관, 무의식, 아직 완전히 드러나지 않은 지식을 상징합니다." }],
  [{ label: "별의 왕관", meaning: "자연의 주기와 더 큰 질서에 연결된 감각을 나타냅니다." }, { label: "밀밭과 숲", meaning: "돌봄을 통해 자라고 결실을 맺는 풍요를 상징합니다." }],
  [{ label: "돌로 된 왕좌", meaning: "쉽게 흔들리지 않는 질서와 현실적인 기반을 뜻합니다." }, { label: "숫양과 산", meaning: "개척하는 힘, 결단력, 높은 목표를 향한 의지를 상징합니다." }],
  [{ label: "두 개의 열쇠", meaning: "겉과 속, 의식과 무의식의 지혜를 여는 통로를 뜻합니다." }, { label: "두 제자", meaning: "배움이 개인을 넘어 전수되고 공유되는 과정을 나타냅니다." }],
  [{ label: "두 사람과 천사", meaning: "서로를 있는 그대로 마주하는 관계와 더 높은 가치의 축복을 나타냅니다." }, { label: "서로 다른 나무", meaning: "욕망과 지혜, 선택에 따르는 서로 다른 가능성을 상징합니다." }],
  [{ label: "검고 흰 스핑크스", meaning: "서로 다른 욕구와 방향을 한 의지로 이끌어야 함을 뜻합니다." }, { label: "별이 그려진 천막", meaning: "보이지 않는 보호와 더 큰 목적 아래 움직이는 여정을 상징합니다." }],
  [{ label: "여인과 사자", meaning: "거친 본능을 억누르기보다 온화하게 이해하고 다루는 힘을 뜻합니다." }, { label: "무한대 기호", meaning: "지속되는 생명력과 내면의 힘이 마르지 않음을 나타냅니다." }],
  [{ label: "등불", meaning: "어둠 전체가 아니라 바로 다음 걸음을 밝히는 내면의 지혜를 상징합니다." }, { label: "높은 산", meaning: "고독한 탐색 끝에 얻은 성숙과 넓어진 시야를 뜻합니다." }],
  [{ label: "회전하는 바퀴", meaning: "계속 움직이는 주기와 통제할 수 없는 변화를 나타냅니다." }, { label: "네 날개 달린 존재", meaning: "변화 속에서도 유지되는 네 방향의 지혜와 질서를 상징합니다." }],
  [{ label: "저울", meaning: "감정과 사실, 권리와 책임을 고르게 헤아리는 판단을 뜻합니다." }, { label: "곧게 선 검", meaning: "결과를 피하지 않는 명확함과 진실의 힘을 나타냅니다." }],
  [{ label: "거꾸로 매달린 자세", meaning: "익숙한 관점을 뒤집어 전혀 다른 의미를 발견하는 멈춤을 뜻합니다." }, { label: "머리 주위의 빛", meaning: "외적인 정지 속에서 내적인 깨달음이 일어나고 있음을 보여줍니다." }],
  [{ label: "백마를 탄 해골", meaning: "누구도 피할 수 없는 변화와 낡은 형태의 끝을 상징합니다." }, { label: "떠오르는 태양", meaning: "끝 뒤에도 새로운 주기와 생명이 이어짐을 나타냅니다." }],
  [{ label: "두 잔 사이의 물", meaning: "서로 다른 성질을 섞고 조율해 새로운 균형을 만드는 과정을 뜻합니다." }, { label: "물과 땅에 둔 두 발", meaning: "감정과 현실을 동시에 살피는 안정된 태도를 상징합니다." }],
  [{ label: "느슨한 사슬", meaning: "속박이 절대적이라기보다 알아차림을 통해 벗어날 수 있음을 보여줍니다." }, { label: "횃불과 뿔", meaning: "통제되지 않은 욕망과 본능이 가진 강한 에너지를 상징합니다." }],
  [{ label: "번개 맞은 탑", meaning: "잘못 세운 믿음이나 구조가 갑작스러운 진실로 흔들리는 순간을 뜻합니다." }, { label: "떨어지는 왕관", meaning: "영원해 보이던 권위와 확신도 바뀔 수 있음을 나타냅니다." }],
  [{ label: "큰 별과 일곱 별", meaning: "중심이 되는 희망과 그 주위를 이루는 다양한 가능성을 상징합니다." }, { label: "땅과 물에 붓는 물", meaning: "내면과 현실 모두에 회복의 에너지를 나누는 모습을 뜻합니다." }],
  [{ label: "달과 두 탑", meaning: "불확실한 길과 의식의 경계에서 마주하는 두려움을 나타냅니다." }, { label: "개·늑대·가재", meaning: "길들여진 마음, 야생의 본능, 깊은 무의식이 동시에 떠오름을 상징합니다." }],
  [{ label: "커다란 태양", meaning: "숨김없이 드러나는 명료함과 생명력을 뜻합니다." }, { label: "아이와 흰 말", meaning: "꾸밈없는 기쁨, 신뢰, 자유롭게 표현되는 자신을 상징합니다." }],
  [{ label: "나팔을 부는 천사", meaning: "지나온 삶을 돌아보고 더 큰 부름에 응답하는 각성을 나타냅니다." }, { label: "관에서 일어나는 사람들", meaning: "과거의 한계를 넘어 새롭게 깨어나는 회복을 상징합니다." }],
  [{ label: "월계수 화환", meaning: "하나의 주기가 온전히 닫히고 완성되었음을 뜻합니다." }, { label: "네 모서리의 존재", meaning: "삶의 여러 요소가 균형 있게 통합된 상태를 상징합니다." }],
];

const suitSymbols: Record<Suit, CardSymbol> = {
  wands: { label: "싹이 난 지팡이", meaning: "완드는 불의 기운, 열정, 창조력과 행동으로 뻗어 나가는 생명력을 상징합니다." },
  cups: { label: "잔과 물", meaning: "컵은 물의 기운, 감정, 관계와 마음속에서 오가는 교감을 상징합니다." },
  swords: { label: "검과 바람", meaning: "소드는 공기의 기운, 생각, 언어와 진실을 가려내는 판단을 상징합니다." },
  pentacles: { label: "별이 새겨진 동전", meaning: "펜타클은 땅의 기운, 몸, 돈, 일처럼 손에 잡히는 현실과 기반을 상징합니다." },
};

const minorSceneSymbols: Record<Suit, Record<Rank, CardSymbol>> = {
  wands: {
    ace: { label: "구름에서 나온 손", meaning: "아직 형태가 없지만 붙잡을 수 있는 새로운 열정과 가능성을 뜻합니다." }, "2": { label: "성벽과 지구본", meaning: "안전한 자리에서 더 넓은 세계를 내다보며 방향을 고르는 모습을 나타냅니다." }, "3": { label: "바다 위의 배", meaning: "이미 보낸 노력의 결과를 기다리며 더 먼 가능성을 바라봄을 뜻합니다." }, "4": { label: "꽃으로 엮은 네 기둥", meaning: "안전한 울타리 안에서 함께 기쁨을 나누는 안정과 축하를 상징합니다." }, "5": { label: "엇갈린 다섯 지팡이", meaning: "힘과 의견이 한데 뒤섞여 경쟁하거나 조율되는 과정을 나타냅니다." }, "6": { label: "월계관을 쓴 기수", meaning: "노력이 사람들에게 보이고 인정받는 순간을 상징합니다." }, "7": { label: "높은 곳의 한 사람", meaning: "자신의 자리와 신념을 지키기 위해 버티는 태도를 뜻합니다." }, "8": { label: "하늘을 가르는 여덟 지팡이", meaning: "막힘 없이 빠르게 전개되는 소식과 움직임을 나타냅니다." }, "9": { label: "붕대를 두른 인물", meaning: "지친 경험 속에서도 마지막 경계를 지키는 경계심과 끈기를 뜻합니다." }, "10": { label: "한꺼번에 든 지팡이", meaning: "성취를 향한 책임이 지나치게 무거워진 상태를 상징합니다." }, page: { label: "지팡이를 바라보는 시종", meaning: "새로운 열정과 아이디어를 호기심 있게 탐색하는 마음을 뜻합니다." }, knight: { label: "달리는 말", meaning: "열정을 즉시 행동으로 옮기는 속도와 모험심을 나타냅니다." }, queen: { label: "해바라기와 검은 고양이", meaning: "밝은 자신감과 함께 작동하는 독립적인 직관을 상징합니다." }, king: { label: "왕좌의 사자와 도롱뇽", meaning: "불의 힘을 다스려 비전과 책임으로 이끄는 성숙함을 뜻합니다." },
  },
  cups: {
    ace: { label: "넘치는 잔과 비둘기", meaning: "마음이 새롭게 열리고 감정이 풍성하게 흘러들어 오는 순간을 뜻합니다." }, "2": { label: "잔을 마주 든 두 사람", meaning: "서로를 동등하게 바라보며 감정을 주고받는 연결을 상징합니다." }, "3": { label: "함께 들어 올린 세 잔", meaning: "기쁨과 정서적 지지를 공동체와 나누는 모습을 나타냅니다." }, "4": { label: "구름에서 내민 잔", meaning: "새로운 감정의 기회가 곁에 있어도 마음이 닫혀 보지 못할 수 있음을 뜻합니다." }, "5": { label: "엎어진 잔과 남은 잔", meaning: "잃은 것에 시선이 머문 사이 아직 남아 있는 가능성을 상징합니다." }, "6": { label: "꽃이 담긴 잔", meaning: "순수했던 기억, 익숙한 정서와 과거에서 이어진 친밀함을 뜻합니다." }, "7": { label: "구름 위 일곱 잔", meaning: "매혹적인 선택과 상상이 많아 무엇이 진짜인지 흐려진 상태를 나타냅니다." }, "8": { label: "등지고 떠나는 사람", meaning: "채워지지 않는 감정을 뒤로하고 더 깊은 의미를 찾아가는 여정을 뜻합니다." }, "9": { label: "진열된 아홉 잔", meaning: "바라던 만족과 감정적 풍요를 누리는 모습을 상징합니다." }, "10": { label: "무지개와 가족", meaning: "개인의 기쁨이 관계와 공동체의 조화로 넓어지는 상태를 뜻합니다." }, page: { label: "잔에서 나온 물고기", meaning: "예상하지 못한 감정과 직관의 메시지가 떠오르는 순간을 나타냅니다." }, knight: { label: "잔을 든 기수", meaning: "마음속 이상과 진심을 관계나 제안의 형태로 전하는 모습을 뜻합니다." }, queen: { label: "뚜껑이 닫힌 화려한 잔", meaning: "쉽게 드러나지 않는 깊은 감정과 내면의 상상력을 상징합니다." }, king: { label: "파도 위의 왕좌", meaning: "감정의 움직임 속에서도 중심을 잃지 않는 성숙한 태도를 뜻합니다." },
  },
  swords: {
    ace: { label: "왕관을 꿰뚫는 검", meaning: "혼란을 가르고 드러나는 새로운 생각과 명확한 진실을 뜻합니다." }, "2": { label: "눈가리개와 교차한 검", meaning: "판단을 미룬 채 서로 다른 생각 사이에서 균형을 유지하는 상태를 나타냅니다." }, "3": { label: "세 검이 꽂힌 심장", meaning: "말과 인식이 마음에 남기는 아픔을 직접적으로 상징합니다." }, "4": { label: "누워 있는 인물", meaning: "생각의 소음을 멈추고 회복을 위해 물러난 시간을 뜻합니다." }, "5": { label: "검을 거둔 승자", meaning: "이겼더라도 관계나 신뢰를 잃을 수 있는 갈등의 여운을 나타냅니다." }, "6": { label: "검을 실은 배", meaning: "지난 생각과 경험을 품은 채 더 잔잔한 곳으로 이동하는 과정을 뜻합니다." }, "7": { label: "검을 들고 빠져나가는 인물", meaning: "정면 대결 대신 전략과 은밀한 판단을 택하는 모습을 나타냅니다." }, "8": { label: "느슨한 결박과 검의 울타리", meaning: "생각이 만든 제한은 단단해 보여도 움직일 여지가 남아 있음을 뜻합니다." }, "9": { label: "침대 위의 인물", meaning: "밖의 사건보다 머릿속 걱정이 더 크게 자란 밤을 상징합니다." }, "10": { label: "열 개의 검과 새벽", meaning: "한 생각이나 상황이 끝까지 소진된 뒤 새로운 빛이 다가옴을 뜻합니다." }, page: { label: "바람 속에 든 검", meaning: "주변의 변화를 예민하게 읽으며 새로운 생각을 시험하는 태도를 나타냅니다." }, knight: { label: "돌진하는 기수", meaning: "확신한 생각을 망설임 없이 밀어붙이는 속도를 상징합니다." }, queen: { label: "검과 열린 손", meaning: "명확한 기준을 세우면서도 진실을 들을 준비가 된 태도를 뜻합니다." }, king: { label: "곧게 든 검", meaning: "감정에 흔들리지 않고 원칙과 이성으로 판단하는 권위를 나타냅니다." },
  },
  pentacles: {
    ace: { label: "정원 위의 동전", meaning: "손에 잡히는 기회가 현실에 뿌리내릴 수 있는 씨앗임을 뜻합니다." }, "2": { label: "무한대 끈과 두 동전", meaning: "변하는 상황 속에서 여러 현실적 요구를 유연하게 조율하는 모습을 나타냅니다." }, "3": { label: "성당 안 세 사람", meaning: "서로 다른 기술과 역할이 협력해 하나의 결과를 만드는 과정을 뜻합니다." }, "4": { label: "몸에 붙든 네 동전", meaning: "안전을 지키려는 마음이 소유와 통제로 굳어질 수 있음을 상징합니다." }, "5": { label: "눈 속의 두 사람과 창문", meaning: "어려움과 결핍 속에서도 도움과 소속의 빛이 가까이 있음을 나타냅니다." }, "6": { label: "저울과 나누는 동전", meaning: "주고받는 자원의 균형과 그 안에 생기는 힘의 차이를 뜻합니다." }, "7": { label: "동전이 열린 덩굴", meaning: "성장에는 시간이 필요하며 중간에 결과를 살펴보는 인내를 상징합니다." }, "8": { label: "동전을 새기는 장인", meaning: "반복과 집중을 통해 기술과 결과가 조금씩 완성되는 과정을 뜻합니다." }, "9": { label: "포도밭과 매", meaning: "오래 가꾼 기반 위에서 누리는 독립성과 절제된 풍요를 나타냅니다." }, "10": { label: "가족과 열 개의 동전", meaning: "개인의 성취가 세대와 공동체에 이어지는 안정된 기반을 뜻합니다." }, page: { label: "동전을 바라보는 시종", meaning: "현실적인 가능성을 천천히 관찰하고 배우려는 태도를 나타냅니다." }, knight: { label: "멈춰 선 말과 밭", meaning: "빠르지 않아도 맡은 일을 꾸준히 이어가는 성실함을 상징합니다." }, queen: { label: "정원과 토끼", meaning: "현실을 돌보는 능력과 자연스럽게 자라는 풍요를 뜻합니다." }, king: { label: "포도덩굴과 황소", meaning: "축적한 자원을 안정적으로 다스리는 힘과 물질적 성취를 나타냅니다." },
  },
};

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
  symbols: majorSymbols[number],
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
      symbols: [suitSymbols[suit], minorSceneSymbols[suit][rank]],
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
    if (!card.symbols || card.symbols.length < 2 || card.symbols.some((item) => !item.label || !item.meaning)) errors.push(`${card.id}: 그림 속 상징 해설이 부족합니다.`);
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
