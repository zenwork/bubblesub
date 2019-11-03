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
  private publishedValues: T[] = new Array<T>()
  private closed = false

  constructor(name: string, value: T = null) {
    this.name = name
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
    this.lastSubscriptions.forEach((sub) => sub(this.last))
  }

  update(value: T) {
    if (this.length === 0) {
      this.firstSubscriptions.forEach((updateFunction) => updateFunction(value))
    }
    this.publishedValues.push(value)
    this.subscriptions.forEach((updateFunction) => updateFunction(value))
  }

  subscribe(fn: Update<T>) {
    this.subscriptions.push(fn)
    if (this.length > 0) {
      setTimeout(() => {this.publishedValues.forEach((v) => fn(v))}, 0)
    }
  }

  subscribeForFirst(fn: Update<T>) {
    this.firstSubscriptions.push(fn)
    if (this.first) {
      setTimeout(() => {fn(this.first)}, 0)
    }
  }

  subscribeForLast(fn: Update<T>) {
    this.lastSubscriptions.push(fn)
    if (this.closed) {
      setTimeout(() => {fn(this.last)}, 0)
    }
  }

  printAll() {
    this.publishedValues.forEach((p: T, i: number) => {console.log(`${i}: ${JSON.stringify(p)}`)})
    console.log()
  }
}
