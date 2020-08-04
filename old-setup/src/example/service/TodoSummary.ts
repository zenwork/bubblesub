import { sub } from '../../decorators.js'
import { Service, Todo } from './service.js'

export class TodoSummary extends HTMLElement {

  @sub({update(service: Service) {
    service.subscribe((index, todo: Todo) => {
      const s = todo.summary
      this.render(s)
    })
  }})
  private todoList: Service

  connectedCallback() {
    this.todoList
  }

  render(summary: string) {
    this.innerHTML = `<h1>${summary}</h1>`
  }

}
