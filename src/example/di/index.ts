import { publisher } from '../../publisher'

export { CounterExample } from './CounterExample'

export interface SequenceService {
  next(): number
}

class CounterService implements SequenceService {
  private latest: number = 0

  next(): number {
    this.latest = this.latest + 1
    return this.latest
  }

}

export class ServiceContext extends HTMLElement {
  constructor() {
    super()
    publisher(document.body).create('service.counter', new CounterService())

  }
}

customElements.define('ex-service', ServiceContext)
