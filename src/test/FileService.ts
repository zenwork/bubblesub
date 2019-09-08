export interface FileService {
  getName(): string
  getSize(): number
  download(status: (percent: number) => void)
}

class FileServiceImpl implements FileService {
  getName() {return 'archive.zip';}
  getSize() {return 12003;}
  download(status: (percent: number) => void) {
    for (let i = 1; i < 101; i++) {
      setTimeout(() => {
        status(i)
      }, i * 50)
    }
  }
}

export const service: FileService = new FileServiceImpl();
