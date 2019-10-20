/**
 * Watch for changes. In a real app this is expected to be provided by a library such as LitElement
 * @param name
 * @param wc
 */
export function updateOnChange(name: string, wc: HTMLElement) {
  // @ts-ignore
  let current = wc[name]
  setTimeout(() => {
    // @ts-ignore
    if (current !== wc[name]) {
      const element = wc.querySelector('.' + name)
      // @ts-ignore
      const template = `${name}: ${wc[name]}`
      if (element) {
        element.innerHTML = template
      } else {
        const item = document.createElement('li')
        item.className = name
        // @ts-ignore
        item.innerHTML = `${name}: ${wc[name]}`
        wc.querySelector('.prices').appendChild(item)
      }
      // @ts-ignore
      current = wc[name]
    }
    updateOnChange(name, wc)
  }, 5)
}
