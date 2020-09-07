import {ExcelComponent} from '@core/ExcelComponent'
import {generateToolbar} from '@/components/toolbar/toolbar.template'
import {$} from '@core/dom'

export class Toolbar extends ExcelComponent {
  static className = 'excel__toolbar'

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      ...options
    })
  }

  toHtml() {
    return generateToolbar()
  }

  onClick(event) {
    const $target = $(event.target)
    if ($target.data.type === 'btn') {
      console.log($target.data.value)
    }
  }
}
