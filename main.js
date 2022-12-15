const STORAGE_KEY = 'STORAGE_KEY'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-wrapper">
          <h1>오류가 난건 단밤님 때문이야</h1>
        </div>
      )
    }

    return this.props.children
  }
}

function App() {
  const [step, setStep] = React.useState(1)
  const [state, setState] = React.useState(createNewState())
  const [hasUpdated, setHasUpdated] = React.useState(false)

  function reset(e) {
    e.preventDefault()
    sessionStorage.clear()
    setState(createNewState())
    setHasUpdated(false)
    setStep(1)
  }

  function createNewState() {
    return {
      products: [],
      productsMembersMap: {},
      members: members.map((m) => ({
        ...m,
        stack: 0,
        rewards: [],
      })),
      // 당첨자
      drawers: [],
      // 불참자
      absentees: [],
      // 특별 보상 당첨자,
      specialDrawers: [],
      appVersion,
    }
  }

  React.useEffect(() => {
    const state = JSON.parse(sessionStorage.getItem(STORAGE_KEY))
    if (state) {
      setState(state)
      if (appVersion !== state.appVersion) {
        setHasUpdated(true)
      }
    }
  }, [])

  const goNext = React.useCallback(
    (e) => {
      e.preventDefault()
      if (step !== 5) {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state))
        setStep((v) => v + 1)
      }
    },
    [state, step],
  )

  function goBack(e) {
    e.preventDefault()
    if (step !== 1) {
      setStep((v) => v - 1)
    }
  }

  function getStepText() {
    switch (step) {
      case 1:
        return '상품 선택 단계'
      case 2:
        return '불참자 선택 단계'
      case 3:
        return '추첨 대상 선별 단계'
      case 4:
        return '추첨 단계'
      case 5:
        return '추첨 결과'
    }
  }

  return (
    <ErrorBoundary>
      <>
        {!hasUpdated && (
          <div className="root-title">
            <button
              className="title-btn back-btn"
              disabled={step === 1}
              onClick={goBack}
            >
              뒤로
            </button>
            <div className="title-wrapper">
              <p className="title-text">
                {kingdomName} 행운상점 추첨 <span>by 휴퓨</span>
              </p>
              <p className="title-step">{getStepText()}</p>
            </div>
            <button className="title-btn reset-btn" onClick={reset}>
              초기화
            </button>
          </div>
        )}
        {hasUpdated && (
          <div className="root-title has-updated">
            <div className="title-updated-wrapper">
              <span className="title-updated-text">
                업데이트가 완료되었습니다. 반드시 초기화 후 진행해주세요.
              </span>
              <button className="title-btn reset-btn" onClick={reset}>
                초기화
              </button>
            </div>
          </div>
        )}
      </>
      <div className="root-content">
        {step === 1 && (
          <Step1 goNext={goNext} state={state} setState={setState} />
        )}
        {step === 2 && (
          <Step2 goNext={goNext} state={state} setState={setState} />
        )}
        {step === 3 && (
          <Step3 goNext={goNext} state={state} setState={setState} />
        )}
        {step === 4 && (
          <Step4 goNext={goNext} state={state} setState={setState} />
        )}
        {step === 5 && <Step5 state={state} setState={setState} />}
      </div>
    </ErrorBoundary>
  )
}

