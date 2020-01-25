import { Update } from './subscribe'

/**
 * Request for publication to subscribe to
 */
export class PublicationRequest<T> {
  readonly name: string
  private internalPublication?: Publication<T>
  private subscriptions = new Array<Update<T>>()
  private firstSubscriptions = new Array<Update<T>>()
  private lastSubscriptions = new Array<Update<T>>()

  constructor(name: string) {
    this.name = name
  }

  get value(): T | null | undefined {
    return this.pub ? this.pub.value : null
  }

  get pub() {return this.internalPublication}

  set pub(pub: Publication<T>) {
    if (!this.internalPublication) {
      this.subscriptions.forEach((u) => pub.subscribe(u))
      this.subscriptions.length = 0

      this.firstSubscriptions.forEach((u) => pub.subscribeForFirst(u))
      this.firstSubscriptions.length = 0

      this.lastSubscriptions.forEach((u) => pub.subscribeForLast(u))
      this.lastSubscriptions.length = 0
    }

    this.internalPublication = pub
  }

  subscribe(update: Update<T>) {
    if (this.pub) {
      this.pub.subscribe(update)
    } else {
      this.subscriptions.push(update)
    }
  }

  subscribeForFirst(fn: Update<T>) {
    if (this.pub) {
      this.pub.subscribeForFirst(fn)
    } else {
      this.lastSubscriptions.push(fn)
    }
  }

  subscribeForLast(fn: Update<T>) {
    if (this.pub) {
      this.pub.subscribeForLast(fn)
    } else {
      this.lastSubscriptions.push(fn)
    }
  }
}

/**
 * A published value
 */
export class Publication<T> {

  readonly name: string
  private subscriptions = new Array<Update<T>>()
  private firstSubscriptions = new Array<Update<T>>()
  private lastSubscriptions = new Array<Update<T>>()
  private lastValue: T
  private publishedValues: T[] = new Array<T>()
  private closed = false
  private readonly maxSize: number
  private firstUpdateOccured: boolean = true
  private count = 0

  /**
   * Constructor
   * @param name - publication name
   * @param value - initial value
   * @param maxSize - maximum size of publication history. A value < 0  is considered as infinite
   */
  constructor(name: string, value: T = null, maxSize: number = -1) {
    this.name = name
    this.maxSize = maxSize
    if (value !== null) { this.publishedValues.push(value)}
  }

  get value(): T | null {
    return this.last
  }

  get length() {
    return this.publishedValues.length
  }

  get first(): T | null {
    if (this.length > 0) {
      return this.publishedValues[0]
    } else {
      return null
    }
  }

  get last(): T | null {
    if (this.length > 0) {
      return this.publishedValues[this.length - 1]
    } else {
      return null
    }
  }

  close() {
    this.closed = true
    if (this.lastValue) {
      this.lastSubscriptions.forEach((sub) => sub(this.lastValue))
    }
  }

  update(value: T) {
    if (!this.closed) {

      if (this.firstUpdateOccured) {
        this.firstUpdateOccured = false
        this.firstSubscriptions.forEach((updateFunction) => updateFunction(value))
      }

      this.publishedValues.push(value)
      this.lastValue = value
      this.count++
      this.subscriptions.forEach((updateFunction) => updateFunction(value))

      if (this.maxSize > -1 && this.length > this.maxSize) this.publishedValues.shift()
    }
  }

  subscribe(fn: Update<T>) {
    this.subscriptions.push(fn)
    if (this.length > 0) {
      setTimeout(() => {this.publishedValues.forEach((v) => fn(v))}, 0)
    }
  }

  subscribeForFirst(fn: Update<T>) {
    if (this.maxSize === -1 || this.count <= this.maxSize) {
      this.firstSubscriptions.push(fn)
      if (this.first) {
        setTimeout(() => {fn(this.first)}, 0)
      }
    } else  {
      console.warn('subscribing for first is to late')
    }
  }

  subscribeForLast(fn: Update<T>) {
    this.lastSubscriptions.push(fn)
    if (this.closed && this.maxSize !== 0) {
      setTimeout(() => {fn(this.last)}, 0)
    }

    if (this.closed && this.maxSize === 0) {
      console.warn('subscribing for last is to late')
    }
  }

  printAll() {
    this.publishedValues.forEach((p: T, i: number) => {console.log(`${i}: ${JSON.stringify(p)}`)})
    console.log()
  }
}
