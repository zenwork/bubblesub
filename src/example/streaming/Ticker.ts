import { sub } from '../../decorators'

import { updateOnChange } from './util'

export class Ticker extends HTMLElement {

  @sub({name: 'macintosh', update(v: number) {this.update(v)}})
  apples: number
  @sub()
  bananas: number
  @sub()
  grapes: number
  @sub({name: 'kiwi'})
  kiwis: number
  @sub()
  oranges: number

  lastPrice: number

  connectedCallback() {
    this.innerHTML = `
        <ul class="prices"></ul>
        <h2 class="change">apple price change: </h2>
    `
    // watch local price changes and update DOM. Usually this is done by some library like
    // lit-html, lit-element, or react
    updateOnChange('bananas', this)
    updateOnChange('grapes', this)
    updateOnChange('kiwis', this)
    updateOnChange('oranges', this)
    updateOnChange('apples', this)
  }

  update(v: number) {
    if (this.apples) {
      this.querySelector('.change').innerHTML = `apple price change: ${v - this.lastPrice}`
      this.lastPrice = this.apples
    }
  }
}

customElements.define('ex-ticker', Ticker)
