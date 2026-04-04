import { CharInfo } from './types';

// IDs match the characters table in Supabase
export const CHARS: Record<number, CharInfo> = {
  1: { name: 'Shaw', emoji: '⚡', initial: 'S', bg: '#646464', bubble: '#646464' },
  2: { name: 'Lucien', emoji: '🦋', initial: 'L', bg: '#7b1fa2', bubble: '#6a1b9a' },
  3: { name: 'Victor', emoji: '👔', initial: 'V', bg: '#3949ab', bubble: '#283593' },
  4: { name: 'Kiro', emoji: '⭐', initial: 'K', bg: '#d84315', bubble: '#bf360c' },
  5: { name: 'Gavin', emoji: '🦅', initial: 'G', bg: '#00695c', bubble: '#004d40' },
};

const CHAR_OTHER: CharInfo = {
  name: 'Unknown',
  emoji: '💌',
  initial: '?',
  bg: '#37474f',
  bubble: '#37474f',
};

export function getCharInfo(id: number): CharInfo {
  return CHARS[id] ?? { ...CHAR_OTHER, name: `Contact ${id}` };
}
