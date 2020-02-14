import { Publication } from './publication.js'
import { HandlerBuilder, handlers, publish } from './publish.js'
import { subscribe, To } from './subscribe.js'

/***** SERVICE OPINIONATED FUNCTIONS *****/

export function declare<T>(name: string,
                           service: T,
                           element: HTMLElement | ShadowRoot = document.body): Publication<T> {
  return publish(element).create<T>(name, service, 1)
}

export function use<T>(name: string, element: HTMLElement | ShadowRoot = document.body): Promise<T> {
  return subscribe(element).to<T>(name).toPromise()
}

const infinity = -1

export function stream<T>(name: string,
                          element: HTMLElement | ShadowRoot = document.body,
                          bufferSize: number = infinity): Publication<T> {
  return publish(element).create<T>(name, null, bufferSize)
}

export function consume<T>(name: string, element: HTMLElement | ShadowRoot = document.body): To<T> {
  return subscribe(element).to<T>(name)
}

/***** DEBUGGING *****/

export function debug() {
  const maps: any[] = []
  handlers.forEach((h: Map<string, HandlerBuilder<any>>) => {
    h.forEach((value, key) => {
      maps.push(value.publication.asDebugMap())
    })
  })
  console.table(maps)
}

(window as any).bubblesub = {debug}
