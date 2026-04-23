import { FriendCharInfo } from './types';

// IDs from friend_data.json — different from the existing characters table
export const FRIEND_CHARS: Record<number, FriendCharInfo> = {
  1: { name: 'Victor', emoji: '👔', color: '#283593', avatarKey: 'victor' },
  2: { name: 'Lucien', emoji: '🦋', color: '#6a1b9a', avatarKey: 'lucien' },
  3: { name: 'Kiro', emoji: '⭐', color: '#e65100', avatarKey: 'kiro' },
  4: { name: 'Gavin', emoji: '🦅', color: '#00695c', avatarKey: 'gavin' },
  34: { name: 'Shaw', emoji: '⚡', color: '#646464', avatarKey: 'shaw' },
};

export const EXTENDED: Record<number, FriendCharInfo> = {
  ...FRIEND_CHARS,
  0: { name: 'MC', emoji: '💕', color: '#c2185b', avatarKey: 'mc' },
};

const FALLBACK: Omit<FriendCharInfo, 'name'> = {
  emoji: '💌',
  color: '#37474f',
  avatarKey: '',
};

export function getFriendCharInfo(
  id: number,
  fallbackName?: string | null
): FriendCharInfo {
  return EXTENDED[id] ?? { name: fallbackName ?? `Contact ${id}`, ...FALLBACK };
}
