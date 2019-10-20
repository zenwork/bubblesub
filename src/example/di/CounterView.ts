import { customElement, html, LitElement, property } from 'lit-element'
import { sub } from '../../decorators.js'
import { subscriber } from '../../subscriber.js'
import { SequenceService } from './index.js'

@customElement('counter-view')
export class CounterView extends LitElement {

  @property({attribute: false})
  private counter: number = 0

  @sub({name: 'service.counter'})
  private service: SequenceService

  protected render() {
    return html`
            <input type="button" value="+" id="button" @click="${this.increment}"/>
            <h2>Next Fibonacci: <span id="value">${this.counter}</span></h2>`
  }

  private increment() {
    this.counter = this.service.next()
  }

}
