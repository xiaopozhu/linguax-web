/**
 * Cloned and modified from original theme-classic Footer LinkItem component
 *
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Link from '@docusaurus/Link';
import { FooterLinkItem } from '@docusaurus/theme-common';
import useBaseUrl from '@docusaurus/useBaseUrl';
import clsx from 'clsx';

type Props = {
  className?: string;
  item: FooterLinkItem;
};

const socialIcons = {
	twitter: <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24' fill='none'><path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' fill='currentColor' /></svg>,
	dribbble: <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24' fill='none'><path clipRule='evenodd' fillRule='evenodd' d='M2 12C2 6.477 6.477 2 12 2A10 10 0 1 1 2 12Zm14.86-6.09A7.726 7.726 0 0 0 12 4.2c-.57 0-1.12.07-1.66.18.66.87 1.66 2.29 2.69 4.27 1.47-.65 2.81-1.51 3.83-2.74ZM8.55 5c.55.65 1.63 2.06 2.79 4.25-2.34.71-4.73.87-6.16.87h-.13c-.24 0-.45 0-.62-.01C5 7.87 6.5 6 8.55 5ZM4.2 11.89V12c0 1.91.7 3.66 1.84 5 .41-.61 1.12-1.54 2.15-2.5 1.08-.97 2.54-1.96 4.4-2.58-.15-.36-.3-.7-.45-1.03-2.78.87-5.52 1-7.08 1.01h-.01c-.34 0-.63 0-.85-.01Zm12.22 6.53A57.5 57.5 0 0 0 15 13.17c.5-.07 1-.11 1.58-.11h.02c.93 0 1.95.12 3.06.37a7.788 7.788 0 0 1-3.24 4.99ZM12 19.8c-1.74 0-3.34-.57-4.64-1.54.28-.45.87-1.32 1.82-2.22.96-.93 2.32-1.89 4.05-2.46.59 1.67 1.13 3.57 1.54 5.71-.86.33-1.77.51-2.77.51Zm6.13-12.62a7.823 7.823 0 0 1 1.66 4.45 15.32 15.32 0 0 0-3.19-.35h-.01c-.8 0-1.55.07-2.26.19l-.027-.067c-.16-.395-.313-.774-.493-1.143 1.58-.69 3.09-1.68 4.32-3.08Z' fill='currentColor' /></svg>,
	facebook: <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24' fill='none'><path d='M22 11.994c0-5.522-4.478-10-10-10s-10 4.478-10 10c0 4.99 3.656 9.128 8.438 9.879v-6.988h-2.54v-2.891h2.54V9.79c0-2.506 1.493-3.89 3.777-3.89 1.094 0 2.239.195 2.239.195v2.46h-1.262c-1.242 0-1.63.771-1.63 1.563v1.876h2.774l-.443 2.891h-2.33v6.988c4.78-.75 8.437-4.887 8.437-9.879Z' fill='currentColor' /></svg>,
	instagram: <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24' fill='none'><path clipRule='evenodd' fillRule='evenodd' d='M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6Zm10.9 2.75a1.25 1.25 0 1 0-2.5 0 1.25 1.25 0 0 0 2.5 0ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm-3 5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Z' fill='currentColor' /></svg>,
	linkedin: <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24' fill='none'><path clipRule='evenodd' fillRule='evenodd' d='M21 5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5Zm-2.5 8.2v5.3h-2.79v-4.93a1.4 1.4 0 0 0-1.4-1.4c-.77 0-1.39.63-1.39 1.4v4.93h-2.79v-8.37h2.79v1.11c.48-.78 1.47-1.3 2.32-1.3 1.8 0 3.26 1.46 3.26 3.26ZM6.88 8.56a1.686 1.686 0 0 0 0-3.37 1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68Zm1.39 1.57v8.37H5.5v-8.37h2.77Z' fill='currentColor' /></svg>,
  github: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path  clipRule="evenodd" fillRule="evenodd" d="M12.048 2a9.912 9.912 0 0 0-6.511 2.441 10.308 10.308 0 0 0-3.407 6.17 10.436 10.436 0 0 0 1.323 6.954 10.078 10.078 0 0 0 5.422 4.418c.505.093.684-.227.684-.497v-1.744c-2.804.623-3.395-1.379-3.395-1.379a2.738 2.738 0 0 0-1.115-1.504c-.906-.63.073-.63.073-.63.319.046.621.164.887.348.266.183.487.426.648.709.136.252.32.475.54.655a2.102 2.102 0 0 0 2.38.201 2.193 2.193 0 0 1 .617-1.372c-2.23-.258-4.572-1.139-4.572-5.035a4.013 4.013 0 0 1 1.029-2.75 3.812 3.812 0 0 1 .099-2.712s.843-.277 2.76 1.05a9.297 9.297 0 0 1 5.027 0c1.916-1.326 2.755-1.05 2.755-1.05.369.85.413 1.812.122 2.693a4.014 4.014 0 0 1 1.03 2.751c0 3.94-2.348 4.802-4.585 5.034a2.438 2.438 0 0 1 .685 1.888v2.815c0 .333.178.59.69.49a10.083 10.083 0 0 0 5.345-4.434 10.437 10.437 0 0 0 1.29-6.908 10.308 10.308 0 0 0-3.373-6.133A9.915 9.915 0 0 0 12.048 2Z" fill="currentColor" /></svg>,
  email: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 384" fill="none"><path clipRule="evenodd" fillRule="evenodd" d="M64,48 C55.2,48 48,55.2 48,64 L48,86.1 L220.5,227.7 C241.2,244.7 270.9,244.7 291.6,227.7 L464,86.1 L464,64 C464,55.2 456.8,48 448,48 L64,48 Z M48,148.2 L48,320 C48,328.8 55.2,336 64,336 L448,336 C456.8,336 464,328.8 464,320 L464,148.2 L322,264.8 C283.6,296.3 228.3,296.3 190,264.8 L48,148.2 Z M0,64 C0,28.7 28.7,0 64,0 L448,0 C483.3,0 512,28.7 512,64 L512,320 C512,355.3 483.3,384 448,384 L64,384 C28.7,384 0,355.3 0,320 L0,64 Z" fill="currentColor" /></svg>
};

const LinkItem = ({ item, className }: Props) => {
  const { to, href, label, prependBaseUrlToHref, ...props } = item;
  const toUrl = useBaseUrl(to);
  const normalizedHref = useBaseUrl(href, { forcePrependBaseUrl: true });

  const icon = socialIcons[label];
  return (
    <Link
      className={clsx('footer__link-item', className)}
      {...(href
        ? {
            href: prependBaseUrlToHref ? normalizedHref : href,
          }
        : {
            to: toUrl,
          })}
      {...props}
    >
      {icon || label}
    </Link>
  );
};

export default LinkItem;
