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
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Lucky />,
    },
    {
      path: '/join-members',
      element: <JoinMembers />,
    },
  ])

  return <RouterProvider router={router} />
}

function Lucky() {
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
      kingdom: null,
      products: [],
      productsMembersMap: {},
      members: [],
      // 당첨자
      drawers: [],
      // 전체 참여자
      participants: [],
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
      e?.preventDefault()
      if (step !== 6) {
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
        return '킹덤 선택 단계'
      case 2:
        return state.kingdom.name + ': 상품 선택 단계'
      case 3:
        return state.kingdom.name + ': 참여자 선택 단계'
      case 4:
        return state.kingdom.name + ': 추첨 대상 선별 단계'
      case 5:
        return state.kingdom.name + ': 추첨 단계'
      case 6:
        return state.kingdom.name + ': 추첨 결과'
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
              <p className="title-step">
                {getStepText()} ({step}/6)
              </p>
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
        {step === 5 && (
          <Step5 goNext={goNext} state={state} setState={setState} />
        )}
        {step === 6 && <Step6 state={state} setState={setState} />}
      </div>
    </ErrorBoundary>
  )
}

// 스텝 1: 킹덤 선택 단계
function Step1({ goNext, state, setState }) {
  const [kingdom, setKingdom] = React.useState(
    state.kingdom ?? { code: null, name: null },
  )
  const [updated, setUpdated] = React.useState(false)

  function selectKingdom(e, kingdom) {
    e.preventDefault()

    setKingdom(kingdom)
  }

  function next(e) {
    e.preventDefault()

    setUpdated(true)
    setState((v) => ({
      ...v,
      kingdom,
      members: members
        .filter((m) => m.kingdom === kingdom.code)
        .map((m) => ({
          ...m,
          stack: 0,
          rewards: [],
        })),
    }))
  }

  React.useEffect(() => {
    if (state.kingdom) {
      setKingdom(state.kingdom)

      if (updated) {
        goNext()
      }
    }
  }, [updated, state.kingdom])

  return (
    <div className="step">
      <div className="main s1-wrapper">
        <div className="s1-kingdoms">
          <div
            className={`s1-kingdom ${
              kingdom.code === KINGDOM_RIBBON.code ? 's1-active' : ''
            }`}
            onClick={(e) => selectKingdom(e, KINGDOM_RIBBON)}
          >
            {KINGDOM_RIBBON.name}
          </div>
          <div
            className={`s1-kingdom ${
              kingdom.code === KINGDOM_COTTON.code ? 's1-active' : ''
            }`}
            onClick={(e) => selectKingdom(e, KINGDOM_COTTON)}
          >
            {KINGDOM_COTTON.name}
          </div>
        </div>
      </div>
      <button className="next-btn" disabled={!kingdom.code} onClick={next}>
        저장 및 다음 단계
      </button>
    </div>
  )
}

