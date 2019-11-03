import { customElement, html, LitElement, property } from 'lit-element'
import { sub } from '../../decorators.js'
import { subscribe } from '../../subscribe.js'
import { SequenceService } from './index.js'

@customElement('counter-view')
export class CounterView extends LitElement {

  @property({attribute: false})
  private counter: number = 0

  @property({attribute: false})
  private service: SequenceService

  constructor() {
    super()
    subscribe(this)
      .to<SequenceService>('service.counter')
      .mapFirst((s) => {
        console.log('first')
        this.service = s
        const el: HTMLButtonElement = this.shadowRoot.querySelector('#button')
        el.style.visibility = null
        this.requestUpdate()
      })
  }

  protected render() {
    return html`
            <input type="button" value="+" id="button" @click="${this.increment}" style="visibility: hidden"/>
            <h2>Next Fibonacci: <span id="value">${this.counter}</span></h2>`
  }

  private increment() {
    setTimeout(() => {
      this.counter = this.service.next()
    }, 500)
  }

}
