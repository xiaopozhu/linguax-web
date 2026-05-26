export interface FriendLinkBadge {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface FriendLink {
  name: string;
  url: string;
  badge?: FriendLinkBadge;
}

export const friendLinks: FriendLink[] = [
  {
    name: 'BacklinkLog',
    url: 'https://backlinklog.com/listing/linguax.app?utm_source=backlinklog&utm_medium=badge',
    badge: {
      src: 'https://backlinklog.com/badge/linguax.app.svg',
      alt: 'Listed on BacklinkLog',
      width: 160,
      height: 40,
    },
  },
];