// 스텝 1: 상품 등록 단계
function Step1({ goNext, state, setState }) {
  const leftRef = React.useRef(null)

  const step1Products = React.useMemo(() => {
    const productsByLine = []

    let previousLine = null
    let currentLineProducts = []
    products.forEach((product, idx) => {
      if (previousLine !== product.line) {
        if (previousLine !== null) {
          productsByLine.push(currentLineProducts)
        }
        currentLineProducts = []
        previousLine = product.line
      }
      currentLineProducts.push(product)

      if (idx === products.length - 1) {
        productsByLine.push(currentLineProducts)
      }
    })
    return productsByLine
  }, [])

  function addProduct(e, product) {
    e.preventDefault()
    setState((v) => ({
      ...v,
      products: [...v.products, product],
    }))
    setTimeout(() => {
      leftRef.current.scrollTop = leftRef.current.scrollHeight
    }, 50)
  }

  function deleteProduct(e, idx) {
    e.preventDefault()
    setState((v) => ({
      ...v,
      products: [...v.products.slice(0, idx), ...v.products.slice(idx + 1)],
    }))
  }

  return (
    <div className="step">
      <div className="main">
        <div className="s1-left" ref={leftRef}>
          <p className="s1-our-products-title">행운 상점 추첨 순서</p>
          <p className="s1-delete-desc">클릭 시 삭제됩니다.</p>
          {state.products.map((p, idx) => (
            <div
              key={idx}
              className="s1-our-product"
              onClick={(e) => deleteProduct(e, idx)}
            >
              {p.name}
              {p.rewards.map((r, idx) => (
                <p key={idx} className="s1-product-reward">
                  {r}
                </p>
              ))}
            </div>
          ))}
        </div>
        <div className="s1-right">
          <p className="s1-right-title">
            오늘 행운 상점의 상품을 순서대로 골라주세요.
          </p>
          {step1Products.map((lineProducts, lineIdx) => {
            return (
              <div className="s1-products-grid" key={lineIdx}>
                {lineProducts.map((p) => (
                  <div
                    key={p.id}
                    className={`s1-product ${p.type}`}
                    onClick={(e) => addProduct(e, p)}
                  >
                    <p className="s1-product-title">{p.name}</p>
                    {p.rewards.map((r, idx) => (
                      <p key={idx} className="s1-product-reward">
                        {r}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            )
          })}

          {/* <div className="s1-products-grid">
            {step1Products.map((p) => (
              <div
                key={p.id}
                className={`s1-product ${p.type}`}
                onClick={(e) => addProduct(e, p)}
              >
                <p className="s1-product-title">{p.name}</p>
                {p.rewards.map((r, idx) => (
                  <p key={idx} className="s1-product-reward">
                    {r}
                  </p>
                ))}
              </div>
            ))}
          </div> */}
        </div>
      </div>
      <button
        className="next-btn"
        disabled={!state.products.length}
        onClick={goNext}
      >
        저장 및 다음 단계
      </button>
    </div>
  )
}

// 스텝 2: 불참자 선택 단계
function Step2({ goNext, state, setState }) {
  const [absentees, setAbsentees] = React.useState(
    members.map((m) => ({
      ...m,
      target: state.absentees.includes(m.id),
    })),
  )

  function toggleAbsentee(e, id) {
    e.preventDefault()

    setState((v) => {
      let absentees = v.absentees

      if (absentees.includes(id)) {
        absentees = absentees.filter((v) => !(v === id))
      } else {
        absentees.push(id)
      }

      return {
        ...v,
        absentees,
      }
    })

    setAbsentees((v) => {
      return v.map((m) => {
        if (m.id !== id) return m

        return {
          ...m,
          target: !m.target,
        }
      })
    })
  }

  return (
    <div className="step">
      <div className="main s2-wrapper">
        <div className="s4-absentees">
          <div className="s2-absentees-grid">
            {absentees.map((a) => {
              return (
                <div
                  key={a.id}
                  className={`s2-absentee ${
                    a.target ? 's2-absentee-target' : ''
                  }`}
                  onClick={(e) => toggleAbsentee(e, a.id)}
                >
                  <p>{a.name}</p>
                  {a.target && <p className="s2-absentee-text">불참자</p>}
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <button className="next-btn" onClick={goNext}>
        저장 및 다음 단계
      </button>
    </div>
  )
}

// 스텝 3: 인원 선별 단계
function Step3({ goNext, state, setState }) {
  const groupSetRef = React.useRef(new Set())
  const [dups] = React.useState(() => {
    const list = state.products.map((p) => {
      const group = p.group
      if (groupSetRef.current.has(group)) {
        return true
      }
      groupSetRef.current.add(group)
      return false
    })
    return list
  })

  const [selectMap, setSelectMap] = React.useState(() => {
    return state.products.map((_p, idx) => {
      const cloneTargets = state.products.filter(
        (_, pidx) => pidx !== idx && !dups[pidx],
      )
      return {
        value: 'default',
        cloneTargets,
      }
    })
  })

  React.useEffect(() => {
    const productsMembersMap = {}

    for (let group of groupSetRef.current) {
      productsMembersMap[group] = members
        .filter((m) => !state.absentees.includes(m.id))
        .map((m) => {
          const target =
            state.productsMembersMap?.[group]?.find((v) => v.id === m.id)
              ?.target ?? true

          return {
            ...m,
            target,
          }
        })
    }

    setState((v) => ({
      ...v,
      productsMembersMap,
    }))
  }, [])

  function setAll(e, group, include) {
    e.preventDefault()

    setState((v) => ({
      ...v,
      productsMembersMap: {
        ...v.productsMembersMap,
        [group]: v.productsMembersMap[group].map((m) => ({
          ...m,
          target: include,
        })),
      },
    }))
  }

  function toggleTarget(e, group, mid) {
    e.stopPropagation()
    e.preventDefault()

    setState((v) => ({
      ...v,
      productsMembersMap: {
        ...v.productsMembersMap,
        [group]: v.productsMembersMap[group].map((m, idx) => ({
          ...m,
          target: m.id === mid ? !m.target : m.target,
        })),
      },
    }))
  }

  function changeCloneTarget(e, targetIdx) {
    const nextValue = e.target.value

    setSelectMap((v) => {
      return [
        ...v.slice(0, targetIdx),
        {
          ...v[targetIdx],
          value: nextValue,
        },
        ...v.slice(targetIdx + 1),
      ]
    })
  }

  function cloneTarget(e, targetIdx, targetGroup) {
    e.preventDefault()

    const cloneTargetGroup = selectMap[targetIdx].value

    if (cloneTargetGroup === 'default') {
      window.alert('복사할 상품군을 먼저 선택하세요.')
      return
    }

    setState((v) => ({
      ...v,
      productsMembersMap: {
        ...v.productsMembersMap,
        [targetGroup]: v.productsMembersMap[cloneTargetGroup].map((m) => ({
          ...m,
        })),
      },
    }))
  }

  return (
    <div className="step">
      <div className="main s3-wrapper">
        {state.products.map((p, idx) => (
          <div
            key={idx}
            className={`s3-product ${p.type}${dups[idx] ? ' s3-dup' : ''}`}
          >
            <div className="s3-product-title">{p.name}</div>
            <div className="s3-product-rewards">
              {p.rewards.map((r, idx) => (
                <p key={idx} className="s3-product-reward">
                  {r}
                </p>
              ))}
            </div>
            {!dups[idx] && state.productsMembersMap[p.group] && (
              <div className="s3-members">
                <div className="s3-member-list">
                  {state.productsMembersMap[p.group].map((m, idx) => (
                    <div
                      className="s3-member"
                      key={idx}
                      onClick={(e) => toggleTarget(e, p.group, m.id)}
                    >
                      <div className="s3-member-name">
                        <span
                          className={m.target ? 's3-included' : 's3-excluded'}
                        >
                          {m.prefix}
                          {m.name}
                        </span>
                        {m.ratio > 1 && (
                          <div
                            className={`ratio ratio-${
                              m.ratio > 11 ? 11 : m.ratio
                            }`}
                          >
                            x{m.ratio}
                          </div>
                        )}
                      </div>
                      <button
                        className={`s3-member-btn ${
                          m.target ? 's3-exclude-btn' : 's3-include-btn'
                        }`}
                        onClick={(e) => toggleTarget(e, p.group, m.id)}
                      >
                        {m.target ? '제외하기' : '추가하기'}
                      </button>
                    </div>
                  ))}
                </div>
                <div className="s3-bottom-wrapper">
                  <div className="s3-target-clone">
                    <select
                      className="s3-clone-select"
                      onChange={(e) => changeCloneTarget(e, idx)}
                      value={selectMap[idx].value}
                    >
                      <option value="default" disabled>
                        추첨 대상자를 복사할 상품군을 선택하세요.
                      </option>
                      {selectMap[idx].cloneTargets.map((p, pidx) => {
                        return (
                          <option key={pidx} value={p.group}>
                            {p.name}
                          </option>
                        )
                      })}
                    </select>
                    <div className="s3-clone-btn-wrapper">
                      명단을{' '}
                      <div
                        className="s3-target-btn s3-clone-btn"
                        onClick={(e) => cloneTarget(e, idx, p.group)}
                      >
                        복사
                      </div>
                    </div>
                  </div>
                  <div className="s3-target-bottom">
                    <div className="s3-total-members">
                      총&nbsp;
                      <span className="s3-current-members">
                        {
                          state.productsMembersMap[p.group].filter(
                            (v) => v.target,
                          ).length
                        }
                      </span>
                      /{state.members.length}명
                    </div>
                    <div className="s3-target-btns">
                      <div
                        className="s3-target-btn s3-include-btn"
                        onClick={(e) => setAll(e, p.group, true)}
                      >
                        전체 포함
                      </div>
                      <div
                        className="s3-target-btn s3-exclude-btn"
                        onClick={(e) => setAll(e, p.group, false)}
                      >
                        전체 제외
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <button className="next-btn" onClick={goNext}>
        저장 및 다음 단계
      </button>
    </div>
  )
}

// 스텝 4: 추첨 단계
function Step4({ goNext, state, setState }) {
  const step4Rewards = React.useMemo(() => {
    const rewards = []
    state.products.forEach((product) => {
      product.rewards.forEach((reward) => {
        rewards.push({
          reward,
          product,
        })
      })
    })
    return rewards
  })

  const drawingFinished = isDrawingFinished()
  const rewardDivRef = React.useRef(null)
  const rewardsIdxRef = React.useRef(
    drawingFinished ? state.drawers.length - 1 : state.drawers.length ?? 0,
  )

  const [drawingState, setDrawingState] = React.useState(() => {
    const currentReward =
      step4Rewards[
        drawingFinished ? rewardsIdxRef.current - 1 : rewardsIdxRef.current
      ]

    return {
      drawerId: drawingFinished
        ? state.drawers[state.drawers.length - 1].member.id
        : null,
      currentGroup: currentReward.product.group,
      targetIds: createTargetIds(currentReward),
      finished: drawingFinished,
      currentReward,
    }
  })

  const lockOnDrawingRef = React.useRef(false)
  const drawingAnimationRef = React.useRef(null)

  const [highlightedId, setHighlightedId] = React.useState(null)

  function isDrawingFinished() {
    return step4Rewards.length === state.drawers.length
  }

  React.useEffect(() => {
    if (!drawingState.targetIds.length) {
      setDrawingState((v) => ({
        ...v,
        targetIds: createTargetIds(),
      }))
    }
  }, [state, drawingState.currentReward, drawingState.targetIds])

  function animateDrawing() {
    while (true) {
      const nextHighlightedId =
        drawingState.targetIds[
          Math.floor(Math.random() * drawingState.targetIds.length)
        ]
      if (nextHighlightedId !== highlightedId) {
        setHighlightedId(nextHighlightedId)
        break
      }
    }
    drawingAnimationRef.current = requestAnimationFrame(animateDrawing)
  }

  function createTargetIds(currentReward) {
    const r = currentReward ?? drawingState.currentReward

    const targetMembers = (state.productsMembersMap[r.product.group] ?? [])
      .filter((m) => m.target)
      .map((m) => m.id)
      .map((id) => state.members.find((m) => m.id === id))

    const minStack = Math.min(...targetMembers.map((v) => v.stack))

    const targetIds = targetMembers
      .filter((v) => v.stack === minStack)
      .map((v) => v.id)

    // 특별 보상일 경우 배율 적용
    if (r.product.isSpecial) {
      targetIds.forEach((id) => {
        const member = state.members.find((m) => m.id === id)
        const ratio = member.ratio
        for (let _ of Array(ratio - 1)) {
          targetIds.push(id)
        }
      })
    }

    return targetIds
  }

  function draw(e) {
    e?.preventDefault()

    if (lockOnDrawingRef.current) {
      return
    }
    lockOnDrawingRef.current = true

    const drawerId =
      drawingState.targetIds[
        Math.floor(Math.random() * drawingState.targetIds.length)
      ]

    if (drawingState.targetIds.length < 2) {
      updateDrawing(drawerId)
      return
    }

    animateDrawing()
    setTimeout(() => {
      cancelAnimationFrame(drawingAnimationRef.current)
      updateDrawing(drawerId)
    }, 1000)
  }

  function updateDrawing(drawerId) {
    setHighlightedId(null)
    setState((v) => {
      const specialDrawers = [...v.specialDrawers]

      if (drawingState.currentReward.product.isSpecial) {
        specialDrawers.push(drawerId)
      }

      return {
        ...v,
        members: v.members.map((m) => {
          if (m.id === drawerId) {
            return {
              ...m,
              stack: m.stack + 1,
              rewards: [...m.rewards, drawingState.currentReward.reward],
            }
          }
          return { ...m }
        }),
        drawers: [
          ...v.drawers,
          {
            name: drawingState.currentReward.reward,
            icon: groupIcon[drawingState.currentReward.product.group],
            member: state.members.find((m) => m.id === drawerId),
          },
        ],
        specialDrawers,
      }
    })

    const nextReward = step4Rewards[rewardsIdxRef.current + 1]
    const finished = !nextReward

    setDrawingState((v) => ({
      ...v,
      drawerId,
      finished,
    }))

    lockOnDrawingRef.current = false
  }

  function next(e) {
    e?.preventDefault()

    rewardDivRef.current.classList.add('s4-disappear')

    setTimeout(() => {
      rewardsIdxRef.current += 1
      const nextReward = step4Rewards[rewardsIdxRef.current]

      setDrawingState((v) => {
        return {
          ...v,
          currentReward: nextReward,
          drawerId: null,
          currentGroup: nextReward.product.group,
          targetIds:
            v.currentGroup !== nextReward.product.group
              ? []
              : v.targetIds.filter((id) => id !== v.drawerId),
        }
      })

      setTimeout(() => {
        rewardDivRef.current.classList.remove('s4-disappear')
      }, 50)
    }, 250)
  }

  return (
    <div className="step">
      <div className="step-4">
        <div
          className="s4-reward-wrapper"
          ref={rewardDivRef}
          style={{
            background: drawingState.currentReward.product.isSpecial
              ? 'no-repeat center/30% url("/assets/laurel_v2.png")'
              : '',
          }}
        >
          {/* <div className="s4-reward-dummy" /> */}
          {/* <div className="s2-reward-vertical-wrapper">

          </div> */}
          <div className="s4-reward">
            <p className="s4-reward-type">
              {drawingState.currentReward.product.isSpecial
                ? '특별 보상'
                : '일반 보상'}
            </p>
            <p className="s4-reward-product">
              {drawingState.currentReward.product.name}
            </p>
            <img
              className="s4-reward-image"
              src={groupIcon[drawingState.currentReward.product.group]}
              alt={drawingState.currentReward.product.name}
            />
            <p className="s4-reward-name">
              {drawingState.currentReward.reward}
            </p>
            {drawingState.drawerId && (
              <p className="s4-reward-drawer">
                {members.find((m) => m.id === drawingState.drawerId).name}
              </p>
            )}
            {!drawingState.drawerId && (
              <button className="s4-reward-btn s4-drawing-btn" onClick={draw}>
                추첨
              </button>
            )}
            {!drawingState.finished && (
              <p className="s4-reward-info">
                상품 추천 진행 중 ({rewardsIdxRef.current + 1}/
                {step4Rewards.length})
              </p>
            )}
            {drawingState.finished && (
              <p className="s4-reward-info s4-finish">
                상품 추첨 완료! 고생하셨습니다!
              </p>
            )}
          </div>
          {drawingState.drawerId && (
            <div className="s4-reward-btn-wrapper">
              {!drawingState.finished && (
                <button className="s4-reward-btn s4-next-btn" onClick={next}>
                  다음
                </button>
              )}
              {drawingState.finished && (
                <button
                  className="s4-reward-btn s4-finish-btn"
                  onClick={goNext}
                >
                  출력
                </button>
              )}
            </div>
          )}
          {!drawingState.drawerId && <div className="s4-reward-btn-wrapper" />}
        </div>
        <div className="s4-members">
          <div className="s4-members-grid">
            {state.members.map((m) => {
              const target = drawingState.targetIds.includes(m.id)

              const classes = [
                's4-member',
                m.stack <= 2 ? 's4-stack' + m.stack : 's4-gold-stack',
              ]

              if (highlightedId === m.id) {
                classes.push('s4-highlighted')
              }

              if (!target) {
                classes.push('s4-not-target')
              }

              return (
                <div className={classes.join(' ')} key={m.id}>
                  <div className="s4-member-label">
                    <p className="s4-member-name">
                      {m.prefix}
                      {m.name}
                    </p>
                    {m.ratio > 1 && (
                      <div
                        className={`ratio ratio-${m.ratio > 11 ? 11 : m.ratio}`}
                        style={{
                          opacity: drawingState.currentReward.product.isSpecial
                            ? 1
                            : 0.2,
                        }}
                      >
                        x{m.ratio}
                      </div>
                    )}
                  </div>
                  {m.rewards.map((r, idx) => (
                    <p key={idx} className="s4-member-reward">
                      {r}
                    </p>
                  ))}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

// 스텝 5: 추첨 결과
function Step5({ state }) {
  console.log(state)

  const gridColumn = React.useMemo(() => {
    const count = state.drawers.length

    if (count <= 4) {
      return 2
    }

    if (count <= 24) {
      return 3
    }

    return 4
  }, [state.drawers])

  const levelUpMemberMap = React.useMemo(() => {
    const ratios = Array.from(new Set(state.members.map((m) => m.ratio)))

    const levelUpMemberMap = ratios.map((ratio) => {
      const nextRatio = ratio * 2

      const members = state.members
        .filter(
          (m) =>
            m.ratio === ratio &&
            !state.specialDrawers.includes(m.id) &&
            !state.absentees.includes(m.id),
        )
        .map((m) => `${m.prefix}${m.name}`)
      const title = `[x${ratio} -> x${nextRatio}], 총 ${members.length}명`

      return {
        title,
        members,
      }
    })

    return levelUpMemberMap
  })

  return (
    <div className="s5-wrapper">
      <div
        className="s5-grid"
        style={{ gridTemplateColumns: `repeat(${gridColumn}, 1fr)` }}
      >
        {state.drawers.map((d, idx) => (
          <div className="s5-reward" key={idx}>
            <div className="s5-reward-icon">
              <img src={d.icon} alt={d.name} />
            </div>
            <div className="s5-reward-detail">
              <div className="s5-reward-name">{d.name}</div>
              <div className="s5-reward-member">
                {d.member.prefix}
                {d.member.name}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="s5-drawers-text">
        # 당첨자
        {state.drawers.map((d, idx) => (
          <p key={idx}>
            {d.name} - {d.member.prefix}
            {d.member.name}
          </p>
        ))}
      </div>
      <div className="s5-drawers-text">
        # 특별 보상 당첨 확률 증가 대상자
        {levelUpMemberMap.map(({ title, members }, idx) => (
          <div key={idx} className="s5-level-up-target">
            <p>{title}</p>
            <p>{members.join(', ')}</p>
          </div>
        ))}
      </div>
      <div className="s5-drawers-text">
        # 특별 보상 당첨자 (초기화 대상, 총 {state.specialDrawers.length}명)
        {state.specialDrawers.map((id, idx) => {
          const { prefix, name } = state.members.find((m) => m.id === id)

          return (
            <p key={idx}>
              {prefix}
              {name}
            </p>
          )
        })}
      </div>
      <div className="s5-drawers-text">
        # 불참자 (초기화 대상, 총 {state.absentees.length}명)
        {state.absentees.map((id, idx) => {
          const { prefix, name } = state.members.find((m) => m.id === id)

          return (
            <p key={idx}>
              {prefix}
              {name}
            </p>
          )
        })}
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
