import {ExcelComponent} from '@core/ExcelComponent'
import {generateTable} from '@/components/table/table.template'

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
    if (e.target.dataset.resize) {
      console.log('resize')
    }
  }
}
