const charCodes = {
  A: 65,
  Z: 90,
}

// function toCell(_, col) {
//   return `
//     <div class="cell" contenteditable data-col="${col}"></div>
// `
// }

function toCell(row) {
  return function(_, col) {
    return `
    <div class="cell"
     contenteditable
      data-col="${col}"
      data-type="cell"
      data-id="${row}:${col}">
      </div>`
  }
}

function toColumn(element, idx) {
  return `
    <div class="column" data-type="resize" data-col="${idx}">
     ${element}
     <div class="col-resize" data-resize="col"></div>
    </div>
`
}

function generateRow(idx, data) {
  const resize = idx ? '<div class="row-resize" data-resize="row"></div>' : ''
  return `
    <div class="row" data-type="resize">
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

export function generateTable(row = 15) {
  const colCount = charCodes.Z - charCodes.A + 1
  const rows = []

  const cols = new Array(colCount).fill('').
      map(toChar).
      map(toColumn).
      join('')

  rows.push(generateRow(null, cols))

  for (let i = 0; i < row; i++) {
    const cells = new Array(colCount).fill('').map(toCell(i)).join('')
    rows.push(generateRow(i + 1, cells))
  }

  return rows.join('')
}
