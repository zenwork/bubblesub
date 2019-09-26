import { sub } from '../../decorators'
import { Service, Todo } from './service'

export class TodoStatus extends HTMLElement {
  @sub({
    update(service: Service) {
      service.subscribe((index, todo: Todo) => {
        const s = todo.status
        this.render(s)
      })
    }
  })
  private todoList: Service

  connectedCallback() {
    this.todoList
  }

  render(status: { done: boolean, due: Date }) {
    this.innerHTML = `
<label for="done">done:<span id="done">${status.done}</span></label>
<label for="due">due:<span id="due">${status.due}</span></label>
`
  }
}
