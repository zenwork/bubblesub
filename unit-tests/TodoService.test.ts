import { Todo, TodoService } from '../src/example/service/Todos'

describe('todo service', () => {

  test('listen to selected', (done) => {

    const service = new TodoService()
    service.add({summary: 'project', details: 'finish project', status: {done: false, due: null}})
    service.add({summary: 'supper', details: 'make green curry', status: {done: false, due: null}})
    service.subscribe((index: number, val: Todo) => {
      expect(index).toBe(1)
      expect(val.summary).toBe('supper')
      done()
    })

    service.select(1)

  })

  test('index maintained', () => {

    const service = new TodoService()
    service.add({summary: 'project', details: 'finish project', status: {done: false, due: null}})
    service.add({summary: 'supper', details: 'make green curry', status: {done: false, due: null}})
    service.add({summary: 'sleep', details: 'go to bed', status: {done: false, due: null}})

    let todo = service.get(1)
    expect(todo.summary).toBe('supper')

    service.remove(0)
    todo = service.get(1)
    expect(todo.summary).toBe('supper')
  })

  test('get all todoList', () => {
    const service = new TodoService()
    service.add({summary: 'project', details: 'finish project', status: {done: false, due: null}})
    service.add({summary: 'supper', details: 'make green curry', status: {done: false, due: null}})
    service.add({summary: 'sleep', details: 'go to bed', status: {done: false, due: null}})

    const list: Map<number, Todo> = service.getAll()

    expect(list.size).toBe(3);

  })
})
