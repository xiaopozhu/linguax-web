import {translate} from '@docusaurus/Translate';
import useRouteContext from '@docusaurus/useRouteContext';

export function useBlogSectionMetadata() {
  const {plugin} = useRouteContext();
  const isTerms = plugin.id === 'terms';
  return isTerms ? {
    title: translate({id: 'seo.terms.section.title', message: 'Legal & Policies'}),
    description: translate({id: 'seo.terms.section.description', message: 'LinguaX privacy policy, service agreement, and AIx service terms.'}),
  } : {
    title: translate({id: 'seo.blog.section.title', message: 'LinguaX Blog'}),
    description: translate({id: 'seo.blog.section.description', message: 'Mac mouse setup guides, input-source automation tips, and LinguaX product news.'}),
  };
}

export function collectionTitle(section: string, label: string): string {
  return translate({id: 'seo.blog.collection.title', message: '{section}: {label}'}, {section, label});
}

export function paginatedMetadata(title: string, description: string, page: number) {
  if (page <= 1) return {title, description};
  return {
    title: translate({id: 'seo.blog.pagination.title', message: '{title} – Page {page}'}, {title, page}),
    description: translate({id: 'seo.blog.pagination.description', message: '{description} Page {page}.'}, {description, page}),
  };
}
