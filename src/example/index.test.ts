import { LitElement} from 'lit-element'
import './di/index.test.js'

export class Query {
  private el: HTMLElement
  private readonly sel: string

  constructor(element: LitElement, selector: string) {
    this.el = element
    this.sel = selector
  }

  query<T extends HTMLElement>(selector?: string): T {
    if (this.el.shadowRoot) {
      return this.el.shadowRoot.querySelector(this.getSel(selector))
    } else {
      return this.el.querySelector(this.getSel(selector))
    }
  }

  queryAll<T extends HTMLElement>(selector?: string): NodeListOf<T> {
    if (this.el.shadowRoot) {
      return this.el.shadowRoot.querySelectorAll(this.getSel(selector))
    } else {
      return this.el.querySelectorAll(this.getSel(selector))
    }
  }

  private getSel(override?: string) {
    return override ? override : this.sel
  }
}

export async function initLit<T extends LitElement>(tag: string, container: string | HTMLElement): Promise<T> {
  // create element under test
  const wc: T = (document.createElement(tag) as T)

  let c: HTMLElement
  if (typeof container === 'string') {
    c = document.body.querySelector(container)
  } else {
    c = container as HTMLElement
  }
  c.innerHTML = null
  c.appendChild(wc)

  // Wait for initial render
  await wc.updateComplete
  return wc
}
