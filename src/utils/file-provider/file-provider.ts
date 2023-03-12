import { Readable } from "stream";
import { ConnectionString } from "connection-string";
import * as FileType from "file-type";
import { extension } from 'mime-types'

export interface IFileProviderOptions {
  url?: string
}

interface IFileProviderValues {
  protocol: string,
  hostname: string,
  user: string,
  password: string,
  port?: number,
  path: string,
  params?: any
  connect: () => void;
  upload: (key: string, resource: Buffer | string, contentType?: string) => Promise<any>;
  exist: (key: string) => Promise<boolean | unknown>;
  download: (key: string) => Promise<any | unknown>;
  delete: (key: string) => Promise<any | unknown>;
}


export class FileProvider implements IFileProviderValues {
  protocol: string;
  hostname: string;
  user: string;
  password: string;
  port?: number;
  path: string;
  params?: any;

  constructor(options: IFileProviderOptions) {
    if (options.url) {
      const asd = new ConnectionString(options.url);
      console.log({ asd })
      const {
        protocol,
        hostname,
        user,
        password,
        port,
        path,
        params
      } = new ConnectionString(options.url);
      this.protocol = protocol;
      this.hostname = hostname;
      this.user = user;
      this.password = password;
      this.port = port;
      this.path = path && path.length > 0 ? `${path[0]}` : '';
      this.params = params;
    }
  }
  private formatFileName(name: string): string {
    return name.replace(/\s/g, '-')
  }
  connect() {
    throw new Error('must be defined')
  }
  __upload(key: string, resource: Buffer | Readable | string, mimeType: string) {
    return new Promise((resolve, reject) => {
      reject(new Error('must be defined'))
    })
  }

  async upload(key: string, resource: Buffer | string, contentType?: string) {
    const nameFormatted = this.formatFileName(key);
    let mimeType = contentType ? contentType : null;
    if (!mimeType) {
      const type = await this.getFileType(resource);
      mimeType = type.mime
    }
    if (typeof resource === 'string') {
      const rawString = resource.replace(/^data.*;base64,/, '');
      const bufferClean = Buffer.from(rawString, 'base64');
      return this.__upload(nameFormatted, bufferClean, contentType)
    }
    if (resource instanceof Buffer) {
      return this.__upload(nameFormatted, resource, mimeType);
    }
    return new Promise((resolve, reject) => {
      reject(new Error('Resource error type'))
    })
  };

  async download(key: string) {
    return new Promise((resolve, reject) => {
      reject(new Error('must be defined'))
    })
  }
  async delete(key: string) {
    return new Promise((resolve, reject) => {
      reject(new Error('must be defined'))
    })
  }
  async exist(key: string) {
    return new Promise((resolve, reject) => {
      reject(new Error('must be defined'))
    })
  }
  
  getFileType(data: Buffer | Readable | string): Promise<FileType.FileTypeResult> {
    if (data instanceof Buffer) {
      return FileType.fromBuffer(data);
    }
    if (data instanceof Readable) {
      return FileType.fromStream(data)
    }
    if (typeof data === 'string') {
      const rawString = data.replace(/^data.*;base64,/, '')
      const header = rawString.substring(0, 2000)
      const bufferHeader = Buffer.from(header, 'base64');
      return FileType.fromBuffer(bufferHeader);
    }
  }

  getExtension(mimeType: string) {
    return extension(mimeType)
  }

  getContentEncoding(data: Buffer | Readable | string) {
    if (data instanceof Readable) {
      return 'binary';
    }
    return 'base64';
  }

  async streamToBuffer(stream: Readable | any): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const chunks = [];
      stream.on('data', chunk => {
        chunks.push(chunk);
      });
      stream.on('error', reject);
      stream.on('end', () => {
        const result = Buffer.concat(chunks);
        resolve(result);
      })
    })
  }

  bufferToBase64(buffer: Buffer): string {
    return buffer.toString('base64')
  }
}