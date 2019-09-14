import { subscriber } from './subscriber'

export function sub(name: string = null) {
  return (target: any, key: string) => {
    const pKey = `_${key}`
    if (name === null) name = key

    // tslint:disable-next-line:only-arrow-functions
    const init = function(isGet: boolean) {
      let subscribed = false

      return function(newVal?) {
        if (!subscribed) {
          subscriber(this).request(name, v => this[pKey] = v)
          subscribed = true
        }
        // Define hidden property
        Object.defineProperty(this, pKey, {value: 0, enumerable: false, configurable: true, writable: true})
        // Define public property
        Object.defineProperty(this, key, {
          get: () => {
            return this[pKey]
          },
          set: (val) => {
            this[pKey] = val + 1
          },
          enumerable: true,
          configurable: true
        })

        // Perform original action
        if (isGet) {
          return this[key] // get
        } else {
          this[key] = newVal // set
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
