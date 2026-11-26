export interface SocialLink {
  id: 'email' | 'linkedin' | 'github' | 'instagram';
  label: string;
  url: string;
  handle: string;
  icon?: string;
}

// NOTE: Fill in your actual personal handles and profile URLs below.
// Email uses a "mailto:your-email@example.com" URL when filled.
export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'email',
    label: 'Email',
    url: '', // e.g. "mailto:harsh@example.com"
    handle: '', // e.g. "harsh@example.com"
    icon: '✉',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    url: '', // e.g. "https://linkedin.com/in/username"
    handle: '', // e.g. "in/username"
    icon: '💼',
  },
  {
    id: 'github',
    label: 'GitHub',
    url: '', // e.g. "https://github.com/username"
    handle: '', // e.g. "@username"
    icon: '🐙',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    url: '', // e.g. "https://instagram.com/username"
    handle: '', // e.g. "@username"
    icon: '📸',
  },
];

/**
 * Helper that returns only the social links that have been populated with a non-empty URL.
 */
export function getActiveSocialLinks(): SocialLink[] {
  return SOCIAL_LINKS.filter((link) => link.url && link.url.trim() !== '');
}
