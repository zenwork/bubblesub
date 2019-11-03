import { Publication, PublicationRequest } from './publication'

describe('subscriber', function() {
  this.enableTimeouts()
  const expect = chai.expect

  describe('Sub', function() {

    it('should register subscriptions', function() {
      let subAll: number
      const request = new PublicationRequest<number>('test')
      request.pub = new Publication<number>('test')
      request.subscribe((up: number) => {subAll = up})
      request.pub.update(999)

      chai.expect(subAll).to.equal(999)

    })

    it('should register early subscriptions', function() {
      let subAll: number
      let subFirst: number
      let subLast: number
      const request = new PublicationRequest<number>('test')
      request.subscribe((up: number) => {subAll = up})
      request.subscribeForFirst((up: number) => {subFirst = up})
      request.subscribeForLast((up: number) => {subLast = up})

      request.pub = new Publication<number>('test')
      request.pub.update(999)
      request.pub.close()

      chai.expect(subFirst).to.equal(999)
      chai.expect(subAll).to.equal(999)
      chai.expect(subLast).to.equal(999)

    })

  })
})
