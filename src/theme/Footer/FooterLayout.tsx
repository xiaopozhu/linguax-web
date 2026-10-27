import React from "react";
import { FooterLogo, FooterLinkItem } from "@docusaurus/theme-common";
import clsx from 'clsx';

import LinkItem from "./LinkItem";
import styles from "./index.module.scss";

type Props = {
  links: FooterLinkItem[];
  logo?: FooterLogo;
  copyright?: string;
  showLaunchpadlyBadge?: boolean;
};

const FooterLayout = ({ links, logo, copyright, showLaunchpadlyBadge = false }: Props) => {
  const contactLinks = links.filter(
    (item) => item['data-footer-group'] === 'contact',
  );
  const primaryLinks = links.filter(
    (item) => item['data-footer-group'] !== 'contact',
  );

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {(logo || showLaunchpadlyBadge) && (
          <div className={clsx(styles.logoRow, showLaunchpadlyBadge && styles.homeBrandRow)}>
            {logo && <img src={logo.src} alt={logo.alt} />}
            {showLaunchpadlyBadge && (
              <a
                className={styles.launchpadlyBadge}
                href="https://launchpadly.co/startup/linguax?ref=badge"
                target="_blank"
                rel="noopener noreferrer"
                data-launchpadly-badge="linguax"
                data-launchpadly-badge-variant="light"
              >
                <img
                  src="https://launchpadly.co/embed/badges/startup/linguax.svg?variant=light"
                  alt="Launchpadly Startup Directory"
                  width="220"
                  height="48"
                  loading="lazy"
                  decoding="async"
                />
              </a>
            )}
          </div>
        )}
        <div className={styles.footerRow}>
          {copyright && <div className={styles.copyRight}>{copyright}</div>}
          <div className={styles.linkRows}>
            <div className={styles.links}>
              {primaryLinks.map((item) => (
                <LinkItem key={item.label} item={item} />
              ))}
            </div>
            {contactLinks.length > 0 && (
              <div className={styles.contactLinks}>
                {contactLinks.map((item) => (
                  <LinkItem key={item.label} item={item} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterLayout;
