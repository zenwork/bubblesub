/**
 * Watch for changes. In a real app this is expected to be provided by a library such as LitElement
 * @param name
 * @param wc
 */
export function updateOnChange(name, wc: HTMLElement) {
  let current = wc[name]
  setTimeout(() => {
    if (current !== wc[name]) {
      const element = wc.querySelector('.' + name)
      const template = `${name}: ${wc[name]}`
      if (element) {
        element.innerHTML = template
      } else {
        const item = document.createElement('li')
        item.className = name
        item.innerHTML = `${name}: ${wc[name]}`
        wc.querySelector('.prices').appendChild(item)
      }
      current = wc[name]
    }
    updateOnChange(name, wc)
  }, 5)
}
