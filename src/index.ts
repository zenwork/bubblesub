import { publish } from './publish'
export { publish } from './publish.js'
export { subscribe } from './subscribe.js'
export * from './decorators'
export { PublicationRequest } from './publication.js'
export { Publication } from './publication.js'

/**
 * The general purpose custom event name visible on the DOM used in bubblesub
 */
export const PUB_REQUEST_EVENT_NAME: string = 'bubblesubpublicationrequest'
