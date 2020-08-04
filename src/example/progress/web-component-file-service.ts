import { publish } from '../../publish'

// file service interface that can be shared as an ambient type
export interface FileService {
  getName(): string
  getSize(): number
  download(status: (percent: number) => void): void
}

// mock file service implementation
class FileServiceImpl implements FileService {
  getName() {return 'archive.zip' }
  getSize() {return 12003 }
  download(status: (percent: number) => void) {
    for (let i = 1; i < 101; i++) {
      setTimeout(() => {
        status(i)
      }, i * 50)
    }
  }
}

const service: FileService = new FileServiceImpl()

// expose the file service as a state-producing web component
export class FileServiceWC extends HTMLElement {

  constructor() {
    super()
    publish(document.body).create('file-service', service)

  }
}

customElements.define('file-service', FileServiceWC)
