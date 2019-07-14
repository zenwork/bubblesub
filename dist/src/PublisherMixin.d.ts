import { Constructor } from 'mix-with';
import { Update } from './SubscriberMixin';
/**
 * Publishing mixin
 * @param superclass class to mixin with
 * @constructor
 */
export declare const PublisherMixin: (superclass: Constructor<{}>) => {
    new (...args: any[]): {
        /**
         * Expose a Subscibable over events
         * @param name
         * @param initialValue
         */
        publish<T>(name: string, initialValue: T): Publication<T>;
    };
};
/**
 * A published value
 */
export declare class Publication<T> {
    readonly name: string;
    private subscriptions;
    private publishedValue;
    constructor(name: string, value: T);
    readonly value: T;
    update(value: T): void;
    subscribe(fn: Update<T>): void;
}
//# sourceMappingURL=PublisherMixin.d.ts.map