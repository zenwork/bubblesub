import { Publication, publisher } from './publisher.js'
import { subscribe, Update } from './subscribe.js'

export class SubConfig<T> {
  name?: string | undefined
  update?: Update<T> | undefined
}

/**
 * @param config
 */
export function sub<T>(config: SubConfig<T> = {}) {
  const conf: SubConfig<T> = {...config}
  return (target: any, key: string) => {

    if (!conf.name) conf.name = key
    let value: any

    let subscribed = false

    function init(isGet: boolean) {

      return function accessor(newVal?: T): T | void {

        if (!subscribed) {
          let up
          if (conf.update) {
            up = (v: T | null) => {
              value = v
              conf.update.apply(this, [v])
            }
          } else {
            up = (v: any) => value = v
          }
          if (conf.name != null) {subscribe(this).request<T>(conf.name, up)}
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
  name?: string | undefined
  initialValue?: T | undefined
  pubTarget?: HTMLElement | ShadowRoot | undefined
}

export function pub<T>(config: PubConfig<T> = {}) {
  const conf = {...config}
  return (target: any, key: string) => {

    if (!conf.name) conf.name = key
    let publication: Publication<T>
    let value: T | undefined | null = conf.initialValue

    function init(isGet: boolean) {

      return function accessor(newVal?: T): T | null | void {

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
