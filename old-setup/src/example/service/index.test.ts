import { Todo, TodoService } from './service.js'

describe('todo example', () => {
  describe('service', () => {

    it('listens to selected', function(done) {

      const service = new TodoService()
      service.add({summary: 'project', details: 'finish project', status: {done: false, due: null}})
      service.add({summary: 'supper', details: 'make green curry', status: {done: false, due: null}})
      service.subscribe((index: number, val: Todo) => {
        chai.expect(index).to.equal(1)
        chai.expect(val.summary).to.equal('supper')
        done()
      })

      service.select(1)

  })

    it('indexes are maintained', function() {

      const service = new TodoService()
      service.add({summary: 'project', details: 'finish project', status: {done: false, due: null}})
      service.add({summary: 'supper', details: 'make green curry', status: {done: false, due: null}})
      service.add({summary: 'sleep', details: 'go to bed', status: {done: false, due: null}})

      let todo = service.get(1)
      chai.expect(todo.summary).to.equal('supper')

      service.remove(0)
      todo = service.get(1)
      chai.expect(todo.summary).to.equal('supper')
  })

    it('gets all todoList', function() {
      const service = new TodoService()
      service.add({summary: 'project', details: 'finish project', status: {done: false, due: null}})
      service.add({summary: 'supper', details: 'make green curry', status: {done: false, due: null}})
      service.add({summary: 'sleep', details: 'go to bed', status: {done: false, due: null}})

      const list: Map<number, Todo> = service.getAll()

      chai.expect(list.size).to.equal(3)

    })
  })
})
