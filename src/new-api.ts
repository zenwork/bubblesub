import { Publication } from './publication'
import { HandlerBuilder, handlers, publish } from './publish'

export type init = (el: HTMLElement) => Map<HTMLElement | ShadowRoot, Map<string, HandlerBuilder<any>>>

export type create = <T>(name: string) => Publication<T>
export type setState = <T>(name: string, value: T) => Promise<T>

export type useState = <T>(name: string) => Promise<T>
export type useAllStates = <T>(name: string, update: (state: T) => void) => void

const anchor = {element: window.document}
const Bubblesub = function() {
  return {
    init: (el: HTMLElement): Map<HTMLElement | ShadowRoot, Map<string, HandlerBuilder<any>>> => {
      anchor.element = el
      return handlers
    },
    create: (name: string): create => {
      publish()
    }
  }
}
