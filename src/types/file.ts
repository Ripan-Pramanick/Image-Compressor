export interface FileWithMetadata {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  extension: string;
  preview?: string;
  processedFile?: Blob;
  processedSize?: number;
  status: FileStatus;
  progress: number;
  error?: string;
  originalDimensions?: Dimensions;
  processedDimensions?: Dimensions;
}

export type FileStatus = 'idle' | 'processing' | 'completed' | 'error';

export interface Dimensions {
  width: number;
  height: number;
}

export interface CompressionOptions {
  quality: number;
  maxWidth?: number;
  maxHeight?: number;
  fileType?: string;
  preserveAspectRatio?: boolean;
}

export interface ImageConversionOptions {
  targetFormat: 'jpeg' | 'png' | 'webp' | 'avif';
  quality?: number;
}

export interface ResizeOptions {
  width?: number;
  height?: number;
  maintainAspectRatio: boolean;
  fit?: 'contain' | 'cover' | 'fill';
}

export interface CropOptions {
  x: number;
  y: number;
  width: number;
  height: number;
  aspectRatio?: number;
}

export interface PDFOptions {
  quality?: number;
  mergeOrder?: string[];
  pagesToExtract?: number[];
  pagesToDelete?: number[];
  rotation?: 0 | 90 | 180 | 270;
}

export type SupportedImageType =
  | 'image/jpeg'
  | 'image/png'
  | 'image/webp'
  | 'image/avif'
  | 'image/gif'
  | 'image/bmp'
  | 'image/tiff';

export type SupportedPDFType = 'application/pdf';
