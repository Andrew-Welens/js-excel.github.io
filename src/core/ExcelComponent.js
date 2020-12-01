import {DomLisneter} from './DomLisneter'

export class ExcelComponent extends DomLisneter {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.observer = options.observer
    this.subscribe = options.subscribe || []
    this.store = options.store
    this.unsubscribers = []

    this.prepare()
  }

  prepare() {
  }

  toHtml() {
    return ''
  }

  $emit(e, ...args) {
    this.observer.dispatch(e, ...args)
  }

  $on(e, fn) {
    const unsub = this.observer.subscribe(e, fn)
    this.unsubscribers.push(unsub)
  }

  $dispatch(action) {
    this.store.dispatch(action)
  }

  storeChanged() {
  }

  isWatching(key) {
    return this.subscribe.includes(key)
  }

  init() {
    this.initDOMListeners()
  }

  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach(unsub => unsub())
  }
}
