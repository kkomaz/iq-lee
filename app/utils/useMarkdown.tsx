import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import { marked } from 'marked';

export function useMarkdown(mdText: string) {
  const [html, setHtml] = useState<string | null>(null);

  useEffect(() => {
    async function convertMarkdown() {
      const DOMPurify = (await import('dompurify')).default;
      const dirtyHtml = marked.parse(mdText);
      const cleanHtml = DOMPurify.sanitize(dirtyHtml);

      // Create a DOM element to manipulate links
      const wrapper = document.createElement('div');
      wrapper.innerHTML = cleanHtml;

      // Modify all <a> elements
      wrapper.querySelectorAll('a').forEach((a) => {
        a.setAttribute('target', '_blank');
        a.setAttribute('rel', 'noopener noreferrer');
      });

      setHtml(wrapper.innerHTML);
    }

    convertMarkdown();
  }, [mdText]);

  return html;
}
