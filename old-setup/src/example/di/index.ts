import { declare } from '../../api.js'
export { CounterView } from './CounterView.js'

export interface SequenceService {
  next(): number
}

export class CounterService implements SequenceService {
  private latest: number = 1
  private sequence = fib()

  next(): number {
    // @ts-ignore
    return this.sequence.next().value
  }

}

function* fib() {
  let a: number
  let b: number
  let current = a = b = 1

  yield 1

  while (true) {
    current = b

    yield current

    b = a + b
    a = current
  }
}

const pub = declare('service.counter', new CounterService())
