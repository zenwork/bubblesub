import { Publication } from "./PublisherMixin";

export const PUB_REQUEST_EVENT_NAME: string = 'subscribablerequest';

/**
 * Subscriber mixin
 * @param superclass
 * @constructor
 */
export const SubscriberMixin = (superclass: any) => class extends superclass {

  /**
   * Subscribe for changes to a subscibable. The update is called once on subscription to get the initial value.
   * @param dispatcher element from which to make the request
   * @param name pub name
   * @param update function called once each time the pub changes
   */
  subscribe<T>(name: string, update: Update<T>) {

    const publication = new PublicationRequest<T>(name);

    // seek a parent that provides this publication
    let event = new CustomEvent(
      PUB_REQUEST_EVENT_NAME,
      {
        detail: publication,
        bubbles: true,
        cancelable: true,
        composed: true
      });

    // request the publication
    this.dispatchEvent(event);

    // subscribe for updates
    publication.subscribe(update);

    console.debug('first update for: ' + publication.name);

    //force publish initial value
    update(publication.value);
  }
};

/**
 * Request for publication to subscribe to
 */
export class PublicationRequest<T> {
  readonly name: string;
  pub?: Publication<T>;

  constructor(name: string) {
    this.name = name;
  }

  get value(): T | null {
    return this.pub ? this.pub.value : null;
  }

  subscribe(update: Update<T>) {
    return this.pub ? this.pub.subscribe(update) : null;
  }
}

/**
 * Publication update callback
 */
export interface Update<T> {(updated: T | null): void;}


