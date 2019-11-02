import { customElement, html, LitElement, property } from 'lit-element'
import { subscribe } from '../../subscribe.js'

interface Tick {
  name: string,
  price: number
}

@customElement('ex-ticker')
export class Ticker extends LitElement {

  @property()
  applePrices: number[]

  @property()
  prices: Tick[]

  @property()
  first: Tick

  @property()
  last: Tick

  constructor() {
    super()
    this.prices = new Array<Tick>()
    this.applePrices = new Array<number>()

    subscribe(this)
      .to<Tick>('prices')
      .map((tick: Tick) => {
        if (this.prices.filter((t: Tick) => t.name === tick.name).length === 1) {
          this.prices
            .map((t: Tick) => {
              if (t.name === tick.name) t.price = tick.price
              return t
            })
        } else {
          this.prices.push(tick)
        }

        if (tick.name === 'apples') this.applePrices.push(tick.price)
        this.requestUpdate()

      })
      .mapFirst((first: Tick) => {
        this.first = first
      })
      .mapLast((last: Tick) => {
        this.last = last
      })

  }

  render() {
    return html`
        <h1>prices</h1>
        <ul class="prices">
            ${this.prices.map((t: Tick) => html`<li>${t.name}:${t.price}</li>`)}
        </ul>
        <h2>first price was</h2>
        <ul class="prices">
            <li>${this.first ? this.first.name : ''}:${this.first ? this.first.price : ''}</li>
        </ul>
        <h2>last price was</h2>
        <ul class="prices">
            <li>${this.last ? this.last.name : ''}:${this.last ? this.last.price : ''}</li>
        </ul>
        <h2 class="change">apple price change: ${this.applePrices[this.applePrices.length - 1] - this.applePrices[this.applePrices.length - 2]}</h2>
    `
  }
}
