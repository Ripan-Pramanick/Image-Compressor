import { LucideIcon } from 'lucide-react';

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  route: string;
  category: ToolCategory;
  features: string[];
  acceptedTypes: string[];
  maxFileSize: number;
  maxFiles: number;
}

export type ToolCategory = 'image' | 'pdf' | 'converter' | 'utility';

export interface ProcessingStats {
  toolId: string;
  timestamp: number;
  fileCount: number;
  originalSize: number;
  processedSize: number;
  duration: number;
}