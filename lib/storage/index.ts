export interface ImageStorage {
  getImage(id: number): Promise<ReadableStream | null>;
}
