import { publish } from '../../publish.js'
import { service } from './FileService.js'
export { ProgressDialog } from './ProgressDialog.js'
export { ProgressBar } from './ProgressBar.js'

export class FileServiceComponent extends HTMLElement {

  constructor() {
    super()
    publish(document.body).create('file-service', service)

  }
}

customElements.define('ex-files', FileServiceComponent)
