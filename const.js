// major: 메인 기능 변동
// minor: 사소한 기능 변동
// patch1: 버그 픽스
// patch2: 멤버 변경(로컬에서)
const appVersion = '3.2.2'

const kingdomName = 'Ribbon&Cotton'

const KINGDOM_RIBBON = {
  code: 'KINGDOM_RIBBON',
  name: 'Rlbbon',
}
const KINGDOM_COTTON = {
  code: 'KINGDOM_COTTON',
  name: 'Cotton',
}

let members = []

async function getMembers() {
  if (members?.length) return members

  const ribbon = (await axios.get('./kingdom_ribbon.json')).data
  const cotton = (await axios.get('./kingdom_cotton.json')).data

  members = [...ribbon, ...cotton]
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

  console.log(members)

  return members
}

getMembers()
