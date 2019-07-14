/*
import { customElement, LitElement, property } from 'lit-element';
import mix from 'mix-with';
import { Publication, PublisherMixin } from './PublisherMixin';
import { SubscriberMixin } from './SubscriberMixin';

describe('test pub/sub', () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }

    // language=HTML
    document.body.innerHTML = `
        <test-publisher>
            <div>
                <div>
                    <test-subsciber></test-subsciber>
                </div>
            </div>
        </test-publisher>`;
  });

  test('subscribe', () => {
    const attribute = document.body.querySelector('test-subscriber')!.getAttribute('published');
    expect(attribute).toBe('published string');
  });
});

@customElement('test-publisher')
class TestPublisher extends mix(LitElement).with(PublisherMixin) {
  private published!: Publication<string>;

  connectedCallback(): void {
    super.connectedCallback();
    this.published = this.publish<string>('test', 'published string');

  }
}

@customElement('test-subscriber')
class TestSubscriber extends mix(LitElement).with(SubscriberMixin) {
  @property()
  injected!: string | null;

  connectedCallback(): void {
    super.connectedCallback();
    this.subscribe<string>('test', updated => this.injected = updated);
  }
}
*/
