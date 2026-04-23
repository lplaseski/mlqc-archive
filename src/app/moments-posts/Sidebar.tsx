'use client';

import { FriendPost } from './types';
import { getFriendCharInfo, FRIEND_CHARS } from './charInfo';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: '0', label: '💕 MC' },
  { key: '1', label: '👔 Victor' },
  { key: '2', label: '🦋 Lucien' },
  { key: '3', label: '⭐ Kiro' },
  { key: '4', label: '🦅 Gavin' },
  { key: '34', label: '⚡ Shaw' },
  { key: 'other', label: 'Others' },
];

interface SidebarProps {
  posts: FriendPost[];
  activePostId: number | null;
  search: string;
  filter: string;
  onSelectPost: (id: number) => void;
  onSearchChange: (s: string) => void;
  onFilterChange: (f: string) => void;
}

export default function Sidebar({
  posts,
  activePostId,
  search,
  filter,
  onSelectPost,
  onSearchChange,
  onFilterChange,
}: SidebarProps) {
  return (
    <div
      className='from-message-blue via-message-purple to-message-pink flex shrink-0 flex-col border-r border-mauve-500 bg-linear-90'
      style={{ width: 300, minWidth: 260 }}
    >
      <div className='border-b p-4'>
        <h1 className='mb-2.5 text-sm font-bold tracking-wide text-mauve-600'>
          Friend Posts
        </h1>
        <input
          type='text'
          placeholder='Search posts…'
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          autoComplete='off'
          className='bg-message-purple w-full rounded-lg border border-mauve-600 px-3 py-1.5 text-xs text-mauve-700 placeholder-mauve-700 outline-none'
        />
      </div>

      <div className='flex flex-wrap gap-1.5 border-b border-mauve-500 px-3.5 py-2.5'>
        {FILTERS.map((f) => {
          const isActive = filter === f.key;
          return (
            <button
              key={f.key}
              onClick={() => onFilterChange(f.key)}
              data-active={isActive ? 'true' : undefined}
              className='data-active:bg-highlight-purple data-active:border-highlight-purple cursor-pointer rounded-full border bg-white/30 px-2.5 py-1 text-[11px] text-mauve-700 transition-colors data-active:text-white'
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <div className='flex-1 overflow-y-auto'>
        {posts.map((post) => {
          const ch = getFriendCharInfo(post.character_id);
          const isActive = post.id === activePostId;
          return (
            <div
              key={post.id}
              data-active={isActive ? 'true' : undefined}
              onClick={() => onSelectPost(post.id)}
              className='data-active:bg-highlight-purple/50 flex cursor-pointer items-center gap-2.5 border-b px-3.5 py-2.5 transition-colors'
            >
              <div
                className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg'
                style={{ background: ch.color, color: 'white' }}
              >
                {ch.emoji}
              </div>
              <div className='min-w-0'>
                <div className='truncate text-xs font-bold text-mauve-700'>
                  {post.title}
                </div>
                <div className='mt-0.5 text-[11px] text-mauve-600'>
                  {ch.name} · #{post.id}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className='border-t border-mauve-500 px-3.5 py-1.5 text-[11px] text-mauve-600'>
        {posts.length} post{posts.length !== 1 ? 's' : ''}
      </div>
    </div>
  );
}
