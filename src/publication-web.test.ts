import { publish } from './publish.js'
import { subscribe } from './subscribe.js'

describe('publish()', function() {

  describe('multiple publishers', function() {

    it('creating two publication uses same publication internally', function() {

      const pub1 = publish(document.body).create<string>('double-create', 'foobar', 10)
      const pub2 = publish(document.body).create<string>('double-create', 'foobar', 10)

      chai.expect(pub1.id).to.equal(pub2.id)
    })

    it('subscriber gets all updates when there are multiple publishers', function(done) {

      const pub1 = publish(document.body).create<string>('double-create', 'foobar', 10)
      const pub2 = publish(document.body).create<string>('double-create', 'fizzbuz', 10)

      pub1.update('one')
      pub2.update('two')
      pub1.update('three')

      const result: string[] = []
      subscribe(document.body).to<string>('double-create')
        .map(s => {
          result.push(s)
          if (result.length === 4) {
            chai.expect(result[0]).to.equal('foobar')
            chai.expect(result[1]).to.equal('one')
            chai.expect(result[2]).to.equal('two')
            chai.expect(result[3]).to.equal('three')
            chai.expect(result.length).to.equal(4)
            done()
          }
        })
    })
  })
})
