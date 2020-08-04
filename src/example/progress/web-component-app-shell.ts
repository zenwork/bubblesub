import { publish } from '../../publish'
import { FileServiceWC } from './web-component-file-service'

export class AppShell extends HTMLElement {

  constructor() {
    super()

    publish(this).create('file-service')
    publish(this).create('completion-state')
  }

}

customElements.define('app-shell', FileServiceWC)
