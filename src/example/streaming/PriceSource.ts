// random integer generator
import { pub } from '../../decorators.js'
import { publisher } from '../../publisher.js'

function getRandomInt(x: number, y: number) {
  return Math.floor(Math.random() * ((y - x) + 1) + x)
}

// Start price streams
export class PriceSource {

  @pub({pubTarget: document.body})
  prices: { name: string, price: number }

  closed: boolean = false

  constructor(prices?: Array<{ price: number; name: string } | { price: number; name: string }>,
              interval?: number) {
    if (!prices) {
      this.updatePrice('apples', interval)
      this.updatePrice('bananas', interval)
      this.updatePrice('grapes', interval)
      this.updatePrice('kiwi', interval)
      this.updatePrice('oranges', interval)
    } else {
      const publication = publisher(document.body).create<{ price: number; name: string }>('prices')
      setTimeout(() => {
        prices.forEach((p) => {publication.update(p)})
        publication.printAll()
        publication.close()
      }, 0)
    }
  }

  updatePrice(name: string, interval?: number) {
    interval = interval || getRandomInt(200, 1000)
    console.debug(`NEW publishing prices for ${name} every ${interval} millis`)
    this.generator(30, interval,
      value => {
        // this[name] = value
        this.prices = {name, price: value}
      })
  }

  close() {
    this.closed = true
  }

  // random price stream generator
  private generator(size: number, speed: number, callback: (value: number) => void) {
    this.getNextPrice(size, speed, callback)
  }

  private getNextPrice(remaining: number, speed: number, callback: (value: number) => void) {
    if (!this.closed) {
      remaining = remaining - 1
      setTimeout(() => {
        const value = getRandomInt(0, 1000)
        callback(value)
        if (remaining > 0) this.getNextPrice(remaining, speed, callback)
      }, speed)
    }
  }
}
