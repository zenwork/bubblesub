import { sub } from '../../decorators'
import { updateOnChange } from './util'

export class Ticker extends HTMLElement {

  @sub('macintosh')
  apples: number
  @sub()
  bananas: number
  @sub()
  grapes: number
  @sub('kiwi')
  kiwis: number
  @sub()
  oranges: number

  connectedCallback() {
    this.innerHTML = '<ul class="prices"></ul>'
    // watch local price changes and update DOM. Usually this is done by some library like
    // lit-html, lit-element, or react
    updateOnChange('bananas', this)
    updateOnChange('grapes', this)
    updateOnChange('kiwis', this)
    updateOnChange('oranges', this)
    updateOnChange('apples', this)
  }
}

customElements.define('ex-ticker', Ticker)
