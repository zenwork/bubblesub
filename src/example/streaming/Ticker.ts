import { sub } from '../../decorators.js'

export class Ticker extends HTMLElement {

  @sub({update(change) { this.updateOnChange(change)}})
  priceStream: { name: string, price: number } | null

  lastPrice: number

  connectedCallback() {
    this.innerHTML = `
        <ul class="prices"></ul>
        <h2 class="change">apple price change: </h2>
    `
    this.priceStream
  }

  updateOnChange(change: { name: string, price: number }) {
    this.updatePrice(change)
    this.updateApplePriceChange(change)
  }

  private updateApplePriceChange(change: { name: string; price: number }) {
    if (change.name === 'apples') {
      this.querySelector('.change').innerHTML = `apple price change: ${change.price - this.lastPrice}`
      this.lastPrice = change.price
    }
  }

  private updatePrice(change: { name: string; price: number }) {
    const element = this.querySelector('.' + change.name)
    const template = `${change.name}: ${change.price}`
    if (element) {
      element.innerHTML = template
    } else {
      const item = document.createElement('li')
      item.className = change.name
      item.innerHTML = `${change.name}: ${change.price}`
      this.querySelector('.prices').appendChild(item)
    }
  }
}

customElements.define('ex-ticker', Ticker)
