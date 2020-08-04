import { PUB_REQUEST_EVENT_NAME } from './index.js'
import { Publication, PublicationRequest } from './publication.js'

export const handlers: Map<HTMLElement | ShadowRoot, Map<string, HandlerBuilder<any>>> = new Map()

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

      if (handlers.get(parent) && handlers.get(parent).get(name)) {
        // listener exists so just return stored publication
        return handlers.get(parent).get(name).publication

      } else {

        // create new publication and listener
        const publication = new Publication<T>(name, initialValue, maxSize)
        const builder = new HandlerBuilder(publication)

        if (!handlers.get(parent)) handlers.set(parent, new Map<string, HandlerBuilder<any>>())

        handlers.get(parent).set(name, builder)

        parent.addEventListener(PUB_REQUEST_EVENT_NAME, builder.build() as EventListenerOrEventListenerObject)
        return publication
      }
    }
  }
}

export class HandlerBuilder<T> {
  readonly publication: Publication<T>

  constructor(publication: Publication<T>) {
    this.publication = publication
  }

  build(): (event: CustomEvent) => void {
    return (event: CustomEvent) => {
      const request: PublicationRequest<T> = event.detail
      if (request.name === this.publication.name) {
        // provide publication to requester
        request.pub = this.publication
        // stop propagation because only one publisher exists for each publication
        event.stopPropagation()
      }
    }
  }
}
