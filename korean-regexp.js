/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function () {
  __assign =
    Object.assign ||
    function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i]
        for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p]
      }
      return t
    }
  return __assign.apply(this, arguments)
}

function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++)
    s += arguments[i].length
  for (var r = Array(s), k = 0, i = 0; i < il; i++)
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
      r[k] = a[j]
  return r
}

var BASE = '가'.charCodeAt(0) // 한글 코드 시작: 44032
var INITIALS = [
  'ㄱ',
  'ㄲ',
  'ㄴ',
  'ㄷ',
  'ㄸ',
  'ㄹ',
  'ㅁ',
  'ㅂ',
  'ㅃ',
  'ㅅ',
  'ㅆ',
  'ㅇ',
  'ㅈ',
  'ㅉ',
  'ㅊ',
  'ㅋ',
  'ㅌ',
  'ㅍ',
  'ㅎ',
]
var MEDIALS = [
  'ㅏ',
  'ㅐ',
  'ㅑ',
  'ㅒ',
  'ㅓ',
  'ㅔ',
  'ㅕ',
  'ㅖ',
  'ㅗ',
  'ㅘ',
  'ㅙ',
  'ㅚ',
  'ㅛ',
  'ㅜ',
  'ㅝ',
  'ㅞ',
  'ㅟ',
  'ㅠ',
  'ㅡ',
  'ㅢ',
  'ㅣ',
]
var FINALES = [
  '',
  'ㄱ',
  'ㄲ',
  'ㄳ',
  'ㄴ',
  'ㄵ',
  'ㄶ',
  'ㄷ',
  'ㄹ',
  'ㄺ',
  'ㄻ',
  'ㄼ',
  'ㄽ',
  'ㄾ',
  'ㄿ',
  'ㅀ',
  'ㅁ',
  'ㅂ',
  'ㅄ',
  'ㅅ',
  'ㅆ',
  'ㅇ',
  'ㅈ',
  'ㅊ',
  'ㅋ',
  'ㅌ',
  'ㅍ',
  'ㅎ',
]
var MIXED = {
  ㄲ: ['ㄱ', 'ㄱ'],
  ㄳ: ['ㄱ', 'ㅅ'],
  ㄵ: ['ㄴ', 'ㅈ'],
  ㄶ: ['ㄴ', 'ㅎ'],
  ㄺ: ['ㄹ', 'ㄱ'],
  ㄻ: ['ㄹ', 'ㅁ'],
  ㄼ: ['ㄹ', 'ㅂ'],
  ㄽ: ['ㄹ', 'ㅅ'],
  ㄾ: ['ㄹ', 'ㅌ'],
  ㄿ: ['ㄹ', 'ㅍ'],
  ㅀ: ['ㄹ', 'ㅎ'],
  ㅄ: ['ㅂ', 'ㅅ'],
  ㅆ: ['ㅅ', 'ㅅ'],
  ㅘ: ['ㅗ', 'ㅏ'],
  ㅙ: ['ㅗ', 'ㅐ'],
  ㅚ: ['ㅗ', 'ㅣ'],
  ㅝ: ['ㅜ', 'ㅓ'],
  ㅞ: ['ㅜ', 'ㅔ'],
  ㅟ: ['ㅜ', 'ㅣ'],
  ㅢ: ['ㅡ', 'ㅣ'],
}
var MEDIAL_RANGE = {
  ㅗ: ['ㅗ', 'ㅚ'],
  ㅜ: ['ㅜ', 'ㅟ'],
  ㅡ: ['ㅡ', 'ㅢ'],
}
var PRESENT_ON_KEYBOARD = [
  'ㄱ',
  'ㄲ',
  'ㄴ',
  'ㄷ',
  'ㄸ',
  'ㄹ',
  'ㅁ',
  'ㅂ',
  'ㅃ',
  'ㅅ',
  'ㅆ',
  'ㅇ',
  'ㅈ',
  'ㅉ',
  'ㅊ',
  'ㅋ',
  'ㅌ',
  'ㅍ',
  'ㅎ',
  'ㅏ',
  'ㅐ',
  'ㅑ',
  'ㅒ',
  'ㅓ',
  'ㅔ',
  'ㅕ',
  'ㅖ',
  'ㅗ',
  'ㅛ',
  'ㅜ',
  'ㅠ',
  'ㅡ',
  'ㅣ',
]
var KEYS = [
  ['ㄱ', 'r'],
  ['ㄲ', 'R'],
  ['ㄴ', 's'],
  ['ㄷ', 'e'],
  ['ㄸ', 'E'],
  ['ㄹ', 'f'],
  ['ㅁ', 'a'],
  ['ㅂ', 'q'],
  ['ㅃ', 'Q'],
  ['ㅅ', 't'],
  ['ㅆ', 'T'],
  ['ㅇ', 'd'],
  ['ㅈ', 'w'],
  ['ㅉ', 'W'],
  ['ㅊ', 'c'],
  ['ㅋ', 'z'],
  ['ㅌ', 'x'],
  ['ㅍ', 'v'],
  ['ㅎ', 'g'],
  ['ㅏ', 'k'],
  ['ㅐ', 'o'],
  ['ㅑ', 'i'],
  ['ㅒ', 'O'],
  ['ㅓ', 'j'],
  ['ㅔ', 'p'],
  ['ㅕ', 'u'],
  ['ㅖ', 'P'],
  ['ㅗ', 'h'],
  ['ㅛ', 'y'],
  ['ㅜ', 'n'],
  ['ㅠ', 'b'],
  ['ㅡ', 'm'],
  ['ㅣ', 'l'],
]

