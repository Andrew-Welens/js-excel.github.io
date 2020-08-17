const charCodes = {
  A: 65,
  Z: 90,
};

function generateCell() {
  return `
<div class="column">

</div>
`;
}

function toColumn(element) {
  return `
<div class="column">${element}</div>
`;
}

function generateRow(data) {
  return `
<div class="row">
<div class="row-info"></div>
<div class="row-data">${data}</div>
</div>
`;
}

function toChar(_, idx) {
  return String.fromCharCode(charCodes.A + idx);
}

export function generateTable(row = 15) {
  const colCount = charCodes.Z - charCodes.A + 1;
  const rows = [];

  const cols = new Array(colCount).fill('').
      map(toChar).
      map(toColumn).
      join('');

  rows.push(generateRow(cols));

  for (let i = 0; i < row; i++) {
    rows.push(generateRow());
  }

  return rows.join('');
}
