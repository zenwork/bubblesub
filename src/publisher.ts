import { PUB_REQUEST_EVENT_NAME, PublicationRequest, Update } from './subscribe.js'

export function publisher(parent: HTMLElement | ShadowRoot) {
  /**
   * Expose a Subscibable over events
   * @param name
   * @param initialValue
   * @param parent
   */
  return {
    create: function createPublication<T>(name: string, initialValue?: T | null | undefined): Publication<T> {
      const publication = new Publication<T>(name, initialValue)

      const requestListener = (event: CustomEvent) => {
        const request: PublicationRequest<T> = event.detail
        if (request.name === publication.name) {
          // console.debug(`PROVISION: ${publication.name}`)
          // provide publication to requester
          request.pub = publication
          // stop propagation because only one publisher exists for each publication
          event.stopPropagation()
        }
      }
      // @ts-ignore
      parent.addEventListener(PUB_REQUEST_EVENT_NAME, requestListener)
      // console.debug(`SETUP PUB: ${name}`)
      return publication
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
