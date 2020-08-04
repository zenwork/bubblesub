import { initLit, Query } from '../test-util.js'
import { CounterService, CounterView } from './index.js'

describe('fibonacci counter(di) example', () => {

  describe('service', () => {
    it('should increment the sequence when next() called', async function() {
      const counterService = new CounterService()
      chai.expect(counterService.next()).to.equal(1)
      chai.expect(counterService.next()).to.equal(1)
      chai.expect(counterService.next()).to.equal(2)
      chai.expect(counterService.next()).to.equal(3)
      chai.expect(counterService.next()).to.equal(5)
    })
  })

  describe('wc', function() {
    let wc: CounterView
    let value: Query
    let button: Query
    let wrapper: any

    beforeEach(async function() {
      wc = await initLit('counter-view', '#container')
      value = new Query(wc, 'span')
      button = new Query(wc, '#button')
      wrapper = {
          wc,
          value: async () => {
            await value.query()
          },
          button: async () => {
            await button.query().click()
            await wc.updateComplete

          },
          await: async () => {
            return await wc.updateComplete
          }
        }
      return wc.updateComplete
    })

    setTimeout(() => {

      it('should show next number when button pressed', async function() {
        await this.timeout(1000)
        await wrapper.await()
        chai.expect(value.query().textContent).to.equal('0')
        await wrapper.button()
        chai.expect(value.query().textContent).to.equal('1')
        await wrapper.button()
        chai.expect(value.query().textContent).to.equal('1')
        await wrapper.button()
        chai.expect(value.query().textContent).to.equal('2')
        await wrapper.button()
        await wrapper.button()
        await wrapper.button()
        await wrapper.button()
        await wrapper.button()
        await wrapper.button()
        await wrapper.button()
        await wrapper.button()
        chai.expect(value.query().textContent).to.equal('89')
      })
    }, 500)

  })
})
