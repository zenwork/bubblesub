import { PUB_REQUEST_EVENT_NAME, PublicationRequest, Update } from "./SubscriberMixin";

/**
 * Publishing mixin
 * @param superclass class to mixin with
 * @constructor
 */
export const PublisherMixin = (superclass: any) => class extends superclass {

  /**
   * Expose a Subscibable over events
   * @param name
   * @param initialValue
   */
  publish<T>(name: string, initialValue: T): Publication<T> {
    let publication = new Publication<T>(name, initialValue);
    let requestListener = (event: CustomEvent) => {
      let request: PublicationRequest<T> = event.detail;
      if (request.name === publication.name) {
        console.debug(`handling pub request for: ${publication.name}`);
        // provide publication to requestor
        request.pub = publication;
        // stop propagation because only one publisher exists for each publication
        event.stopPropagation();
      }
    };
    this.addEventListener(PUB_REQUEST_EVENT_NAME, requestListener);
    return publication
  }
};

/**
 * A published value
 */
export class Publication<T> {

  public readonly name: string;
  private subscriptions = new Array<Update<T>>();
  private publishedValue: T;

  constructor(name: string, value: T) {
    this.name = name;
    this.publishedValue = value;
  }

  get value(): T {
    return this.publishedValue
  }

  update(value: T) {
    this.publishedValue = value;
    this.subscriptions.forEach((value) => value(this.value))
  }

  public subscribe(fn: Update<T>) {
    this.subscriptions.push(fn);
  }
}
