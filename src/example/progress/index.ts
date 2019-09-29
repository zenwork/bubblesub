import { publisher } from '../../publisher'
import { service } from './FileService'
export { ProgressDialog } from './ProgressDialog'
export { ProgressBar } from './ProgressBar'

export class FileServiceComponent extends HTMLElement {

  constructor() {
    super()
    publisher(document.body).create('file-service', service)

  }
}

customElements.define('ex-files', FileServiceComponent)
