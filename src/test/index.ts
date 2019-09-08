import { publisher } from '../publisher'
import { service } from './FileService'
export { ProgressDialog } from './ProgressDialog'
export { ProgressBar } from './ProgressBar'

publisher(document.body).createPublication('service', service)
