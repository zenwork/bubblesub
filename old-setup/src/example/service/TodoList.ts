import { sub } from '../../decorators.js'
import { Service, Todo } from './service.js'

export class TodoList extends HTMLElement {

  @sub({
    update(srv: Service) {
      this.render(srv.getAll())
      srv.subscribe((index: number) => {this.highlight(index)})
    }
  })
  todoList: Service

  selected: number

  connectedCallback() {
    // todo: this needed to trigger subscription!!!
    this.todoList
  }

  render(todos: Map<number, Todo>) {
    console.log('render')
    this.innerHTML = '<h3>list</h3><ol>'
    todos.forEach((todo: Todo, key: number) => {
      this.innerHTML = `${this.innerHTML}<li><input type="button" id="id${key}" value="${key} - ${todo.summary}"></inputbutton></li>`
    })
    this.innerHTML = `${this.innerHTML}</ol>`

    todos.forEach((todo: Todo, key: number) => {
      const btn: HTMLInputElement = this.querySelector(`#id${key}`)
      btn.onclick = () => {
        this.todoList.select(key)
      }
    })
  }

  highlight(index: number) {
    if (this.selected || this.selected === 0) {
      this.querySelector(`#id${this.selected}`).setAttribute('style', 'font-weight: normal;')
    }
    this.selected = index
    const element = this.querySelector(`#id${index}`)

    element.setAttribute(
      'style',
      'font-weight: bold;')
  }

}
