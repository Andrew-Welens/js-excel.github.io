import {ExcelComponent} from '@core/ExcelComponent'
import {generateTable} from '@/components/table/table.template'
import {resize} from '@/components/table/table.resize'
import {shouldResize} from '@/components/table/table.helpers'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['mousedown'],
    })
  }

  toHtml() {
    return generateTable(30)
  }

  onMousedown(e) {
    if (shouldResize(e)) {
      resize(this.$root, e)
    }
  }
}
