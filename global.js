// major: 메인 기능 변동
// minor: 사소한 기능 변동
// patch1: 버그 픽스
// patch2: 멤버 변경(로컬에서)
const appVersion = '2.3.0'

const reward = {
  // 유물 전장
  dingo: '딩고 호박',
  blackDye: '블랙 염색약',
  amuletDollCombinationBox: '신묘한 액막이 인형 조합 상자',

  // 킹덤 던전
  increaseWood: '인크리스 우드',
  increaseFire: '인크리스 파이어',

  // 킹덤 디펜스
  advancedSkillBook: '고급 스킬북',
  advancedMagicPage1: '고급 마법 페이지 I - 6장',
  reversalChance: '리버설 찬스',

  // 왕위 쟁탈전
  throneSkillBook: '왕성 스킬북 상자',
  darkMagicCrystal100: '흑마법 결정 100개',
  blackRidingDye: '블랙 탈 것 염색약',
  amuletDoll: '신묘한 액막이 인형',

  // 킹덤 침공전
  ivoryRidingDye: '아이보리 탈 것 염색약',

  // 수도 마스터 잡화점
  releasementScroll: '봉인 해제 주문서',
}

// for background-color, color
const productType = {
  normal: 'normal',
  light: 'light',
  dark: 'dark',
  fire: 'fire',
  water: 'water',
  tree: 'tree',
  normal_ivory: 'normal_ivory',
  hotpink: 'hotpink',
}

const group = {
  dingo: 'dingo',
  blackDye: 'blackDye',
  amuletDollCombinationBox: 'amuletDollCombinationBox',

  increaseWood: 'increaseWood',
  increaseFire: 'increaseFire',

  advancedPages: 'advancedPages', // 고급 페이지 실패
  advancedSkillBook: 'advancedSkillBook', // 고급 스킬북
  reversalChance: 'reversalChance',

  throneSkillBook: 'throneSkillBook',
  darkMagicCrystal100: 'darkMagicCrystal100',
  blackRidingDye: 'blackRidingDye',
  amuletDoll: 'amuletDoll',

  ivoryRidingDye: 'ivoryRidingDye',

  releasementScroll: 'releasementScroll',
}

const groupIcon = {
  dingo: 'assets/items/dingo.png',
  blackDye: 'assets/items/black_dye.png',
  amuletDollCombinationBox: 'assets/items/amulet_doll_combination_box.png',

  increaseWood: 'assets/items/normal_skill_book.png',
  increaseFire: 'assets/items/normal_skill_book.png',

  advancedPages: 'assets/items/skill_book_box.png',
  advancedSkillBook: 'assets/items/skill_book_box.png',
  reversalChance: 'assets/items/normal_skill_book.png',

  throneSkillBook: 'assets/items/throne_skill_book_box.png',
  darkMagicCrystal100: 'assets/items/dark_magic_crystal.png',
  blackRidingDye: 'assets/items/black_riding_dye.png',
  amuletDoll: 'assets/items/amulet_doll.png',

  ivoryRidingDye: 'assets/items/ivory_riding_dye.png',

  releasementScroll: 'assets/items/releasement_scroll.png',
}

