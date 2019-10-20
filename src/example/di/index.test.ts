import { initLit, Query } from '../index.test.js'
import { CounterService, CounterView } from './index.js'

describe('fibonacci counter', () => {

  describe('service', () => {
    it('should increment the sequence when next() called', async () => {
      const counterService = new CounterService()
      chai.expect(counterService.next()).to.equal(1)
      chai.expect(counterService.next()).to.equal(1)
      chai.expect(counterService.next()).to.equal(2)
      chai.expect(counterService.next()).to.equal(3)
      chai.expect(counterService.next()).to.equal(5)
    })
  })

  describe('wc', () => {
    let wc: CounterView
    let value: Query
    let button: Query
    let wrapper: any

    beforeEach(async () => {
      wc = await initLit('counter-view', '#container')
      value = new Query(wc, 'span')
      button = new Query(wc, 'input')
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
    })

    it('should show next number when button pressed', async () => {
      await wrapper.await()
      chai.expect(value.query().textContent).to.equal('0')
      await button.query().click()
      await wc.updateComplete
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

  })
})
