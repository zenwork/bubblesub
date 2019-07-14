import { mix } from 'mix-with';
import { PublisherMixin } from '../PublisherMixin';
import { SubscriberMixin } from '../SubscriberMixin';

export class TestPublisher extends mix(HTMLElement).with(PublisherMixin) {

  connectedCallback() {
    const published = 'shared data';
    this.publish('test', published);
  }
}

customElements.define('test-publisher', TestPublisher);

export class TestSubscriber extends mix(HTMLElement).with(SubscriberMixin) {

  connectedCallback() {
    this.subscribe('test', updated => {
      console.log(updated);
      this.innerHTML = `subscribed for: ${updated}`;
    });
  }
}

customElements.define('test-subscriber', TestSubscriber);
