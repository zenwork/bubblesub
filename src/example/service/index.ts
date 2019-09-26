import { pub, sub } from '../../decorators'
import { Todo, Todos, TodoService } from './Todos'

export class TodoApp extends HTMLElement {

  @pub()
  private todoList: Todos

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

  }

}

customElements.define('todo-app', TodoApp)

export class TodoList extends HTMLElement {

  @sub({update(srv: Todos) {this.render(srv.getAll())}})
  todoList: Todos

  connectedCallback() {
    // todo: this needed to trigger subscription!!!
    this.todoList
  }

  select(id: number) {
    this.todoList.select(id)
  }

  render(todos: Map<number, Todo>) {
    console.log('render')
    this.innerHTML = '<h3>list</h3><ol>'
    todos.forEach((todo: Todo, key: number) => {
      this.innerHTML = `${this.innerHTML}<li>${key} - ${todo.summary}</li>`
    })
    this.innerHTML = `${this.innerHTML}</ol>`
  }

}

customElements.define('todo-list', TodoList)

/*export class TodoSummary extends HTMLElement {

 @sub({update: (srv: Todos) => {srv.subscribe((index, todo: Todo) => {this.render(todo.summary)})}})
 private todoList: Todos

 render(summary: string) {
 this.innerHTML = `<h1>${summary}</h1>`
 }

 }

 customElements.define('todo-summary', TodoSummary)*/

/*
 export class TodoDetails extends HTMLElement {

 }

 customElements.define('todo-details', TodoDetails)

 export class TodoStatus extends HTMLElement {

 }

 customElements.define('todo-status', TodoStatus)
 */
