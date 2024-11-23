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
          allowedTags: [
            'a',
            'img',
            'p',
            'h1',
            'h2',
            'h3',
            'h4',
            'h5',
            'h6',
            'ul',
            'ol',
            'li',
            'blockquote',
            'strong',
            'em',
            'code',
            'pre',
            'br',
            'hr',
          ],
          allowedAttributes: {
            '*': ['class'],
            a: ['href', 'target', 'noopener', 'noreferrer'],
            img: ['src', 'alt', 'width', 'height', 'loading'],
          },
          transformTags: {
            a: simpleTransform('a', { noopener: '', noreferrer: '' }),
          },
        }),
      }}
    />
  );
}
