import { Publication, publisher } from '../../publisher'

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

// Start price streams
class PriceStreamer {
  prices: Map<string, Publication<number>> = new Map()

  constructor() {
    const pub = publisher(document.body)

    this.prices.set('Apples', pub.create<number>('apples', 0))
    this.prices.set('Bananas', pub.create<number>('bananas', 0))
    this.prices.set('Grapes', pub.create<number>('grapes', 0))
    this.prices.set('Kiwis', pub.create<number>('kiwis', 0))
    this.prices.set('Oranges', pub.create<number>('oranges', 0))

    this.prices.forEach((price, name) => {
      const speed = getRandomInt(100, 5000)
      console.log(`publishing prices for ${name} every ${speed} millis`)
      return generator(300, speed,
        value => {
          console.debug(name + ':' + value)
          price.updateValue(value)
        })
    })

  }

}

new PriceStreamer()
