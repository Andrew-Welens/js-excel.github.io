import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom'
import {generateTable} from '@/components/table/table.template'
import {resize} from '@/components/table/table.resize'
import {
  isCell,
  matrix,
  nextSelector,
  shouldResize,
} from '@/components/table/table.helpers'
import {TableSelection} from '@/components/table/TableSelection'
import * as actions from '@/store/actions'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    })
  }

  toHtml() {
    return generateTable(20, this.store.getState())
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()
    this.selectCell(this.$root.find('[data-id="0:0"]'))
    this.$on('formula:input', text => {
      this.selection.current.text(text)
      this.textInStore(text)
    })

    this.$on('formula:done', () => {
      this.selection.current.focus()
    })
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
  }

  async resizeTable(e) {
    try {
      const data = await resize(this.$root, e)
      this.$dispatch(actions.tableResize(data))
    } catch (e) {
      console.warn('Resize', e.message)
    }
  }

  onMousedown(e) {
    if (shouldResize(e)) {
      this.resizeTable(e)
    } else if (isCell(e)) {
      const $target = $(e.target)
      if (e.shiftKey) {
        const $cells = matrix($target, this.selection.current).
            map(id => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($cells)
      } else {
        this.selectCell($target)
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
      this.selectCell($next)
    }
  }

  textInStore(value) {
    this.$dispatch(actions.changeText({
      id: this.selection.current.getId(),
      value
    }))
  }

  onInput(e) {
    this.textInStore($(e.target).text())
  }
}

