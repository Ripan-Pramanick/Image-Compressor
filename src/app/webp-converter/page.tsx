import { ToolLayout } from '@/components/ui/ToolLayout';
import { ImageConverter } from '@/components/tools/ImageConverter';
import { generateMetadata } from '@/config/seo';

export const metadata = generateMetadata({
  title: 'WebP Converter - Convert Images to and from WebP',
  description: 'Convert images between WebP and other formats directly in your browser.',
  path: '/webp-converter',
});

export default function WebpConverterPage() {
  return (
    <ToolLayout
      title="WebP Converter"
      description="Convert images between WebP and JPG, PNG, and AVIF formats with quality control."
    >
      <ImageConverter />
    </ToolLayout>
  );
}
