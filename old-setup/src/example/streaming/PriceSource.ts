// random integer generator
import { stream } from '../../api.js'
import { Publication } from '../../publication'

function getRandomInt(x: number, y: number) {
  return Math.floor(Math.random() * ((y - x) + 1) + x)
}

interface Price { name: string, price: number }

/**
 * This is a moke price source. It generates random prices for five different fruits.
 */
export class PriceSource {

  closed: boolean = false
  counter: number = 0
  publication: Publication<Price>

  constructor(prices?: Price[], interval?: number) {
    this.publication = stream<Price>('prices')

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
