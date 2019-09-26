import { pub } from '../../decorators'
import { Service, TodoService } from './service'

export class TodoApp extends HTMLElement {

  @pub()
  private todoList: Service

  private root: ShadowRoot

  constructor() {
    super()
    this.root = this.attachShadow({mode: 'open'})
    this.root.innerHTML = '<slot></slot>'
    this.todoList = new TodoService()
    this.todoList.add({
      summary: 'walk to starbucks',
      details: 'learn stuff, drink stuff',
      status: {done: false, due: null}
    })
    this.todoList.add({
      summary: 'programming',
      details: 'focus on web components',
      status: {done: false, due: null}
    })
    this.todoList.add({
      summary: 'walk home',
      details: 'take bus and walk',
      status: {done: false, due: null}
    })
    this.todoList.add({
      summary: 'make supper',
      details: 'make sure there is enough for lunch tomorrow',
      status: {done: false, due: null}
    })

    setTimeout(() => {
      this.todoList.select(2)
    }, 3000)

  }

}