function getPhonemes(char) {
  var initial = ''
  var medial = ''
  var finale = ''
  var initialOffset = -1
  var medialOffset = -1
  var finaleOffset = -1
  if (char.match(/[ㄱ-ㅎ]/)) {
    initial = char
    initialOffset = INITIALS.join('').search(char)
  } else if (char.match(/[가-힣]/)) {
    var tmp = char.charCodeAt(0) - BASE
    finaleOffset = tmp % FINALES.length
    medialOffset = ((tmp - finaleOffset) / FINALES.length) % MEDIALS.length
    initialOffset =
      ((tmp - finaleOffset) / FINALES.length - medialOffset) / MEDIALS.length
    initial = INITIALS[initialOffset]
    medial = MEDIALS[medialOffset]
    finale = FINALES[finaleOffset]
  }
  return {
    initial: initial,
    medial: medial,
    finale: finale,
    initialOffset: initialOffset,
    medialOffset: medialOffset,
    finaleOffset: finaleOffset,
  }
}

var postPositions = [
  ['은', '는'],
  ['이', '가'],
  ['을', '를'],
  ['과', '와'],
].reduce(function (accum, _a) {
  var p1 = _a[0],
    p2 = _a[1]
  return __spreadArrays(accum, [
    [
      RegExp(
        '([\uAC00-\uD7A3][\'" ]{0,1})' + p1 + '\\(' + p2 + '\\)(\\s+)',
        'g',
      ),
      p1,
      p2,
    ],
    [
      RegExp(
        '([\uAC00-\uD7A3][\'" ]{0,1})' + p2 + '\\(' + p1 + '\\)(\\s+)',
        'g',
      ),
      p1,
      p2,
    ],
  ])
}, [])
function correctPostpositions(text) {
  return postPositions.reduce(function (prev, _a) {
    var pattern = _a[0],
      p1 = _a[1],
      p2 = _a[2]
    return prev.replace(pattern, function (whole, a1, a2) {
      return (
        '' + a1.replace(/\s+$/, '') + (getPhonemes(a1).finale ? p1 : p2) + a2
      )
    })
  }, text)
}

function explode(text, _a) {
  var _b = (_a === void 0 ? {} : _a).grouped,
    grouped = _b === void 0 ? false : _b
  var accum = []
  text.split('').forEach(function (char) {
    var _a = getPhonemes(char),
      initial = _a.initial,
      medial = _a.medial,
      finale = _a.finale,
      initialOffset = _a.initialOffset,
      medialOffset = _a.medialOffset,
      finaleOffset = _a.finaleOffset
    accum.push(
      (initialOffset !== -1 || medialOffset !== -1 || finaleOffset !== -1
        ? [
            initial,
            MIXED[medial] && PRESENT_ON_KEYBOARD.indexOf(medial) === -1
              ? MIXED[medial]
              : medial,
            MIXED[finale] && PRESENT_ON_KEYBOARD.indexOf(finale) === -1
              ? MIXED[finale]
              : finale,
          ].filter(Boolean)
        : [char]
      ).flat(),
    )
  })
  return grouped ? accum : accum.flat()
}

