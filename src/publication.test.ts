import { Publication } from './publication'

describe('publisher', function() {
  this.enableTimeouts()
  const expect = chai.expect

  describe('Publication', function() {

    it('should be empty after init', function() {
      const pub = new Publication('test')

      expect(pub.value).to.be.null
      expect(pub.first).to.be.null
      expect(pub.last).to.be.null
      expect(pub.length).to.equal(0)

    })

    it('should contain one item after initializing with default', function() {
      const pub = new Publication<number>('test', 999)

      expect(pub.value).to.equal(999)
      expect(pub.first).to.equal(999)
      expect(pub.last).to.be.equal(999)
      expect(pub.length).to.equal(1)

    })

    it('should contain two item after initializing with one default and one update', function() {
      const pub = new Publication<number>('test', 999)
      pub.update(888)

      expect(pub.value).to.equal(888)
      expect(pub.first).to.equal(999)
      expect(pub.last).to.be.equal(888)
      expect(pub.length).to.equal(2)

    })

    it('should contain three item after initializing with three items', function() {
      const pub = new Publication<number>('test')
      pub.update(999)
      pub.update(888)
      pub.update(777)

      expect(pub.value).to.equal(777)
      expect(pub.first).to.equal(999)
      expect(pub.last).to.be.equal(777)
      expect(pub.length).to.equal(3)
    })

    it('should trigger early subscriptions', function() {
      let subAll: number
      let subFirst: number
      let subLast: number

      const pub = new Publication<number>('test')

      pub.subscribe((update: number) => {subAll = update})
      pub.subscribeForFirst((update: number) => {subFirst = update})
      pub.subscribeForLast((update: number) => {subLast = update})

      pub.update(999)
      pub.update(888)
      expect(subAll).to.equal(888)
      expect(subLast).to.equal(undefined)
      pub.update(777)

      pub.close()
      expect(subAll).to.equal(777)
      expect(subFirst).to.equal(999)
      expect(subLast).to.equal(777)

    })

    it('should trigger late subscriptions', function(done) {
      let subAll: number
      let subFirst: number
      let subLast: number

      const pub = new Publication<number>('test')

      pub.update(999)
      pub.update(888)
      pub.update(777)
      pub.close()

      pub.subscribe((update: number) => {subAll = update})
      pub.subscribeForFirst((update: number) => {subFirst = update})
      pub.subscribeForLast((update: number) => {subLast = update})

      setTimeout(() => {
        expect(subAll).to.equal(777)
        expect(subFirst).to.equal(999)
        expect(subLast).to.equal(777)
        done()
      }, 200)
    })
  })
})
