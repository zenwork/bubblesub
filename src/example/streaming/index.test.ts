import { initLit, Query } from '../util.js'
import { PriceSource } from './PriceSource.js'
import { Ticker } from './Ticker.js'

export { Ticker } from './Ticker.js'

describe('streaming', function() {
  // @ts-ignore
  this.timeout(5000)
  this.enableTimeouts()

  describe('wc', () => {
    let service: PriceSource
    let wc: Ticker
    let first: Query
    let apples: Query

    beforeEach(async () => {
      wc = await initLit('ex-ticker', '#container')
      await wc.updateComplete
      first = new Query(wc, '#first')
      apples = new Query(wc, '#prices > #apples')
    })

    afterEach(async () => {
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

    // it('2- should not miss first when subscribing to all', function(done) {
    //   service = new PriceSource([{name: 'apples', price: 999}])
    //   setTimeout(() => {
    //     const value = apples.query().innerText
    //     chai.expect(value).to.equal('apples:999')
    //     done()
    //   }, 300)
    //
    // })

  })
})
