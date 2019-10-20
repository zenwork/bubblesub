import { subscriber } from '../../subscriber.js'
import { SequenceService } from './index.js'

export class CounterView extends HTMLElement {

  service: SequenceService

  connectedCallback(): void {
    subscriber(this)
      .request('service.counter', (srv: SequenceService) => this.service = srv)
    this.render()
  }

  private render() {
    this.innerHTML = '<input type="button" value="+" class="b"></button><h2>Counter: <span class="value">n/a</span></h2>'
    this.bindButton()
  }

  private bindButton() {
    const b: HTMLButtonElement = this.querySelector('.b')
    b.onclick = () => {
      this.update(this.service.next())
    }
  }

  private update(value: number) {
    this.querySelector('.value').innerHTML = `${value}`
  }

}

customElements.define('counter-view', CounterView)
