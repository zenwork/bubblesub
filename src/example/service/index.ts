import { TodoApp } from './TodoApp'
import { TodoDetails } from './TodoDetails'
import { TodoList } from './TodoList'
import { TodoStatus } from './TodoStatus'
import { TodoSummary } from './TodoSummary'

customElements.define('todo-app', TodoApp)
customElements.define('todo-list', TodoList)
customElements.define('todo-summary', TodoSummary)
customElements.define('todo-details', TodoDetails)
customElements.define('todo-status', TodoStatus)
