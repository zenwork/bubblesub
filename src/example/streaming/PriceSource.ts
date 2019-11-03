// random integer generator
import { pub } from '../../decorators.js'
import { Publication, publisher } from '../../publisher.js'

function getRandomInt(x: number, y: number) {
  return Math.floor(Math.random() * ((y - x) + 1) + x)
}

// Start price streams
export class PriceSource {

  closed: boolean = false
  counter: number = 0
  publication: Publication<{ name: string, price: number }>

  constructor(prices?: Array<{ price: number; name: string } | { price: number; name: string }>,
              interval?: number) {
    this.publication = publisher(document.body).create<{ price: number; name: string }>('prices')

    if (!prices) {
      this.updatePrice('apples', interval)
      this.updatePrice('bananas', interval)
      this.updatePrice('grapes', interval)
      this.updatePrice('kiwi', interval)
      this.updatePrice('oranges', interval)
    } else {

      setTimeout(() => {
        prices.forEach((p) => {this.publication.update(p)})
        this.publication.close()
      }, 0)
    }

    this.checkDone()
  }

  updatePrice(name: string, interval?: number) {
    interval = interval || getRandomInt(200, 1000)
    console.debug(`NEW publishing prices for ${name} every ${interval} millis`)
    this.generator(30, interval,
      value => {
        this.publication.update({name, price: value})
      })
  }

  close() {
    this.closed = true
    this.publication.close()
  }

  private checkDone() {
    setTimeout(() => {

      if (this.counter === 150) this.close()
      this.checkDone()
    }, 100)
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
        this.counter++
        if (remaining > 0) this.getNextPrice(remaining, speed, callback)
      }, speed)
    }
  }
}
