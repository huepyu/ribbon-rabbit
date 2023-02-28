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
  const [value, setValue] = React.useState('')
  const [copiedMembers, setCopiedMembers] = React.useState([])
  const [joinedMembers, setJoinedMembers] = React.useState([])
  const inputRef = React.useRef(null)

  console.log(copiedMembers, members)

  React.useEffect(() => {
    setCopiedMembers(members)
  }, [members])

  const searchedMembers = React.useMemo(
    () => copiedMembers.filter((member) => member.name.match(getRegExp(value))),
    [value, copiedMembers],
  )

  function handleChange(e) {
    e.preventDefault()
    setValue(e.target.value)
  }

  function selectMember(e, member) {
    e.preventDefault()
    setJoinedMembers((v) => [...v, member].sort((a, b) => a.name - b.name))
    setCopiedMembers((v) => v.filter((m) => m.id !== member.id))
    setValue('')
    inputRef.current.focus()
  }

  function reset(e, member) {
    e.preventDefault()
    if (window.confirm('삐누맨, 진짜 초기화할거예요?')) {
      setJoinedMembers([])
      setCopiedMembers([...members])
      setValue('')
    }
  }

  return (
    <ErrorBoundary>
      <div className="root">
        <div className="root-header">
          <span>참가자 분류 프로그램</span>
          <button onClick={reset}>초기화</button>
        </div>
        <div className="root-main">
          <div className="kingdom left">
            <div className="kingdom-title">Ribbon</div>
            <div className="kingdom-members">
              {joinedMembers
                .filter((m) => m.kingdom === 'KINGDOM_RIBBON')
                .map((m) => (
                  <div className="kingdom-member" key={m.id}>
                    {m.name}
                  </div>
                ))}
            </div>
          </div>
          <div className="kingdom">
            <div className="kingdom-title">Cotton</div>
            <div className="kingdom-members">
              {joinedMembers
                .filter((m) => m.kingdom === 'KINGDOM_COTTON')
                .map((m) => (
                  <div className="kingdom-member" key={m.id}>
                    {m.name}
                  </div>
                ))}
            </div>
          </div>
        </div>
        {value && (
          <div className="root-fixed-search-area">
            {searchedMembers.map((member) => {
              return (
                <div
                  className="searched-member"
                  key={member.id}
                  onClick={(e) => selectMember(e, member)}
                >
                  {member.name}
                </div>
              )
            })}
          </div>
        )}
        <div className="root-fixed-footer">
          <input
            ref={inputRef}
            value={value}
            placeholder="참여하는 분의 닉네임을 입력해요 삐누맨."
            onChange={handleChange}
          />
        </div>
      </div>
    </ErrorBoundary>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
