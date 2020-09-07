function toBtn(btn) {
  const meta = `data-type="btn"
  data-value='${JSON.stringify(btn.value)}'
  `
  return `
      <div 
      class="button ${btn.active ? 'active' : ''}"
      ${meta}
      >
        <i ${meta} class="material-icons">${btn.icon}</i>
      </div>
`
}

export function generateToolbar() {
  const buttons = [
    {
      icon: 'format_align_left',
      active: false,
      value: {textAlign: 'left'}
    },
    {
      icon: 'format_align_center',
      active: false,
      value: {textAlign: 'center'}
    },
    {
      icon: 'format_align_right',
      active: false,
      value: {textAlign: 'right'}
    },
    {
      icon: 'format_bold',
      active: false,
      value: {fontWeight: 'bold'}
    },
    {
      icon: 'format_italic',
      active: false,
      value: {fontStyle: 'italic'}
    },
    {
      icon: 'format_underlined',
      active: false,
      value: {textDecoration: 'underline'}
    },
  ]
  return buttons.map(toBtn).join('')
}
