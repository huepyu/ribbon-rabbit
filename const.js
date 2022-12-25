const kingdomName = 'RIbbon'

const RIBBON_D = {
  code: 'RIBBON_D',
  name: 'Rlbbon 단밤반',
}
const RIBBON_N = {
  code: 'RIBBON_N',
  name: 'RIbbon 녕코반',
}

// const ribbonD = jsonfile.readFileSync('./ribbon_d.json')
// const ribbonN = jsonfile.readFileSync('./ribbon_n.json')

let members = []

async function getMembers() {
  if (members?.length) return members

  const ribbonD = (await axios.get('./ribbon_d.json')).data
  const ribbonN = (await axios.get('./ribbon_n.json')).data

  members = [...ribbonD, ...ribbonN]
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

  return members
}

getMembers()
