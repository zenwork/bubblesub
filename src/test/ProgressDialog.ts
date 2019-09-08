import { Publication, publisher } from '../publisher'
import { subscriber } from '../subscriber'
import { FileService } from './FileService'

export class ProgressDialog extends HTMLElement {

  pub: Publication<number> = null
  root: ShadowRoot

  constructor() {
    super()
    this.root = this.attachShadow({mode: 'open'})
    this.pub = publisher(this.root).createPublication('percent', 0)

    this.root.innerHTML = `
       <h1>CHUNK DOWNLOAD</h1>
      <h2 class="name">???</h2>
      <h3 class="size">###</h3>
      <div class="counter">${this.pub.value}</div>
      <slot></slot>
    `
  }

  connectedCallback() {

    subscriber(this).request(
      'service',
      (srv: FileService) => {

        // set file name and size
        this.root.querySelector('.name').innerHTML = srv.getName()
        this.root.querySelector('.size').innerHTML = srv.getSize() + ' MB'

        // listen to download percent updates
        srv.download(p => {
          this.root.querySelector('.counter').innerHTML = `${p}%`
          this.pub.updateValue(p)
        })

      })
  }
}

customElements.define('progress-dialog', ProgressDialog)
