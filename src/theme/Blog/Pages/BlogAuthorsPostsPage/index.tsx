import React, {type ReactNode} from 'react';
import {translate} from '@docusaurus/Translate';
import {PageMetadata} from '@docusaurus/theme-common';
import Original from '@theme-original/Blog/Pages/BlogAuthorsPostsPage';
import type {Props} from '@theme/Blog/Pages/BlogAuthorsPostsPage';
import {collectionTitle, paginatedMetadata, useBlogSectionMetadata} from '../../../BlogListPage/metadata';

export default function BlogAuthorsPostsPage(props: Props): ReactNode {
  const section = useBlogSectionMetadata();
  const author = props.author.name ?? props.author.key;
  const description = translate({id: 'seo.blog.author.description', message: 'Read articles by {author} in {section}. {description}'}, {author, section: section.title, description: section.description});
  const metadata = paginatedMetadata(collectionTitle(section.title, author), description, props.listMetadata.page);
  return <><Original {...props} /><PageMetadata {...metadata} /></>;
}
