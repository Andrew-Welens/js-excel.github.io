import {DomLisneter} from './DomLisneter'

export class ExcelComponent extends DomLisneter {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.observer = options.observer

    this.prepare()
  }

  prepare() {
  }

  toHtml() {
    return ''
  }

  init() {
    this.initDOMListeners()
  }

  destroy() {
    this.removeDOMListeners()
  }
}
