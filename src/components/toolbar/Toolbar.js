import {generateToolbar} from '@/components/toolbar/toolbar.template'
import {$} from '@core/dom'
import {ExcelStateComponent} from '@core/ExcelStateComponent'
import {defaultStyles} from '@/const'

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
    this.initState(defaultStyles)
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
      this.$emit('toolbar:style', value)

      const key = Object.keys(value)[0]
      this.setState({[key]: value[key]})
    }
  }
}
