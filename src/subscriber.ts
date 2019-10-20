import { Publication } from './publisher.js'
export const PUB_REQUEST_EVENT_NAME: string = 'subscribablerequest'

export function subscriber(parent: HTMLElement | ShadowRoot) {
  /**
   * Subscribe for changes to a subscibable. The update is called once on subscription to get the initial value.
   * @param name pub name
   * @param update function called once each time the pub changes
   * @param retry retry getting a handle on publication if it is not yet available.
   */
  return {
    request: function request<T>(name: string, update: Update<T>, retry: boolean = true) {
      const publication = new PublicationRequest<T>(name)
      console.debug('SETUP SUB: ' + publication.name)

      // seek a parent that provides this publication
      const event = new CustomEvent(
        PUB_REQUEST_EVENT_NAME,
        {
          detail: publication,
          bubbles: true,
          cancelable: true,
          composed: true
        })

      // request the publication
      parent.dispatchEvent(event)

      tryIt(10)

      function tryIt(timeout: number) {
        if (publication.value == null) {
          setTimeout(() => {
            console.debug('RETRY SUB: ' + publication.name)
            parent.dispatchEvent(event)
            if (retry) tryIt((timeout * 5))
          }, timeout)
        } else {
          begin()
        }
      }

      function begin() {
        // subscribe for updates
        publication.subscribe(update)

        // force publish initial value
        update(publication.value)
      }

    }
  }

}

/**
 * Request for publication to subscribe to
 */
export class PublicationRequest<T> {
  readonly name: string
  pub?: Publication<T>

  constructor(name: string) {
    this.name = name
  }

  get value(): T | null | undefined {
    return this.pub ? this.pub.value : null
  }

  subscribe(update: Update<T>) {
    return this.pub ? this.pub.subscribe(update) : null
  }
}

/**
 * Publication update callback
 */
export type Update<T> = (updated: T | null | undefined) => void
