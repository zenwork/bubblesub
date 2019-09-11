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

publisher(document.body).createPublication('service.counter', new CounterService())
