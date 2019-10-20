import { CounterService, CounterView } from './index.js'

console.log('loading')

describe('wc', () => {
  describe('content', () => {
    let wc: CounterView
    let container: Element | null

    beforeEach(async () => {
      // Use createElement to test it is registered correctly
      wc = (document.createElement('counter-view') as CounterView)

      // Connect to DOM in case there's any `connectedCallback` logic
      container = document.body.querySelector('#container')
      container.innerHTML = null
      container.appendChild(wc)

      // Wait for initial render
      await wc.updateComplete

    })

    function value(): HTMLSpanElement {
      return wc.shadowRoot.querySelector('span')
    }

    function button(): HTMLInputElement {
      return wc.shadowRoot.querySelector('input')
    }

    it('test service', async () => {
      const counterService = new CounterService()
      chai.expect(counterService.next()).to.equal(1)
      chai.expect(counterService.next()).to.equal(1)
      chai.expect(counterService.next()).to.equal(2)
      chai.expect(counterService.next()).to.equal(3)
      chai.expect(counterService.next()).to.equal(5)
    })

    it('test wc', async () => {
      await wc.updateComplete
      chai.expect(value().textContent).to.equal('0')
      button().click()
      await wc.updateComplete
      chai.expect(value().textContent).to.equal('1')
      button().click()
      await wc.updateComplete
      chai.expect(value().textContent).to.equal('1')
      button().click()
      await wc.updateComplete
      chai.expect(value().textContent).to.equal('2')
      button().click()
      await wc.updateComplete
      chai.expect(value().textContent).to.equal('3')
    })

  })
})
