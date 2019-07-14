import { Constructor } from 'mix-with';
import { Publication } from './PublisherMixin';
export declare const PUB_REQUEST_EVENT_NAME: string;
/**
 * Subscriber mixin
 * @param superclass
 * @constructor
 */
export declare const SubscriberMixin: (superclass: Constructor<{}>) => {
    new (...args: any[]): {
        /**
         * Subscribe for changes to a subscribable. The update is called once on subscription to get the initial value.
         * @param name pub name
         * @param update function called once each time the pub changes
         */
        subscribe<T>(name: string, update: Update<T>): void;
    };
};
/**
 * Request for publication to subscribe to
 */
export declare class PublicationRequest<T> {
    readonly name: string;
    pub?: Publication<T>;
    constructor(name: string);
    readonly value: T | null;
    subscribe(update: Update<T>): void | null;
}
/**
 * Publication update callback
 */
export declare type Update<T> = (updated: T | null) => void;
//# sourceMappingURL=SubscriberMixin.d.ts.map