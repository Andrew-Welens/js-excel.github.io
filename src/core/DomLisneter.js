export class DomLisneter {
  constructor($root) {
    if (!$root) {
      throw new Error(`Error DOMLisneter`)
    }
    this.$root = $root
  }
}
