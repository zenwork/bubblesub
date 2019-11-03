import { customElement, html, LitElement, property } from 'lit-element'
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
    this.service = await subscribe(this)
      .to<SequenceService>('service.counter')
      .toPromise()
  }

  protected render() {
    return html`
            <input type="button" value="+" id="button" @click="${this.increment}" />
            <h2>Next Fibonacci: <span id="value">${this.counter}</span></h2>`
  }

  private increment() {
    this.counter = this.service.next()
  }

}
