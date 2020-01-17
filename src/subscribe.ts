import { PUB_REQUEST_EVENT_NAME } from './index.js'
import { PublicationRequest } from './publication.js'

/**
 * Subscribe to an observable. In most cases, passing `this` is recommended. The observable provider should be
 * somewhere up the DOM tree from the provided `child`.
 * @param descendant `HTMLElelement` or `ShadowRoot` descendant of observable provider
 */
export function subscribe(descendant: HTMLElement | ShadowRoot) {

  /**
   * Subscribe for changes to a subscibable. The update is called once on subscription to get the initial value.
   * @param name pub name
   * @param update function called once each time the pub changes
   * @param retry retry getting a handle on publication if it is not yet available.
   */

  return {
    /**
     * Identify by name the observable you are interested in. Use `T` generic to define the type of the observable.
     * @param name unique observable identifier
     *
     */
    to: function to<T>(name: string): To<T> { return new To<T>(name, descendant)}
  }

}

/**
 * Publication update callback
 */
export type Update<T> = (updated: T | null) => void

/**
 * Wrapper around subscription interface
 */
class To<T> {
  name: string
  target: HTMLElement | ShadowRoot

  constructor(name: string, target: HTMLElement | ShadowRoot) {
    this.name = name
    this.target = target
  }

  /**
   * Map the values as they are updated. Whether the update is a replacement for a single value or a stream of values
   * is determined by the
   * observsable provider.
   * @param fn {@link Update}
   */
  map(fn: Update<T>): To<T> {
    connect(
      this.name,
      true,
      (pub: PublicationRequest<T>) => {
        pub.subscribe(fn)
      },
      this.target)

    return this
  }

  /**
   * Map the first update only. Useful if the first update should trigger special processing OR if only a single update
   * is expected.
   * @param fn {@link Update}
   */
  mapFirst(fn: Update<T>): To<T> {
    connect(
      this.name,
      true,
      (pub: PublicationRequest<T>) => {
        pub.subscribeForFirst(fn)
      },
      this.target)

    return this
  }

  /**
   *
   * @param fn {@link Update}
   */
  mapLast(fn: Update<T>): To<T> {
    connect(
      this.name,
      true,
      (pub: PublicationRequest<T>) => {
        pub.subscribeForLast(fn)
      },
      this.target)
    return this
  }

  /**
   * Map first value as a promise. This is useful to retrieve a service or a singleton.
   */
  toPromise(): Promise<T> {
    return new Promise<T>((resolve) => {
      this.mapFirst(updated => resolve(updated))
    })
  }
}

/**
 * Connection strategy that connect observer and observable over events
 * @param name observable name
 * @param retry
 * @param beginFn startup behavior once observable captured
 * @param descendant
 */
function connect<T>(name: string,
                    retry: boolean,
                    beginFn: (pub: PublicationRequest<T>) => void,
                    descendant: HTMLElement | ShadowRoot): PublicationRequest<T> {

  const publication = new PublicationRequest<T>(name)

  // create custom event request
  const requestEvent = new CustomEvent(
    PUB_REQUEST_EVENT_NAME,
    {
      detail: publication,
      bubbles: true,
      cancelable: true,
      composed: true
    })

  // seek the observable provider somewhere up the DOM
  descendant.dispatchEvent(requestEvent)

  retryUntilThere(5, retry)

  /**
   * retry reaching observable at intervals. Retries delay grows after each failed attempt
   * @param initialTimeout initial timeout.
   * @param shouldRetry try more than once
   */
  function retryUntilThere(initialTimeout: number, shouldRetry: boolean) {
    // check if provider has filled value
    if (publication.value == null) {
      setTimeout(() => {
        descendant.dispatchEvent(requestEvent)
        if (shouldRetry) retryUntilThere(initialTimeout < 1000 ? (initialTimeout * 2) : 500, shouldRetry)
      }, initialTimeout)
    } else {
      beginFn(publication)
    }
  }

  return publication
}
