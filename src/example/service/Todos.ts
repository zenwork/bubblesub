export interface Todo {
  summary: string,
  details: string,
  status: { done: boolean, due: Date }
}

export type Selection = (index: number, value: Todo) => void

export interface Todos {
  select(id: number)

  subscribe(callback: Selection)

  add(todo: Todo)

  get(id: number): Todo

  getAll(): Map<number, Todo>

  remove(id: number)

}

export class TodoService implements Todos {
  todoIndex: number = 0
  selectedIndex: number | null = null
  todos: Map<number, Todo> = new Map<number, Todo>()
  callabacks: Selection[] = []

  add(todo: Todo) {
    this.todos.set(this.todoIndex, todo)
    this.todoIndex++
  }

  get(id: number): Todo {
    return this.todos.get(id)
  }

  remove(id: number) {
    this.todos.delete(id)
  }

  select(id: number) {
    this.selectedIndex = id
    this.callabacks.forEach(cb => cb(id, this.get(this.selectedIndex)))
  }

  subscribe(callback: Selection) {
    this.callabacks.push(callback)
  }

  getAll(): Map<number, Todo> {
    return this.todos
  }
}
