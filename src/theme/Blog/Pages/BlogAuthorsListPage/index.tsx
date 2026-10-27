import React, {type ReactNode} from 'react';
import {translate} from '@docusaurus/Translate';
import {PageMetadata} from '@docusaurus/theme-common';
import {translateBlogAuthorsListPageTitle} from '@docusaurus/theme-common/internal';
import Original from '@theme-original/Blog/Pages/BlogAuthorsListPage';
import type {Props} from '@theme/Blog/Pages/BlogAuthorsListPage';
import {collectionTitle, useBlogSectionMetadata} from '../../../BlogListPage/metadata';

export default function BlogAuthorsListPage(props: Props): ReactNode {
  const section = useBlogSectionMetadata();
  const title = collectionTitle(section.title, translateBlogAuthorsListPageTitle());
  const description = translate({id: 'seo.blog.authors.description', message: 'Meet the authors behind {section}. {description}'}, {section: section.title, description: section.description});
  return <><Original {...props} /><PageMetadata title={title} description={description} /></>;
}
