import { sub } from '../../decorators'

export class Ticker extends HTMLElement {

  @sub('apples')
  apples: number = 0

  @sub('bananas')
  bananas: number = 0

  @sub('grapes')
  grapes: number = 0

  @sub('kiwis')
  kiwis: number = 0

  @sub('oranges')
  oranges: number = 0

  constructor() {
    super()
    this.innerHTML = `
       <ul>
        <li class="apples">apples: n/a</li>
        <li class="bananas">bananas: n/a</li>
        <li class="grapes">grapes: n/a</li>
        <li class="kiwis">kiwis: n/a</li>
        <li class="oranges">oranges n/a</li>
      </ul>
    `

    this.watch('bananas')
    this.watch('grapes')
    this.watch('kiwis')
    this.watch('oranges')

    this.watch('apples')

  }

  private watch(name) {
    let current = this[name]
    setTimeout(() => {
      if (current !== this[name]) {
        // console.log('updating:' + name)
        this.querySelector('.' + name).innerHTML = `<li class="${name}">${name}: ${this[name]}</li>`
        current = this[name]
      }
      this.watch(name)
    }, 10)
  }
}

customElements.define('ex-ticker', Ticker)
