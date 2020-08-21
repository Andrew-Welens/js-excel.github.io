import {ExcelComponent} from '@core/ExcelComponent'
import {generateTable} from '@/components/table/table.template'
import {$} from '@core/dom'

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
      const $target = $(e.target)
      const $parent = $target.closest('[data-type="resize"]')
      const coords = $parent.getCoords()
      const type = $target.data.resize


      const cells = this.$root.queryAll(`[data-col="${$parent.data.col}"]`)

      document.onmousemove = event => {
        if (type === 'col') {
          const delta = event.pageX - coords.right | 0
          const value = coords.width + delta
          $parent.styleCss({width: value + 'px'})
          cells.forEach(el => el.style.width = value + 'px')
        } else {
          const delta = event.pageY - coords.bottom | 0
          const value = coords.height + delta
          $parent.styleCss({height: value + 'px'})
        }
      }

      document.onmouseup = () => {
        document.onmousemove = null
      }
    }
  }
}