const products = [
  {
    name: '유물 전장 승리: 딩고 호박 2개',
    rewards: [reward.dingo, reward.dingo],
    type: productType.normal,
    group: group.dingo,
    isSpecial: true,
    line: 0,
  },
  {
    name: '유물 전장 승리: 블랙 염색약 2개',
    rewards: [reward.blackDye, reward.blackDye],
    type: productType.normal,
    group: group.blackDye,
    isSpecial: false,
    line: 0,
  },
  {
    name: '유물 전장 승리: 신묘한 액막이 인형 조합 상자 2개',
    rewards: [reward.amuletDollCombinationBox, reward.amuletDollCombinationBox],
    type: productType.normal,
    group: group.amuletDollCombinationBox,
    isSpecial: false,
    line: 0,
  },
  {
    name: '유물 전장 패배: 딩고 호박',
    rewards: [reward.dingo],
    type: productType.normal,
    group: group.dingo,
    isSpecial: true,
    line: 1,
  },
  {
    name: '유물 전장 패배: 신묘한 액막이 인형 조합 상자',
    rewards: [reward.amuletDollCombinationBox],
    type: productType.normal,
    group: group.amuletDollCombinationBox,
    isSpecial: false,
    line: 1,
  },

  {
    name: '킹덤 디펜스 6단계 승리: 고급 스킬북',
    rewards: [reward.advancedSkillBook],
    type: productType.light,
    group: group.advancedSkillBook,
    isSpecial: false,
    line: 2,
  },
  {
    name: '킹덤 디펜스 6단계 승리: 리버설 찬스',
    rewards: [reward.reversalChance],
    type: productType.light,
    group: group.reversalChance,
    isSpecial: false,
    line: 2,
  },
  {
    name: '킹덤 디펜스 6단계 패배: 고급 마법 페이지 I 6장',
    rewards: [reward.advancedMagicPage1],
    type: productType.light,
    group: group.advancedPages,
    isSpecial: false,
    line: 2,
  },

  {
    name: '엔트 석상 4단계: 인크리스 우드',
    rewards: [reward.increaseWood],
    type: productType.tree,
    group: group.increaseWood,
    isSpecial: false,
    line: 3,
  },
  {
    name: '엔트 석상 5단계: 인크리스 우드 2권',
    rewards: [reward.increaseWood, reward.increaseWood],
    type: productType.tree,
    group: group.increaseWood,
    isSpecial: false,
    line: 3,
  },
  {
    name: '엔트 석상 6단계: 인크리스 우드 2권',
    rewards: [reward.increaseWood, reward.increaseWood],
    type: productType.tree,
    group: group.increaseWood,
    isSpecial: false,
    line: 3,
  },

  {
    name: '화염의 기사 라스 4단계: 인크리스 파이어',
    rewards: [reward.increaseFire],
    type: productType.fire,
    group: group.increaseFire,
    isSpecial: false,
    line: 4,
  },
  {
    name: '화염의 기사 라스 5단계: 인크리스 파이어 2권',
    rewards: [reward.increaseFire, reward.increaseFire],
    type: productType.fire,
    group: group.increaseFire,
    isSpecial: false,
    line: 4,
  },
  {
    name: '화염의 기사 라스 6단계: 인크리스 파이어 2권',
    rewards: [reward.increaseFire, reward.increaseFire],
    type: productType.fire,
    group: group.increaseFire,
    isSpecial: false,
    line: 4,
  },

  {
    name: '왕위 쟁탈전 승리: 왕성 스킬북 상자',
    rewards: [reward.throneSkillBook],
    type: productType.normal,
    group: group.throneSkillBook,
    isSpecial: true,
    line: 5,
  },
  {
    name: '왕위 쟁탈전 승리: 신묘한 액막이 인형 4개',
    rewards: [
      reward.amuletDoll,
      reward.amuletDoll,
      reward.amuletDoll,
      reward.amuletDoll,
    ],
    type: productType.normal,
    group: group.amuletDoll,
    isSpecial: true,
    line: 5,
  },
  {
    name: '왕위 쟁탈전 승리: 흑마법 결정 100개 x 2',
    rewards: [reward.darkMagicCrystal100, reward.darkMagicCrystal100],
    type: productType.normal,
    group: group.darkMagicCrystal100,
    isSpecial: false,
    line: 5,
  },
  {
    name: '왕위 쟁탈전 승리: 블랙 탈 것 염색약 2개',
    rewards: [reward.blackRidingDye, reward.blackRidingDye],
    type: productType.normal,
    group: group.blackRidingDye,
    isSpecial: false,
    line: 5,
  },
  {
    name: '왕위 쟁탈전 패배: 왕성 스킬북 상자 2권',
    rewards: [reward.throneSkillBook, reward.throneSkillBook],
    type: productType.normal,
    group: group.throneSkillBook,
    isSpecial: true,
    line: 6,
  },
  {
    name: '왕위 쟁탈전 패배: 신묘한 액막이 인형 2개',
    rewards: [reward.amuletDoll, reward.amuletDoll],
    type: productType.normal,
    group: group.amuletDoll,
    isSpecial: true,
    line: 6,
  },
  {
    name: '왕위 쟁탈전 패배: 흑마법 결정 100개',
    rewards: [reward.darkMagicCrystal100],
    type: productType.normal,
    group: group.darkMagicCrystal100,
    isSpecial: false,
    line: 6,
  },
  {
    name: '왕위 쟁탈전 패배: 블랙 탈 것 염색약',
    rewards: [reward.blackRidingDye],
    type: productType.normal,
    group: group.blackRidingDye,
    isSpecial: false,
    line: 6,
  },
  {
    name: '킹덤 침공전 승리: 아이보리 탈 것 염색약 2개',
    rewards: [reward.ivoryRidingDye, reward.ivoryRidingDye],
    type: productType.normal_ivory,
    group: group.ivoryRidingDye,
    isSpecial: false,
    line: 7,
  },
  {
    name: '킹덤 침공전 패배: 아이보리 탈 것 염색약',
    rewards: [reward.ivoryRidingDye],
    type: productType.normal_ivory,
    group: group.ivoryRidingDye,
    isSpecial: false,
    line: 7,
  },
  {
    name: '수도 마스터 잡화점: 봉인 해제 주문서 2개',
    rewards: [reward.releasementScroll, reward.releasementScroll],
    type: productType.hotpink,
    group: group.releasementScroll,
    isSpecial: true,
    line: 8,
  },
].map((p, idx) => ({ ...p, id: idx + 1 }))
