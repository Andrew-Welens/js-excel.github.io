const charCodes = {
  A: 65,
  Z: 90,
}

function toCell() {
  return `
<div class="cell"></div>
`
}

function toColumn(element) {
  return `
<div class="column">${element}</div>
`
}

function generateRow(idx, data) {
  return `
<div class="row">
<div class="row-info">${idx}</div>
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

  rows.push(generateRow('', cols))

  for (let i = 0; i < row; i++) {
    const cells = new Array(colCount).fill('').map(toCell).join('')
    rows.push(generateRow(i + 1, cells))
  }

  return rows.join('')
}
