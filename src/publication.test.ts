import { Publication } from './publication.js'

describe('publisher', function() {

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
      let subAll: number = 0
      let subFirst: number = 0
      let subLast: number = null

      const pub = new Publication<number>('test')

      pub.subscribe((update: number) => {subAll = update})
      pub.subscribeForFirst((update: number) => {subFirst = update})
      pub.subscribeForLast((update: number) => {subLast = update})

      pub.update(999)
      pub.update(888)
      expect(subAll).to.equal(888)
      expect(subLast).to.equal(null)
      pub.update(777)

      pub.close()
      expect(subAll).to.equal(777)
      expect(subFirst).to.equal(999)
      expect(subLast).to.equal(777)

    })

    it('should trigger late subscriptions', function(done) {
      let subAll: number = 0
      let subFirst: number = 0
      let subLast: number = 0

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

    it('should not remember past updates when configured to do so', function(done) {
      const subAllBefore: number[] = []
      const subFirstBefore: number[] = []
      const subLastBefore: number[] = []

      const subAll: number[] = []
      const subFirst: number[] = []
      const subLast: number[] = []

      const pub = new Publication<number>('test', null, 0)
      pub.subscribe((update: number) => {subAllBefore.push(update)})
      pub.subscribeForFirst((update: number) => {subFirstBefore.push(update)})
      pub.subscribeForLast((update: number) => {subLastBefore.push(update)})

      pub.update(999)
      pub.update(888)
      pub.update(777)
      pub.close()

      pub.subscribe((update: number) => {subAll.push(update)})
      pub.subscribeForFirst((update: number) => {subFirst.push(update)})
      pub.subscribeForLast((update: number) => {subLast.push(update)})

      setTimeout(() => {
        expect(subAll.length).to.eq(0)
        expect(subAllBefore.length).to.eq(3)
        expect(subFirstBefore.length).to.eq(1)
        expect(subFirstBefore[0]).to.eq(999)
        expect(subFirst.length).to.eq(0)
        expect(subLastBefore.length).to.eq(1)
        expect(subLastBefore[0]).to.eq(777)
        expect(subLast.length).to.eq(0)
        done()
      }, 300)
    })

    it('should remember limited number of past updates when configured to do so', function(done) {
      const subAllBefore: number[] = new Array<number>()
      const subFirstBefore: number[] = new Array<number>()
      const subLastBefore: number[] = new Array<number>()

      const subAll: number[] = new Array<number>()
      const subFirst: number[] = new Array<number>()
      const subLast: number[] = new Array<number>()

      const pub = new Publication<number>('test', null, 2)
      pub.subscribe((update: number) => {subAllBefore.push(update)})
      pub.subscribeForFirst((update: number) => {subFirstBefore.push(update)})
      pub.subscribeForLast((update: number) => {subLastBefore.push(update)})

      pub.update(999)
      pub.update(888)
      pub.update(777)
      pub.update(666)
      pub.close()

      pub.subscribe((update: number) => {subAll.push(update)})
      pub.subscribeForFirst((update: number) => {subFirst.push(update)})
      pub.subscribeForLast((update: number) => {subLast.push(update)})

      setTimeout(() => {
        expect(subAllBefore.length).to.equal(4)
        expect(subFirstBefore.length).to.equal(1)
        expect(subFirstBefore[0]).to.equal(999)
        expect(subLastBefore.length).to.equal(1)
        expect(subLastBefore[0]).to.equal(666)

        expect(subAll.length).to.equal(2)
        expect(subAll[0]).to.equal(777)
        expect(subAll[1]).to.equal(666)
        expect(subFirst.length).to.equal(0)
        expect(subLast.length).to.equal(1)

        done()
      }, 300)
    })
  })
})
