import { handlers } from '../../publish.js'
import { initLit, Query } from '../test-util.js'
import { PriceSource } from './PriceSource.js'
import { Ticker } from './Ticker.js'
export { Ticker } from './Ticker.js'

describe('streaming', function() {
  // @ts-ignore
  this.timeout(5000)
  this.enableTimeouts()

  describe('wc', function() {
    let service: PriceSource
    let wc: Ticker
    let first: Query
    let last: Query
    let apples: Query

    beforeEach(async function() {
      handlers.clear()
      wc = await initLit('ex-ticker', '#container')
      await wc.updateComplete
      first = new Query(wc, '#first')
      last = new Query(wc, '#last')
      apples = new Query(wc, '#prices > #apples')
    })

    afterEach(async function() {
      service.close()
      service = null
    })

    it('1- should get exactly first when subscribing to first', function(done) {
      service = new PriceSource([{name: 'apples', price: 999}, {name: 'apples', price: 888}])
      setTimeout(() => {
        const value = first.query().innerText
        chai.expect(value).to.equal('apples:999')
        done()
      }, 300)

    })

    it('2- should not miss first when subscribing to all', function(done) {
      service = new PriceSource([{name: 'apples', price: 999}])
      setTimeout(() => {
        const value = apples.query().innerText
        chai.expect(value).to.equal('apples:999')
        done()
      }, 300)

    })

    it('2- should not miss last when subscribing to last', function(done) {
      service = new PriceSource([
        {name: 'apples', price: 999},
        {name: 'apples', price: 888},
        {name: 'apples', price: 777}
      ])
      setTimeout(() => {
        const value = last.query().innerText
        chai.expect(value).to.equal('apples:777')
        done()
      }, 300)

    })

  })
})
