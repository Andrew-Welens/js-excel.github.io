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

export function generateToolbar(state) {
  const buttons = [
    {
      value: {textAlign: 'left'},
      icon: 'format_align_left',
      active: state['textAlign'] === 'left',
    },
    {
      value: {textAlign: 'center'},
      icon: 'format_align_center',
      active: state['textAlign'] === 'center',
    },
    {
      value: {textAlign: 'right'},
      icon: 'format_align_right',
      active: state['textAlign'] === 'right',
    },
    {
      value: {
        fontWeight: state['fontWeight'] === 'bold' ?
            'normal' :
            'bold'
      },
      icon: 'format_bold',
      active: state['fontWeight'] === 'bold',
    },
    {
      value: {
        fontStyle: state['fontStyle'] === 'italic' ?
            'normal' :
            'italic'
      },
      icon: 'format_italic',
      active: state['fontStyle'] === 'italic',
    },
    {
      value: {
        textDecoration: state['textDecoration'] === 'underline' ?
            'none' :
            'underline'
      },
      icon: 'format_underlined',
      active: state['textDecoration'] === 'underline'
    },
  ]
  return buttons.map(toBtn).join('')
}