var complexDict = Object.entries(MIXED).reduce(function (accum, _a) {
  var _b
  var k = _a[0],
    v = _a[1]
  return __assign(__assign({}, accum), ((_b = {}), (_b[v.join('')] = k), _b))
}, {})
var isNotUndefined = function (e) {
  return typeof e !== 'undefined'
}
function assemble(arr) {
  var startIndex = arr.findIndex(function (e) {
    return MEDIALS.indexOf(e) !== -1
  })
  var endIndex =
    startIndex !== -1 && MEDIALS.indexOf(arr[startIndex + 1]) !== -1
      ? startIndex + 1
      : startIndex
  var initial = arr.slice(0, startIndex).join('')
  var medial = arr.slice(startIndex, endIndex + 1).join('')
  var finale = arr.slice(endIndex + 1).join('')
  var initialOffset = INITIALS.indexOf(complexDict[initial] || initial)
  var medialOffset = MEDIALS.indexOf(complexDict[medial] || medial)
  var finaleOffset = FINALES.indexOf(complexDict[finale] || finale)
  if (initialOffset !== -1 && medialOffset !== -1) {
    return String.fromCharCode(
      BASE +
        initialOffset * (MEDIALS.length * FINALES.length) +
        medialOffset * FINALES.length +
        finaleOffset,
    )
  }
  return arr.join('')
}
function implode(input) {
  var chars = []
  // 인접한 모음을 하나의 복합 모음으로 합친다.
  ;(typeof input === 'string' ? input.split('') : input).forEach(function (
    e,
    i,
    arr,
  ) {
    if (
      typeof e === 'string' &&
      chars.length > 0 &&
      MEDIALS.indexOf(arr[i - 1]) !== -1 &&
      MEDIALS.indexOf(e) !== -1 &&
      complexDict['' + arr[i - 1] + e]
    ) {
      chars[chars.length - 1] = complexDict['' + arr[i - 1] + e]
    } else {
      chars.push(e)
    }
  })
  var cursor = { medial: null, finales: [] }
  var items = [cursor]
  // 모음으로 시작하는 그룹들을 만든다. (grouped로 넘어온 항목들은 유지)
  chars.forEach(function (e) {
    if (Array.isArray(e)) {
      cursor = { medial: null, finales: [] }
      items.push({ grouped: e, finales: [] })
      items.push(cursor)
    } else if (MEDIALS.indexOf(e) !== -1) {
      cursor = { medial: e, finales: [] }
      items.push(cursor)
    } else {
      cursor.finales.push(e)
    }
  })
  // 각 그룹을 순회하면서 복합자음을 정리하고, 앞 그룹에서 종성으로 사용하고 남은 자음들을 초성으로 가져온다.
  items.forEach(function (curr, i, arr) {
    if (i > 0) {
      var prev = arr[i - 1]
      if (!prev.medial || prev.finales.length === 1) {
        curr.initials = prev.finales
        prev.finales = []
      } else {
        var _a = prev.finales,
          finale = _a[0],
          initials = _a.slice(1)
        curr.initials = initials
        prev.finales = finale ? [finale] : []
      }
      if (
        curr.finales.length > 2 ||
        (i === items.length - 1 && curr.finales.length > 1)
      ) {
        var _b = curr.finales,
          a = _b[0],
          b = _b[1],
          rest = _b.slice(2)
        if (complexDict['' + a + b]) {
          curr.finales = __spreadArrays([complexDict['' + a + b]], rest)
        }
      }
    }
  })
  // 각 글자에 해당하는 블록 단위로 나눈 후 조합한다.
  var groups = []
  items.forEach(function (_a) {
    var _b = _a.initials,
      initials = _b === void 0 ? [] : _b,
      medial = _a.medial,
      finales = _a.finales,
      grouped = _a.grouped
    if (grouped) {
      groups.push(grouped)
    } else {
      var pre = initials.slice()
      var initial = pre.pop()
      var finale = finales[0],
        post = finales.slice(1)
      if (FINALES.indexOf(finale) === -1) {
        post = __spreadArrays([finale], post)
        finale = ''
      }
      pre.filter(isNotUndefined).forEach(function (e) {
        return groups.push([e])
      })
      groups.push([initial, medial, finale].filter(Boolean))
      post.filter(isNotUndefined).forEach(function (e) {
        return groups.push([e])
      })
    }
  })
  return groups.map(assemble).join('')
}

var reRegExpChar = /[\\^$.*+?()[\]{}|]/g
var reHasRegExpChar = RegExp(reRegExpChar.source)
function escapeRegExp(string) {
  return string && reHasRegExpChar.test(string)
    ? string.replace(reRegExpChar, '\\$&')
    : string || ''
}

