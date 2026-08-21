import React, { type ComponentProps, type ReactNode } from 'react';
import { TitleFormatterProvider } from '@docusaurus/theme-common/internal';
import type { Props } from '@theme/ThemeProvider/TitleFormatter';

type Formatter = ComponentProps<typeof TitleFormatterProvider>['formatter'];

const formatter: Formatter = (params) => {
  const title = params.title?.trim();
  if (title?.toLocaleLowerCase().includes(params.siteTitle.toLocaleLowerCase())) {
    return title;
  }
  return params.defaultFormatter(params);
};

export default function ThemeProviderTitleFormatter({
  children,
}: Props): ReactNode {
  return (
    <TitleFormatterProvider formatter={formatter}>
      {children}
    </TitleFormatterProvider>
  );
}
