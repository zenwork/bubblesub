import { TodoApp } from './TodoApp.js'
import { TodoDetails } from './TodoDetails.js'
import { TodoList } from './TodoList.js'
import { TodoStatus } from './TodoStatus.js'
import { TodoSummary } from './TodoSummary.js'

customElements.define('todo-app', TodoApp)
customElements.define('todo-list', TodoList)
customElements.define('todo-summary', TodoSummary)
customElements.define('todo-details', TodoDetails)
customElements.define('todo-status', TodoStatus)