var getInitialSearchRegExp = function (initial) {
  var initialOffset = INITIALS.indexOf(initial)
  if (initialOffset !== -1) {
    var baseCode = initialOffset * MEDIALS.length * FINALES.length + BASE
    return (
      '[' +
      String.fromCharCode(baseCode) +
      '-' +
      String.fromCharCode(baseCode + MEDIALS.length * FINALES.length - 1) +
      ']'
    )
  }
  return initial
}
var FUZZY = '__' + parseInt('fuzzy', 36) + '__'
var IGNORE_SPACE = '__' + parseInt('ignorespace', 36) + '__'
function getRegExp(search, _a) {
  var _b = _a === void 0 ? {} : _a,
    _c = _b.initialSearch,
    initialSearch = _c === void 0 ? false : _c,
    _d = _b.startsWith,
    startsWith = _d === void 0 ? false : _d,
    _e = _b.endsWith,
    endsWith = _e === void 0 ? false : _e,
    _f = _b.ignoreSpace,
    ignoreSpace = _f === void 0 ? false : _f,
    _g = _b.ignoreCase,
    ignoreCase = _g === void 0 ? true : _g,
    _h = _b.global,
    global = _h === void 0 ? false : _h,
    _j = _b.fuzzy,
    fuzzy = _j === void 0 ? false : _j
  var frontChars = search.split('')
  var lastChar = frontChars.slice(-1)[0]
  var lastCharPattern = ''
  var phonemes = getPhonemes(lastChar || '')
  // 마지막 글자가 한글인 경우만 수행
  if (phonemes.initialOffset !== -1) {
    frontChars = frontChars.slice(0, -1)
    var initial = phonemes.initial,
      medial = phonemes.medial,
      finale = phonemes.finale,
      initialOffset = phonemes.initialOffset,
      medialOffset = phonemes.medialOffset
    // 해당 초성으로 시작하는 첫번째 문자 : 가, 나, 다, ... , 하
    var baseCode = initialOffset * MEDIALS.length * FINALES.length + BASE
    var patterns = []
    switch (true) {
      // case 1: 종성으로 끝나는 경우 (받침이 있는 경우)
      case finale !== '': {
        // 마지막 글자
        patterns.push(lastChar)
        // 종성이 초성으로 사용 가능한 경우
        if (INITIALS.includes(finale)) {
          patterns.push(
            '' +
              String.fromCharCode(baseCode + medialOffset * FINALES.length) +
              getInitialSearchRegExp(finale),
          )
        }
        // 종성이 복합 자음인 경우, 두 개의 자음으로 분리하여 각각 받침과 초성으로 사용
        if (MIXED[finale]) {
          patterns.push(
            '' +
              String.fromCharCode(
                baseCode +
                  medialOffset * FINALES.length +
                  FINALES.join('').search(MIXED[finale][0]) +
                  1,
              ) +
              getInitialSearchRegExp(MIXED[finale][1]),
          )
        }
        break
      }
      // case 2: 중성으로 끝나는 경우 (받침이 없는 경우)
      case medial !== '': {
        var from = void 0,
          to = void 0
        // 중성이 복합 모음인 경우 범위를 확장하여 적용
        if (MEDIAL_RANGE[medial]) {
          from =
            baseCode +
            MEDIALS.join('').search(MEDIAL_RANGE[medial][0]) * FINALES.length
          to =
            baseCode +
            MEDIALS.join('').search(MEDIAL_RANGE[medial][1]) * FINALES.length +
            FINALES.length -
            1
        } else {
          from = baseCode + medialOffset * FINALES.length
          to = from + FINALES.length - 1
        }
        patterns.push(
          '[' + String.fromCharCode(from) + '-' + String.fromCharCode(to) + ']',
        )
        break
      }
      // case 3: 초성만 입력된 경우
      case initial !== '': {
        patterns.push(getInitialSearchRegExp(initial))
        break
      }
    }
    lastCharPattern =
      patterns.length > 1 ? '(' + patterns.join('|') + ')' : patterns[0]
  }
  var glue = fuzzy ? FUZZY : ignoreSpace ? IGNORE_SPACE : ''
  var frontCharsPattern = initialSearch
    ? frontChars
        .map(function (char) {
          return char.search(/[ㄱ-ㅎ]/) !== -1
            ? getInitialSearchRegExp(char)
            : escapeRegExp(char)
        })
        .join(glue)
    : escapeRegExp(frontChars.join(glue))
  var pattern =
    (startsWith ? '^' : '') +
    frontCharsPattern +
    glue +
    lastCharPattern +
    (endsWith ? '$' : '')
  if (glue) {
    pattern = pattern
      .replace(RegExp(FUZZY, 'g'), '.*')
      .replace(RegExp(IGNORE_SPACE, 'g'), '\\s*')
  }
  return RegExp(pattern, (global ? 'g' : '') + (ignoreCase ? 'i' : ''))
}

var EN_TO_KR = Object.values(KEYS).reduce(function (accum, _a) {
  var _b
  var kr = _a[0],
    en = _a[1]
  return __assign(__assign({}, accum), ((_b = {}), (_b[en] = kr), _b))
}, {})
function engToKor(text) {
  return implode(
    text
      .split('')
      .map(function (char) {
        return EN_TO_KR[char] || char
      })
      .join(''),
  )
}

var KR_TO_EN = Object.values(KEYS).reduce(function (accum, _a) {
  var _b
  var kr = _a[0],
    en = _a[1]
  return __assign(__assign({}, accum), ((_b = {}), (_b[kr] = en), _b))
}, {})
function korToEng(text) {
  return text
    .split('')
    .map(function (char) {
      return explode(char, { grouped: false }).map(function (e) {
        return KR_TO_EN[e] || e
      })
    })
    .flat()
    .join('')
}
