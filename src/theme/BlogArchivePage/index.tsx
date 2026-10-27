import React, {type ReactNode} from 'react';
import {translate} from '@docusaurus/Translate';
import {PageMetadata} from '@docusaurus/theme-common';
import Original from '@theme-original/BlogArchivePage';
import type {Props} from '@theme/BlogArchivePage';
import {collectionTitle, useBlogSectionMetadata} from '../BlogListPage/metadata';

export default function BlogArchivePage(props: Props): ReactNode {
  const section = useBlogSectionMetadata();
  const title = collectionTitle(section.title, translate({id: 'theme.blog.archive.title', message: 'Archive'}));
  const description = translate({id: 'seo.blog.archive.description', message: 'Browse every entry in {section}, organized by year. {description}'}, {section: section.title, description: section.description});
  return <><Original {...props} /><PageMetadata title={title} description={description} /></>;
}
