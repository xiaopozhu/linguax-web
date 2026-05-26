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
];
