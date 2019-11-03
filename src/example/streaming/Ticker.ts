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

  @property()
  counter: number

  constructor() {
    super()
    this.prices = new Array<Tick>()
    this.applePrices = new Array<number>()
    this.counter = 0

    subscribe(this)
      .to<Tick>('prices')
      .map((tick: Tick) => {
        this.counter++
        if (this.prices.filter((t: Tick) => t.name === tick.name).length === 1) {
          this.prices
            .map((t: Tick) => {
              if (t.name === tick.name) t.price = tick.price
              return t
            })
        } else {
          this.prices.push(this.copy(tick))
        }

        if (tick.name === 'apples') this.applePrices.push(tick.price)
        this.requestUpdate()

      })
      .mapFirst((first: Tick) => {
        this.first = this.copy(first)
      })
      .mapLast((last: Tick) => {
        this.last = this.copy(last)
      })

  }

  render() {
    return html`
        <h1>prices</h1>
        <ul id="prices">
            ${this.prices.map((t: Tick) => html`<li id="${t.name}">${t.name}:${t.price}</li>`)}
        </ul>
        <h2>first price was</h2>
        <ul>
            <li id="first">${this.first ? this.first.name : ''}:${this.first ? this.first.price : ''}</li>
        </ul>
        <h2>last price was</h2>
        <ul>
            <li id="last">${this.last ? this.last.name : ''}:${this.last ? this.last.price : ''}</li>
        </ul>
        <h2 class="change">apple price change: ${this.applePrices[this.applePrices.length - 1] - this.applePrices[this.applePrices.length - 2]}</h2>
        <h2 class="change">counter: ${this.counter}</h2>
    `
  }

  private copy(last: Tick) {
    return JSON.parse(JSON.stringify(last))
  }
}
