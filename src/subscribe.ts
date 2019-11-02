import { Publication } from './publisher.js'
export const PUB_REQUEST_EVENT_NAME: string = 'subscribablerequest'

export function subscribe(parent: HTMLElement | ShadowRoot) {

  /**
   * Subscribe for changes to a subscibable. The update is called once on subscription to get the initial value.
   * @param name pub name
   * @param update function called once each time the pub changes
   * @param retry retry getting a handle on publication if it is not yet available.
   */

  return {
    request: function request<T>(name: string, update: Update<T>, retry: boolean = true) {

      function begin(publication: PublicationRequest<T>) {
        // subscribe for updates
        publication.subscribe(update)

        // force publish initial value
        update(publication.value)
      }

      setup(name, retry, begin, parent)

    },
    to: function to<T>(name: string): To<T> { return new To<T>(name, parent)}
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
    if (this.pub) this.pub.subscribe(update)
  }

  subscribeForFirst(fn: Update<T>) {
    if (this.pub) this.pub.subscribeForFirst(fn)
  }

  subscribeForLast(fn: Update<T>) {
     if (this.pub) this.pub.subscribeForLast(fn)
  }
}

/**
 * Publication update callback
 */
export type Update<T> = (updated: T | null | undefined) => void

class To<T> {
  name: string
  target: HTMLElement | ShadowRoot

  constructor(name: string, target: HTMLElement | ShadowRoot) {
    this.name = name
    this.target = target
  }

  map(fn: Update<T>): To<T> {
    setup(
      this.name,
      true,
      (pub: PublicationRequest<T>) => {
        pub.subscribe(fn)
      },
      this.target)

    return this
  }

  mapFirst(fn: Update<T>): To<T> {
    setup(
      this.name,
      true,
      (pub: PublicationRequest<T>) => {
        pub.subscribeForFirst(fn)
      },
      this.target)

    return this
  }

  mapLast(fn: Update<T>): To<T> {
    setup(
      this.name,
      true,
      (pub: PublicationRequest<T>) => {
        pub.subscribeForLast(fn)
      },
      this.target)
    return this
  }
}

function setup<T>(name: string,
                  retry: boolean,
                  beginFn: (pub: PublicationRequest<T>) => void,
                  parent: HTMLElement | ShadowRoot): PublicationRequest<T> {

  const publication = new PublicationRequest<T>(name)
  // console.debug('SETUP SUB: ' + publication.name)

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

  retryUntilThere(10)

  function retryUntilThere(timeout: number) {
    if (publication.value == null) {
      setTimeout(() => {
        // console.debug('RETRY SUB: ' + publication.name)
        parent.dispatchEvent(event)
        if (retry) retryUntilThere((timeout * 5))
      }, timeout)
    } else {
      beginFn(publication)
    }
  }

  return publication
}
