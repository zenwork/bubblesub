import { sub } from '../../decorators'
import { Todo, Service } from './service'

export class TodoList extends HTMLElement {

  @sub({
    update(srv: Service) {
      this.render(srv.getAll())
      srv.subscribe((index: number) => {this.highlight(index)})
    }
  })
  todoList: Service

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
      this.innerHTML = `${this.innerHTML}<li id="id${key}">${key} - ${todo.summary}</li>`
    })
    this.innerHTML = `${this.innerHTML}</ol>`
  }

  highlight(index: number) {
    const element = this.querySelector(`#id${index}`)

    element.setAttribute(
      'style',
      'font-weight: bold;')
  }

}
