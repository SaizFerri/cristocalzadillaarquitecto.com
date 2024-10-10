import sanitizeHtml, { simpleTransform } from 'sanitize-html';

import { cn } from '@/lib/utils';

type WysiwygProps = {
  className?: string;
  content?: string;
};

export default function Wysiwyg({ className, content }: WysiwygProps) {
  if (!content) {
    return null;
  }
  return (
    <div
      className={cn('wysiwyg', className)}
      dangerouslySetInnerHTML={{
        __html: sanitizeHtml(content, {
          allowedAttributes: {
            '*': ['class'],
            a: ['href', 'target', 'noopener', 'noreferrer'],
          },
          transformTags: {
            a: simpleTransform('a', { noopener: '', noreferrer: '' }),
          },
        }),
      }}
    />
  );
}
