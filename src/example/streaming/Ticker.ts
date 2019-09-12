import { subscriber } from '../../subscriber'

export class Ticker extends HTMLElement {

  apples: number = 0

  constructor() {
    super()
    this.innerHTML = `
      <ul>
        <li class="apples">n/a</li>
        <li class="bananas">n/a</li>
        <li class="grapes">n/a</li>
        <li class="kiwis">n/a</li>
        <li class="oranges">n/a</li>
      </ul>
    `
    this.sub('apples')
    this.sub('bananas')
    this.sub('grapes')
    this.sub('kiwis')
    this.sub('oranges')
  }

  private sub(name) {
    subscriber(this)
      .request<number>(name, price => {
        this.querySelector('.' + name).innerHTML = `<li class="${name}">${name}: ${price}</li>`
        this.apples = price
      })
  }
}

customElements.define('ex-ticker', Ticker)
