// app/utils/useMarkdown.tsx
import { useEffect, useState } from 'react';
import { marked } from 'marked';

export function useMarkdown(mdText: string) {
  const [html, setHtml] = useState<string | null>(null);

  useEffect(() => {
    // Only run this on the client
    async function convertMarkdown() {
      const DOMPurify = (await import('dompurify')).default;
      const dirtyHtml = marked.parse(mdText);
      const cleanHtml = DOMPurify.sanitize(dirtyHtml);
      setHtml(cleanHtml);
    }

    convertMarkdown();
  }, [mdText]);

  return html;
}
