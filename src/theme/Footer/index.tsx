import { useThemeConfig } from "@docusaurus/theme-common";
import React, { memo } from "react";
import { useLocation } from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';

import FooterLayout from "./FooterLayout";

const Footer = () => {
  const { footer } = useThemeConfig();
  const { pathname } = useLocation();
  const homeUrl = useBaseUrl('/');
  const isHomePage = pathname.replace(/\/$/, '') === homeUrl.replace(/\/$/, '');

  if (!footer) {
    return null;
  }
  const { copyright, links, logo } = footer;

  return (
    <FooterLayout
      logo={logo}
      copyright={copyright}
      links={links}
      showLaunchpadlyBadge={isHomePage}
    />
  );
};

export default memo(Footer);
