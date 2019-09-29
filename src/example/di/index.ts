import { publisher } from '../../publisher'

export { CounterView } from './CounterView'

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

publisher(document.body).create('service.counter', new CounterService())
