import React, {type ReactNode} from 'react';
import {translate} from '@docusaurus/Translate';
import {PageMetadata, translateTagsPageTitle} from '@docusaurus/theme-common';
import Original from '@theme-original/BlogTagsListPage';
import type {Props} from '@theme/BlogTagsListPage';
import {collectionTitle, useBlogSectionMetadata} from '../BlogListPage/metadata';

export default function BlogTagsListPage(props: Props): ReactNode {
  const section = useBlogSectionMetadata();
  const title = collectionTitle(section.title, translateTagsPageTitle());
  const description = translate({id: 'seo.blog.tags.description', message: 'Browse {section} by topic. {description}'}, {section: section.title, description: section.description});
  return <><Original {...props} /><PageMetadata title={title} description={description} /></>;
}
