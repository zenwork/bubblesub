declare const TestPublisher_base: import("mix-with/lib").Constructor<HTMLElement & {
    [x: string]: any;
    publish<T>(name: string, initialValue: T): import("../PublisherMixin").Publication<T>;
}>;
export declare class TestPublisher extends TestPublisher_base {
    connectedCallback(): void;
}
declare const TestSubscriber_base: import("mix-with/lib").Constructor<HTMLElement & {
    [x: string]: any;
    subscribe<T>(name: string, update: import("../SubscriberMixin").Update<T>): void;
}>;
export declare class TestSubscriber extends TestSubscriber_base {
    connectedCallback(): void;
}
export {};
//# sourceMappingURL=demo-wc.d.ts.map