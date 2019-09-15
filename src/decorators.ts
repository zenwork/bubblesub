import { Publication, publisher } from './publisher'
import { subscriber, Update } from './subscriber'

export class SubConfig<T> {
  name?: string = null
  update?: Update<T> = null
}

/**
 * @param config
 */
export function sub<T>(config: SubConfig<T> = {}) {
  const conf = {...config}
  return (target: any, key: string) => {

    if (!conf.name) conf.name = key
    let value

    let subscribed = false

    function init(isGet: boolean) {

      return function accessor(newVal?: T): T | void {

        if (!subscribed) {
          let up
          if (conf.update) {
            up = (v: T | null) => {
              conf.update.apply(this, [v])
              value = v
            }
          } else {
            up = v => value = v
          }
          subscriber(this).request<T>(conf.name, up)
          subscribed = true
        }
        if (isGet) {
          return value
        } else {
          value = newVal
        }
      }
    }

    // Override property to let init occur on first get/set
    return Object.defineProperty(target, key, {
      get: init(true),
      set: init(false),
      enumerable: true,
      configurable: true
    })
  }
}

export class PubConfig<T> {
  name?: string
  initialValue?: T
  pubTarget?: HTMLElement | ShadowRoot
}

export function pub<T>(config: PubConfig<T> = {}) {
  const conf = {...config}
  return (target: any, key: string) => {

    if (!conf.name) conf.name = key
    let publication: Publication<T>
    let value: T = conf.initialValue

    function init(isGet: boolean) {

      return function accessor(newVal?: T): T | void {

        if (!publication) {
          if (conf.pubTarget) {
            publication = publisher(conf.pubTarget).create<T>(conf.name, conf.initialValue)
          } else {
            publication = publisher(this).create<T>(conf.name, conf.initialValue)
          }
        }

        if (isGet) {
          return value
        } else {
          value = newVal
          publication.update(newVal)
        }
      }
    }

    // Override property to let init occur on first get/set
    return Object.defineProperty(target, key, {
      get: init(true),
      set: init(false),
      enumerable: true,
      configurable: true
    })
  }
}
