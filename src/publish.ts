import { PUB_REQUEST_EVENT_NAME } from './index.js'
import { Publication, PublicationRequest } from './publication.js'

/**
 * Create a publication
 * @param parent dom element from which it will listen for events
 */
export function publish(parent: HTMLElement | ShadowRoot) {
  /**
   * Expose a Subscibable over events
   * @param name - publication name
   * @param initialValue - optional
   * @param maxSize - max size of publication history. By default has no limit
   */
  return {
    create: function createPublication<T>(name: string,
                                          initialValue?: T | null | undefined,
                                          maxSize: number = -1): Publication<T> {
      const publication = new Publication<T>(name, initialValue, maxSize)

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
