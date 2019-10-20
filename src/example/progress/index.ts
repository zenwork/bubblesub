import { publisher } from '../../publisher.js'
import { service } from './FileService.js'
export { ProgressDialog } from './ProgressDialog.js'
export { ProgressBar } from './ProgressBar.js'

export class FileServiceComponent extends HTMLElement {

  constructor() {
    super()
    publisher(document.body).create('file-service', service)

  }
}

customElements.define('ex-files', FileServiceComponent)
