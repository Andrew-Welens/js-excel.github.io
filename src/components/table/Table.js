import {ExcelComponent} from '@core/ExcelComponent'
import {generateTable} from '@/components/table/table.template'
import {resize} from '@/components/table/table.resize'
import {
  isCell,
  matrix,
  nextSelector,
  shouldResize,
} from '@/components/table/table.helpers'
import {TableSelection} from '@/components/table/TableSelection'
import {$} from '@core/dom'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown'],
      ...options
    })
  }

  toHtml() {
    return generateTable(30)
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()
    const $cell = this.$root.find('[data-id="0:0"]')
    this.selection.select($cell)
  }

  onMousedown(e) {
    if (shouldResize(e)) {
      resize(this.$root, e)
    } else if (isCell(e)) {
      const $target = $(e.target)
      if (e.shiftKey) {
        const $cells = matrix($target, this.selection.current).
            map(id => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($cells)
      } else {
        this.selection.select($target)
      }
    }
  }

  onKeydown(e) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowDown',
      'ArrowUp']

    const {key} = e

    if (keys.includes(key) && !e.shiftKey) {
      e.preventDefault()
      const id = this.selection.current.getId(true)
      const $next = this.$root.find(nextSelector(key, id))
      this.selection.select($next)
    }
  }
}