// 스텝 2: 상품 등록 단계
function Step2({ goNext, state, setState }) {
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
        <div className="s2-left" ref={leftRef}>
          <p className="s2-our-products-title">행운 상점 추첨 순서</p>
          <p className="s2-delete-desc">클릭 시 삭제됩니다.</p>
          {state.products.map((p, idx) => (
            <div
              key={idx}
              className="s2-our-product"
              onClick={(e) => deleteProduct(e, idx)}
            >
              {p.name}
              {p.rewards.map((r, idx) => (
                <p key={idx} className="s2-product-reward">
                  {r}
                </p>
              ))}
            </div>
          ))}
        </div>
        <div className="s2-right">
          <p className="s2-right-title">
            오늘 행운 상점의 상품을 순서대로 골라주세요.
          </p>
          {step1Products.map((lineProducts, lineIdx) => {
            return (
              <div className="s2-products-grid" key={lineIdx}>
                {lineProducts.map((p) => (
                  <div
                    key={p.id}
                    className={`s2-product ${p.type}`}
                    onClick={(e) => addProduct(e, p)}
                  >
                    <p className="s2-product-title">{p.name}</p>
                    {p.rewards.map((r, idx) => (
                      <p key={idx} className="s2-product-reward">
                        {r}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            )
          })}

          {/* <div className="s2-products-grid">
            {step1Products.map((p) => (
              <div
                key={p.id}
                className={`s2-product ${p.type}`}
                onClick={(e) => addProduct(e, p)}
              >
                <p className="s2-product-title">{p.name}</p>
                {p.rewards.map((r, idx) => (
                  <p key={idx} className="s2-product-reward">
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

// 스텝 3: 참여자 선택 단계
function Step3({ goNext, state, setState }) {
  const [participants, setParticipants] = React.useState(
    state.members.map((m) => ({
      ...m,
      target: state.participants.includes(m.id),
    })),
  )

  function toggleParticipants(e, id) {
    e.preventDefault()

    setState((v) => {
      let participants = v.participants

      if (participants.includes(id)) {
        participants = participants.filter((v) => !(v === id))
      } else {
        participants.push(id)
      }

      return {
        ...v,
        participants,
      }
    })

    setParticipants((v) => {
      return v.map((m) => {
        if (m.id !== id) return m

        return {
          ...m,
          target: !m.target,
        }
      })
    })
  }

  function addAllParticipants(e) {
    e.preventDefault()

    const participants = state.members.map((m) => m.id)

    setState((v) => ({
      ...v,
      participants,
    }))

    setParticipants((v) =>
      v.map((m) => ({
        ...m,
        target: true,
      })),
    )
  }

  function removeAllParticipants(e) {
    e.preventDefault()

    setState((v) => ({
      ...v,
      participants: [],
    }))

    setParticipants((v) =>
      v.map((m) => ({
        ...m,
        target: false,
      })),
    )
  }

  return (
    <div className="step">
      <div className="main s3-wrapper">
        <div className="s3-participants">
          <div className="s3-participants-grid">
            {participants.map((a) => {
              return (
                <div
                  key={a.id}
                  className={`s3-participant ${
                    a.target ? 's3-participant-target' : ''
                  }`}
                  onClick={(e) => toggleParticipants(e, a.id)}
                >
                  <p>{a.name}</p>
                  {a.target && <p className="s3-participant-text">참여자</p>}
                </div>
              )
            })}
            <div
              className="s3-participant include-btn"
              onClick={addAllParticipants}
            >
              <p>전체 선택</p>
            </div>
            <div
              className="s3-participant exclude-btn"
              onClick={removeAllParticipants}
            >
              <p>전체 제외</p>
            </div>
          </div>
        </div>
      </div>
      <button
        className="next-btn"
        disabled={!state.participants.length}
        onClick={goNext}
      >
        저장 및 다음 단계
      </button>
    </div>
  )
}

// 스텝 4: 인원 선별 단계
function Step4({ goNext, state, setState }) {
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
      productsMembersMap[group] = state.members
        .filter((m) => state.participants.includes(m.id))
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

  console.log(state)

  return (
    <div className="step">
      <div className="main s4-wrapper">
        {state.products.map((p, idx) => (
          <div
            key={idx}
            className={`s4-product ${p.type}${dups[idx] ? ' s4-dup' : ''}`}
          >
            <div className="s4-product-title">{p.name}</div>
            <div className="s4-product-rewards">
              {p.rewards.map((r, idx) => (
                <p key={idx} className="s4-product-reward">
                  {r}
                </p>
              ))}
            </div>
            {!dups[idx] && state.productsMembersMap[p.group] && (
              <div className="s4-members">
                <div className="s4-member-list">
                  {state.productsMembersMap[p.group].map((m, idx) => (
                    <div
                      className="s4-member"
                      key={idx}
                      onClick={(e) => toggleTarget(e, p.group, m.id)}
                    >
                      <div className="s4-member-name">
                        <span
                          className={m.target ? 's4-included' : 's4-excluded'}
                        >
                          {m.prefix}
                          {m.name}
                        </span>
                        {m.ratio > 1 && (
                          <div
                            className={`ratio ratio-${
                              m.ratio > 1024 ? 1024 : m.ratio
                            }`}
                            style={{
                              opacity: p.isSpecial ? 1 : 0.2,
                            }}
                          >
                            x{m.ratio}
                          </div>
                        )}
                      </div>
                      <button
                        className={`s4-member-btn ${
                          m.target ? 'exclude-btn' : 'include-btn'
                        }`}
                        onClick={(e) => toggleTarget(e, p.group, m.id)}
                      >
                        {m.target ? '제외하기' : '추가하기'}
                      </button>
                    </div>
                  ))}
                </div>
                <div className="s4-bottom-wrapper">
                  <div className="s4-target-clone">
                    <select
                      className="s4-clone-select"
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
                    <div className="s4-clone-btn-wrapper">
                      명단을{' '}
                      <div
                        className="s4-target-btn s4-clone-btn"
                        onClick={(e) => cloneTarget(e, idx, p.group)}
                      >
                        복사
                      </div>
                    </div>
                  </div>
                  <div className="s4-target-bottom">
                    <div className="s4-total-members">
                      총&nbsp;
                      <span className="s4-current-members">
                        {
                          state.productsMembersMap[p.group].filter(
                            (v) => v.target,
                          ).length
                        }
                      </span>
                      /{state.members.length}명
                    </div>
                    <div className="s4-target-btns">
                      <div
                        className="s4-target-btn include-btn"
                        onClick={(e) => setAll(e, p.group, true)}
                      >
                        전체 포함
                      </div>
                      <div
                        className="s4-target-btn exclude-btn"
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

// 스텝 5: 추첨 단계
function Step5({ goNext, state, setState }) {
  const step5Rewards = React.useMemo(() => {
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
      step5Rewards[
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
    return step5Rewards.length === state.drawers.length
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

    if (drawingState.targetIds.length === 0) {
      next()
      return
    }

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

    const nextReward = step5Rewards[rewardsIdxRef.current + 1]
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

    rewardDivRef.current.classList.add('s5-disappear')

    setTimeout(() => {
      rewardsIdxRef.current += 1
      const nextReward = step5Rewards[rewardsIdxRef.current]

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
        rewardDivRef.current.classList.remove('s5-disappear')
      }, 50)
    }, 250)
  }

  return (
    <div className="step">
      <div className="step-4">
        <div
          className="s5-reward-wrapper"
          ref={rewardDivRef}
          style={{
            background: drawingState.currentReward.product.isSpecial
              ? 'no-repeat center/500px url("./assets/laurel_v2.png")'
              : '',
          }}
        >
          {/* <div className="s5-reward-dummy" /> */}
          {/* <div className="s3-reward-vertical-wrapper">

          </div> */}
          <div className="s5-reward">
            <p className="s5-reward-type">
              {drawingState.currentReward.product.isSpecial
                ? '특별 보상'
                : '일반 보상'}
            </p>
            <p className="s5-reward-product">
              {drawingState.currentReward.product.name}
            </p>
            <img
              className="s5-reward-image"
              src={groupIcon[drawingState.currentReward.product.group]}
              alt={drawingState.currentReward.product.name}
            />
            <p className="s5-reward-name">
              {drawingState.currentReward.reward}
            </p>
            {drawingState.drawerId && (
              <p className="s5-reward-drawer">
                {members.find((m) => m.id === drawingState.drawerId).name}
              </p>
            )}
            {!drawingState.drawerId && (
              <button className="s5-reward-btn s5-drawing-btn" onClick={draw}>
                추첨
              </button>
            )}
            {!drawingState.finished && (
              <p className="s5-reward-info">
                상품 추천 진행 중 ({rewardsIdxRef.current + 1}/
                {step5Rewards.length})
              </p>
            )}
            {drawingState.finished && (
              <p className="s5-reward-info s5-finish">
                상품 추첨 완료! 고생하셨습니다!
              </p>
            )}
          </div>
          {drawingState.drawerId && (
            <div className="s5-reward-btn-wrapper">
              {!drawingState.finished && (
                <button className="s5-reward-btn s5-next-btn" onClick={next}>
                  다음
                </button>
              )}
              {drawingState.finished && (
                <button
                  className="s5-reward-btn s5-finish-btn"
                  onClick={goNext}
                >
                  출력
                </button>
              )}
            </div>
          )}
          {!drawingState.drawerId && <div className="s5-reward-btn-wrapper" />}
        </div>
        <div className="s5-members">
          <div className="s5-members-grid">
            {state.members.map((m) => {
              const target = drawingState.targetIds.includes(m.id)

              const classes = [
                's5-member',
                m.stack <= 2 ? 's5-stack' + m.stack : 's5-gold-stack',
              ]

              if (highlightedId === m.id) {
                classes.push('s5-highlighted')
              }

              if (!target) {
                classes.push('s5-not-target')
              }

              return (
                <div className={classes.join(' ')} key={m.id}>
                  <div className="s5-member-label">
                    <p className="s5-member-name">
                      {m.prefix}
                      {m.name}
                    </p>
                    {m.ratio > 1 && (
                      <div
                        className={`ratio ratio-${
                          m.ratio > 1024 ? 1024 : m.ratio
                        }`}
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
                    <p key={idx} className="s5-member-reward">
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

// 스텝 6: 추첨 결과
function Step6({ state }) {
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
            state.participants.includes(m.id),
        )
        .map((m) => `${m.prefix}${m.name}`)
      const title = `[x${ratio} -> x${nextRatio}], 총 ${members.length}명`

      return {
        ratio,
        title,
        members,
        length: members.length,
      }
    })

    return levelUpMemberMap
      .sort((a, b) => {
        return a.ratio - b.ratio
      })
      .filter((map) => map.length > 0)
  }, [])

  const absentees = React.useMemo(() => {
    return state.members
      .filter((m) => !state.participants.includes(m.id))
      .map((m) => m.id)
  }, [])

  const updateMapJson = React.useMemo(() => {
    const reset = [...state.specialDrawers, ...absentees].map((id) => {
      return state.members.find((m) => m.id === id).name
    })

    const promotion = {}

    levelUpMemberMap.forEach((levelUpMember) => {
      const nextRatio = levelUpMember.ratio * 2

      if (promotion[nextRatio]) {
        promotion[nextRatio] = [
          ...promotion[nextRatio],
          ...levelUpMember.members.map((name) => name.replace(/[☆★]/g, '')),
        ]
      } else {
        promotion[nextRatio] = levelUpMember.members.map((name) =>
          name.replace(/[☆★]/g, ''),
        )
      }
    })

    return JSON.stringify({
      promotion,
      reset,
      target: state.kingdom.code.toLowerCase(),
    })
  }, [])

  return (
    <div className="s6-wrapper">
      <div
        className="s6-grid"
        style={{ gridTemplateColumns: `repeat(${gridColumn}, 1fr)` }}
      >
        {state.drawers.map((d, idx) => (
          <div className="s6-reward" key={idx}>
            <div className="s6-reward-icon">
              <img src={d.icon} alt={d.name} />
            </div>
            <div className="s6-reward-detail">
              <div className="s6-reward-name">{d.name}</div>
              <div className="s6-reward-member">
                {d.member.prefix}
                {d.member.name}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="s6-drawers-text">
        # {state.kingdom.name} - 당첨자
        {state.drawers.map((d, idx) => (
          <p key={idx}>
            {d.name} - {d.member.prefix}
            {d.member.name}
          </p>
        ))}
      </div>
      <div className="s6-drawers-text">
        # {state.kingdom.name} - 특별 보상 당첨 확률 증가 대상자
        {levelUpMemberMap.map(({ title, members }, idx) => (
          <div key={idx} className="s6-level-up-target">
            <p>{title}</p>
            <p>{members.join(', ')}</p>
          </div>
        ))}
      </div>
      <div className="s6-drawers-text">
        # {state.kingdom.name} - 특별 보상 당첨자 (당첨 버프 초기화 대상, 총{' '}
        {state.specialDrawers.length}명)
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
      <div className="s6-drawers-text">
        # {state.kingdom.name} - 불참자 (당첨 버프 초기화 대상, 총{' '}
        {absentees.length}
        명)
        {absentees.map((id, idx) => {
          const { prefix, name } = state.members.find((m) => m.id === id)

          return (
            <p key={idx}>
              {prefix}
              {name}
            </p>
          )
        })}
      </div>
      <div className="s6-drawers-text">
        <p># 운영진 방에 아래 내용 복사해주세요.</p>
        {updateMapJson}
      </div>
    </div>
  )
}

ReactDOM.render(<Lucky />, document.getElementById('root'))
