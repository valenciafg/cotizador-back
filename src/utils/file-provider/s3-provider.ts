import {
  S3Client,
  HeadObjectCommand,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  PutObjectCommandInput,
  GetObjectCommandInput,
  GetObjectCommandOutput,
  DeleteObjectCommandInput,
  HeadObjectCommandInput
} from "@aws-sdk/client-s3";
// import { DeleteObjectCommand, DeleteObjectCommandInput, GetObjectCommand, GetObjectCommandInput, GetObjectCommandOutput, HeadObjectCommand, HeadObjectCommandInput, PutObjectCommand, PutObjectCommandInput } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { FileTypeResult } from "file-type/core";
import { FileProvider } from "./file-provider";


export class S3Provider extends FileProvider {
  bucket: string;
  client: S3Client;

  constructor(props) {
    super(props);
  }

  private getS3Endpoint(): string {
    const { endpoint } = this.params;
    if (endpoint) {
      const { endpointProtocol = 'https' } = this.params;
      const { endpointPort = '' } = this.params;
      const port = endpointPort !== '' ? `:${endpointPort}` : '';
      return `${endpointProtocol}://${endpoint}${port}`;
    }
    return undefined;
  }

  connect() {
    console.log('se va connectar');
    const endpoint = this.getS3Endpoint();
    console.log({ endpoint })
    this.bucket = this.path;
    this.client = new S3Client({
      region: this.hostname,
      endpoint,
      forcePathStyle: true,
      credentials: {
        accessKeyId: this.user,
        secretAccessKey: this.password
      }
    });
  }
  async __upload(key: string, resource: any, contentType?: string) {
    let type = contentType ? { mime: contentType } : null;
    if (!type) {
      type = await this.getFileType(resource);
    }
    const contentCodification = this.getContentEncoding(resource);
    const input: PutObjectCommandInput = {
      Bucket: this.bucket,
      Key: key,
      Body: resource,
      ContentType: type.mime,
      ContentEncoding: contentCodification
    };
    const command = new PutObjectCommand(input);
    await this.client.send(command);
    return {
      location: this.bucket,
      key,
    }
  };

  async download(key: string) {
    const input: GetObjectCommandInput = {
      Key: key,
      Bucket: this.bucket
    };
    const command = new GetObjectCommand(input);
    const response: GetObjectCommandOutput = await this.client.send(command);
    const { Body } = response;
    const buffer = await this.streamToBuffer(Body);
    const content = this.bufferToBase64(buffer);
    const type: FileTypeResult = await this.getFileType(content);
    return {
      ...type,
      content
    }
  }

  async delete(key) {
    const exist = await this.exist(key)
    if (!exist) {
      throw new Error('File not found')
    }
    const input: DeleteObjectCommandInput = {
      Key: key,
      Bucket: this.bucket
    };
    const command = new DeleteObjectCommand(input)
    return this.client.send(command);
  }

  async exist(key: string): Promise<boolean> {
    const input: HeadObjectCommandInput = {
      Key: key,
      Bucket: this.bucket
    };
    const command = new HeadObjectCommand(input);
    try {
      await this.client.send(command)
      return true;
    } catch (error) {
      return false;
    }
  }

  signedUrl(key: string, fileName: string, expiresIn = 36000) {
    const input: GetObjectCommandInput = {
      Key: key,
      Bucket: this.bucket,
    };
    if (fileName) {
      input.ResponseContentDisposition = `attachment; filename="${fileName}"`
    }
    const command = new GetObjectCommand(input)
    return getSignedUrl(this.client, command, { expiresIn })
  }
}