import { pub } from '../../decorators.js'

export { Ticker } from './Ticker.js'

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

  @pub({initialValue: null, pubTarget: document.body})
  prices: { name: string, price: number }

  constructor() {
    this.updatePrice('apples')
    this.updatePrice('bananas')
    this.updatePrice('grapes')
    this.updatePrice('kiwi')
    this.updatePrice('oranges')
  }

  updatePrice(name: string) {
    const speed = getRandomInt(200, 1000)
    console.debug(`NEW publishing prices for ${name} every ${speed} millis`)
    generator(30, speed,
      value => {
        // this[name] = value
        this.prices = {name, price: value}
      })
  }

}

new PriceStreamer()
