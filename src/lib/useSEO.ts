import { useEffect } from 'react';

/**
 * Custom hook to dynamically set page-level SEO title and description tags.
 * Helps Google search bots index individual pages correctly.
 */
export function useSEO(title: string, description?: string) {
  useEffect(() => {
    const baseTitle = "RAJ SIR MATH CLASSES";
    const fullTitle = title ? `${title} | ${baseTitle}` : baseTitle;
    document.title = fullTitle;

    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', description);
      } else {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        metaDesc.setAttribute('content', description);
        document.head.appendChild(metaDesc);
      }
    }
  }, [title, description]);
}
