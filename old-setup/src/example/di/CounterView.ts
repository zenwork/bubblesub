import { customElement, html, LitElement, property } from 'lit-element'
import { use } from '../../api.js'
import { publish } from '../../publish.js'
import { subscribe } from '../../subscribe.js'
import { SequenceService } from './index.js'

@customElement('counter-view')
export class CounterView extends LitElement {

  @property({attribute: false})
  private counter: number = 0

  @property({attribute: false})
  private service: SequenceService

  async connectedCallback() {
    super.connectedCallback()
    this.service = await  use('service.counter', this)
  }

  protected render() {
    return html`
            <input type="button" value="+" id="button" @click="${this.increment}" />
            <h2>Next Fibonacci: <span id="value">${this.counter}</span></h2>`
  }

  private async increment() {
    this.counter = this.service.next()

    // the below code is unnecessary. It is there to test the re-publication service
    publish(document.body).create<SequenceService>('service.counter')

    // this new subscription would return null if the above publish created a new listener
    this.service = await subscribe(this)
      .to<SequenceService>('service.counter')
      .toPromise()

  }

}
