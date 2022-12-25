const jsonfile = require('jsonfile')

const update = jsonfile.readFileSync('update.json')

const { target, promotion, reset } = update

const members = jsonfile.readFileSync(`${target}.json`)
jsonfile.writeFileSync(`${target}_backup.json`, members)
console.log('백업 생성 완료')

for (let resetMember of reset) {
  const idx = members.findIndex((member) => member.name === resetMember)

  const member = members[idx]

  if (!member) throw new Error('초기화 문제 발생!', resetMember)

  const previousRatio = members[idx].ratio
  const resetRatio = member.prefix ? 2 : 1

  member.ratio = resetRatio

  console.log(`${resetMember}: ${previousRatio} -> ${resetRatio}`)
}

console.log(`초기화 인원: `, reset.length)

const targetRatios = Object.keys(promotion)

for (let targetRatio of targetRatios) {
  const targetMembers = promotion[targetRatio]

  for (let targetMember of targetMembers) {
    const idx = members.findIndex((member) => member.name === targetMember)

    const member = members[idx]

    if (!member)
      throw new Error('업데이트 문제 발생!', resetMember, targetRatio)

    const previousRatio = members[idx].ratio

    member.ratio = targetRatio

    console.log(`${targetMember}: ${previousRatio} -> ${targetRatio}`)
  }

  console.log(`승급 인원: `, `x${targetRatio}`, targetMembers.length)
}

jsonfile.writeFileSync(`${target}.json`, members)

console.log('업데이트 완료!')
