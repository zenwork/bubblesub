import { PUB_REQUEST_EVENT_NAME } from './index.js'
import { Publication, PublicationRequest } from './publication.js'

export function publish(parent: HTMLElement | ShadowRoot) {
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
