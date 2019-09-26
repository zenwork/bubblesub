import { pub } from '../../decorators'

export { Ticker } from './Ticker'

// random integer generator
function getRandomInt(x: number, y: number) {
  return Math.floor(Math.random() * ((y - x) + 1) + x)
}

// random price stream generator
function generator(size: number, speed: number, callback: (value: number) => void) {
  const x = 0
  const y = 1000

  function getPrice(remaining: number) {
    remaining = remaining - 1
    setTimeout(() => {
      const value = getRandomInt(x, y)
      callback(value)
      if (remaining > 0) getPrice(remaining)
    }, speed)
  }

  getPrice(size)

}

export const config = {initialValue: 0, pubTarget: document.body}

// Start price streams
export class PriceStreamer {

  @pub(config)
  macintosh: number

  @pub(config)
  bananas: number

  @pub(config)
  grapes: number

  @pub(config)
  kiwi: number

  @pub(config)
  oranges: number

  constructor() {
    this.updatePrice('macintosh')
    this.updatePrice('bananas')
    this.updatePrice('grapes')
    this.updatePrice('kiwi')
    this.updatePrice('oranges')
  }

  updatePrice(name) {
    const speed = getRandomInt(200, 1000)
    console.debug(`NEW publishing prices for ${name} every ${speed} millis`)
    generator(300, speed,
      value => {
        this[name] = value
      })
  }

}

export class Prices extends HTMLElement {
  priceStreamer: PriceStreamer

  constructor() {
    super()
    console.log('start')
    this.priceStreamer = new PriceStreamer()
  }
}

customElements.define('ex-prices', Prices)
