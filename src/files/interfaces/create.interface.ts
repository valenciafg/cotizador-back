export interface ICreateFile {
  bucket: string;
  key: string;
  mimeType: string;
  type: string;
  createdBy: string;
  uuid?: string;
}
