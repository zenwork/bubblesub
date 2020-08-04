import { sub } from '../../decorators.js'
import { Service, Todo } from './service.js'

export class TodoDetails extends HTMLElement {
  @sub({
    update(service: Service) {
      service.subscribe((index, todo: Todo) => {
        const s = todo.details
        this.render(s)
      })
    }
  })
  private todoList: Service

  connectedCallback() {
    this.todoList
  }

  render(details: string) {
    this.innerHTML = `<p>${details}</p>`
  }
}
