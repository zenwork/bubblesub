import { PUB_REQUEST_EVENT_NAME, PublicationRequest, Update } from './subscriber'

export function publisher(parent: HTMLElement | ShadowRoot) {
  /**
   * Expose a Subscibable over events
   * @param name
   * @param initialValue
   * @param parent
   */
  return {
    create: function createPublication<T>(name: string, initialValue: T): Publication<T> {
      const publication = new Publication<T>(name, initialValue)

      const requestListener = (event: CustomEvent) => {
        const request: PublicationRequest<T> = event.detail
        if (request.name === publication.name) {
          console.debug(`PROVISION: ${publication.name}`)
          // provide publication to requester
          request.pub = publication
          // stop propagation because only one publisher exists for each publication
          event.stopPropagation()
        }
      }
      // @ts-ignore
      parent.addEventListener(PUB_REQUEST_EVENT_NAME, requestListener)
      console.debug(`SETUP PUB: ${name}`)
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
  private publishedValue: T

  constructor(name: string, value: T) {
    this.name = name
    this.publishedValue = value
  }

  get value(): T {
    return this.publishedValue
  }

  update(value: T) {
    this.publishedValue = value
    this.subscriptions.forEach((val) => val(this.value))
  }

  subscribe(fn: Update<T>) {
    this.subscriptions.push(fn)
  }
}
