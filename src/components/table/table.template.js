const charCodes = {
  A: 65,
  Z: 90,
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function getWidth(state, idx) {
  return (state[idx] || DEFAULT_WIDTH) + 'px'
}

function getHeight(state, idx) {
  return (state[idx] || DEFAULT_HEIGHT) + 'px'
}

function toCell(state, row) {
  return function(_, col) {
    const id = `${row}:${col}`
    const width = getWidth(state.colState, col)
    const data = state.dataState[id]

    return `
    <div class="cell"
     contenteditable
      data-col="${col}"
      data-type="cell"
      data-id="${id}"
      style="width: ${width}">
       ${data || ''}
      </div>`
  }
}

function toColumn({col, idx, width}) {
  return `
    <div class="column"
     data-type="resize"
     data-col="${idx}"
     style="width: ${width}">
     ${col}
     <div class="col-resize" data-resize="col"></div>
    </div>
`
}

function generateRow(idx, data, state) {
  const resize = idx ? '<div class="row-resize" data-resize="row"></div>' : ''
  const height = getHeight(state, idx)
  return `
    <div class="row"
     data-type="resize"
     data-row="${idx}"
     style="height: ${height}"
     >
      <div class="row-info">
      ${idx ? idx : ''}
      ${resize}
      </div>
      <div class="row-data">${data}</div>
    </div>
`
}

function toChar(_, idx) {
  return String.fromCharCode(charCodes.A + idx)
}

function withWidthFrom(state) {
  return function(col, idx) {
    return {
      col, idx, width: getWidth(state.colState, idx),
    }
  }
}

export function generateTable(row = 15, state = {}) {
  const colCount = charCodes.Z - charCodes.A + 1
  const rows = []

  const cols = new Array(colCount).fill('').
      map(toChar).
      map(withWidthFrom(state)).
      map(toColumn).
      join('')

  rows.push(generateRow(null, cols, {}))

  for (let i = 0; i < row; i++) {
    const cells = new Array(colCount).fill('').
        map(toCell(state, i)).
        join('')
    rows.push(generateRow(i + 1, cells, state.rowState))
  }

  return rows.join('')
}
