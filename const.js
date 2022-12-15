const kingdomName = 'Ribbon'

const members = [
  // 운영진 7명
  { name: '단밤', ratio: 2, prefix: '★' },
  { name: '주녕코', ratio: 2, prefix: '☆' },
  { name: '리망', ratio: 2, prefix: '☆' },
  { name: '휴퓨', ratio: 2, prefix: '☆' },
  { name: '구름빛블루베리', ratio: 2, prefix: '☆' },
  { name: '꾸우루밍', ratio: 2, prefix: '☆' },
  { name: '김쨩아', ratio: 2, prefix: '☆' },

  // 일반 킹덤원 42명
  { name: 'HyunA', ratio: 1, prefix: '' },
  { name: '유한량', ratio: 1, prefix: '' },
  { name: '유기농브로콜리', ratio: 1, prefix: '' },
  { name: '킴과자', ratio: 1, prefix: '' },
  { name: '닐라바닐라', ratio: 1, prefix: '' },
  { name: '다솜다솜', ratio: 1, prefix: '' },
  { name: '밍공이', ratio: 1, prefix: '' },
  { name: '삐누', ratio: 1, prefix: '' },
  { name: '레미마르', ratio: 1, prefix: '' },
  { name: '므s', ratio: 1, prefix: '' },
  { name: '루다퀸', ratio: 1, prefix: '' },
  { name: '몽뭉몽뭉잉', ratio: 1, prefix: '' },
  { name: '맛깔고등어로버프', ratio: 1, prefix: '' },
  { name: '춤추는나무', ratio: 1, prefix: '' },
  { name: '아이솔칸', ratio: 1, prefix: '' },
  { name: '아기하양', ratio: 1, prefix: '' },
  { name: '망고띠', ratio: 1, prefix: '' },
  { name: 'HOWL하울', ratio: 1, prefix: '' },
  { name: '나랑고양이', ratio: 1, prefix: '' },
  { name: '슈슈베리', ratio: 1, prefix: '' },
  { name: '규일이', ratio: 1, prefix: '' },
  { name: '때리지마라', ratio: 1, prefix: '' },
  { name: '햇사리', ratio: 1, prefix: '' },
  { name: '아기까망', ratio: 1, prefix: '' },
  { name: '유기농고사리', ratio: 1, prefix: '' },
  { name: '츄퓨', ratio: 1, prefix: '' },
  { name: '츄뚱이', ratio: 1, prefix: '' },
  { name: '어머', ratio: 1, prefix: '' },
  { name: '행복이숑', ratio: 1, prefix: '' },
  { name: '하미또', ratio: 1, prefix: '' },
  { name: '김은님', ratio: 1, prefix: '' },
  { name: '단밤찐빵', ratio: 1, prefix: '' },
  { name: '옥봉팔', ratio: 1, prefix: '' },
  { name: '르미르르미', ratio: 1, prefix: '' },
  { name: '희네입니다', ratio: 1, prefix: '' },
  { name: '소금맛아이스', ratio: 1, prefix: '' },
  { name: '초원의초밥', ratio: 1, prefix: '' },
  { name: '복수의망치', ratio: 1, prefix: '' },
  { name: '김주요', ratio: 1, prefix: '' },
  { name: 'ESNA', ratio: 1, prefix: '' },
  { name: '명탐정밍또지', ratio: 1, prefix: '' },
  { name: '클린아티', ratio: 1, prefix: '' },
  { name: '505호', ratio: 1, prefix: '' },
]
  .sort((a, b) => {
    const patternNumber = /[0-9]/
    const patternAlphabet = /[a-zA-Z]/
    const patternHangul = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/

    const orderLevelDesc = [patternAlphabet, patternHangul, patternNumber]

    const getLevel = (s) => {
      const index = orderLevelDesc.findIndex((pattern) => pattern.test(s))
      return index
    }

    const aLevel = getLevel(a.name.charAt(0))
    const bLevel = getLevel(b.name.charAt(0))
    if (aLevel === bLevel) {
      return a.name.charCodeAt(0) - b.name.charCodeAt(0)
    }
    return bLevel - aLevel
  })
  .map((m, idx) => ({
    ...m,
    id: idx + 1,
    rewards: [],
  }))
