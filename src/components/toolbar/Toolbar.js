import {generateToolbar} from '@/components/toolbar/toolbar.template'
import {$} from '@core/dom'
import {ExcelStateComponent} from '@core/ExcelStateComponent'

export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar'

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      ...options
    })
  }

  prepare() {
    const initialState = {
      textAlign: 'left',
      textDecoration: 'none',
      fontWeight: 'normal',
      fontStyle: 'normal'
    }
    this.initState(initialState)
  }

  get template() {
    return generateToolbar(this.state)
  }

  toHtml() {
    return this.template
  }

  onClick(e) {
    const $target = $(e.target)
    if ($target.data.type === 'btn') {
      const value = JSON.parse($target.data.value)
      const key = Object.keys(value)[0]
      this.setState({[key]: value[key]})
    }
  }
}
