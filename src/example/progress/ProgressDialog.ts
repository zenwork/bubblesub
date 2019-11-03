import { Publication } from '../../publication'
import { publish } from '../../publish.js'
import { subscribe } from '../../subscribe.js'
import { FileService } from './FileService.js'

export class ProgressDialog extends HTMLElement {

  pub: Publication<number> = null
  root: ShadowRoot

  constructor() {
    super()
    this.root = this.attachShadow({mode: 'open'})
    this.pub = publish(this.root).create('percent', 0)

    this.root.innerHTML = `
       <h1>CHUNK DOWNLOAD</h1>
      <h2 class="name">???</h2>
      <h3 class="size">###</h3>
      <div class="counter">${this.pub.value}</div>
      <slot></slot>
    `
  }

  connectedCallback() {

    subscribe(this)
      .to<FileService>('file-service')
      .map((srv: FileService) => {

        // set file name and size
        this.root.querySelector('.name').innerHTML = srv.getName()
        this.root.querySelector('.size').innerHTML = srv.getSize() + ' MB'

        // listen to download percent updates
        srv.download(p => {
          this.root.querySelector('.counter').innerHTML = `${p}%`
          this.pub.update(p)
        })

      })
  }
}

customElements.define('progress-dialog', ProgressDialog)
