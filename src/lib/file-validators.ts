import { SupportedImageType, SupportedPDFType } from '@/types/file';

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

const ALLOWED_IMAGE_TYPES: SupportedImageType[] = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
  'image/gif',
  'image/bmp',
  'image/tiff',
];

const ALLOWED_PDF_TYPES: SupportedPDFType[] = ['application/pdf'];

export function validateFileType(
  file: File,
  acceptedTypes: string[]
): { valid: boolean; error?: string } {
  if (!file || !file.type) {
    return { valid: false, error: 'Invalid file' };
  }

  // Check MIME type
  const isAllowed = acceptedTypes.some(type => {
    if (type.includes('*')) {
      return file.type.startsWith(type.replace('*', ''));
    }
    return file.type === type;
  });

  if (!isAllowed) {
    return {
      valid: false,
      error: `File type ${file.type} is not supported. Accepted types: ${acceptedTypes.join(', ')}`,
    };
  }

  return { valid: true };
}

export function validateFileSize(
  file: File,
  maxSize: number = MAX_FILE_SIZE
): { valid: boolean; error?: string } {
  if (file.size === 0) {
    return { valid: false, error: 'File is empty' };
  }

  if (file.size > maxSize) {
    const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(0);
    const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
    return {
      valid: false,
      error: `File size (${fileSizeMB}MB) exceeds maximum allowed size of ${maxSizeMB}MB`,
    };
  }

  return { valid: true };
}

export function validateFile(
  file: File,
  acceptedTypes: string[],
  maxSize?: number
): { valid: boolean; error?: string } {
  const typeValidation = validateFileType(file, acceptedTypes);
  if (!typeValidation.valid) {
    return typeValidation;
  }

  const sizeValidation = validateFileSize(file, maxSize);
  if (!sizeValidation.valid) {
    return sizeValidation;
  }

  return { valid: true };
}

export function isImageFile(file: File): boolean {
  return ALLOWED_IMAGE_TYPES.includes(file.type as SupportedImageType);
}

export function isPDFFile(file: File): boolean {
  return ALLOWED_PDF_TYPES.includes(file.type as SupportedPDFType);
}

export function sanitizeFilename(filename: string): string {
  // Remove path traversal characters
  return filename
    .replace(/\.\./g, '')
    .replace(/[\/\\]/g, '')
    .replace(/[<>:"|?*]/g, '_')
    .replace(/\x00/g, '')
    .trim();
}