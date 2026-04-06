'use client';

import { Conversation } from './types';
import { getCharInfo } from './charInfo';
import Avatar from './Avatar';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: '2', label: '🦋 Lucien' },
  { key: '3', label: '👔 Victor' },
  { key: '4', label: '⭐ Kiro' },
  { key: '5', label: '🦅 Gavin' },
  { key: '1', label: '⚡ Shaw' },
  { key: 'other', label: 'Others' },
];

interface SidebarProps {
  conversations: Conversation[];
  activeConvId: number | null;
  search: string;
  currentFilter: string;
  showHidden: boolean;
  onSelectConv: (id: number) => void;
  onSearchChange: (s: string) => void;
  onFilterChange: (f: string) => void;
  onToggleHidden: () => void;
}

export default function Sidebar({
  conversations,
  activeConvId,
  search,
  currentFilter,
  showHidden,
  onSelectConv,
  onSearchChange,
  onFilterChange,
  onToggleHidden,
}: SidebarProps) {
  return (
    <div
      className='from-message-blue via-message-purple to-message-pink flex shrink-0 flex-col border-r border-mauve-500 bg-linear-90'
      style={{
        width: 300,
        minWidth: 260,
      }}
    >
      {/* Header */}
      <div className='border-b p-4'>
        <h1 className='mb-2.5 text-sm font-bold tracking-wide text-mauve-600'>
          Message Replay
        </h1>
        <input
          type='text'
          placeholder='Search conversations…'
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          autoComplete='off'
          className='bg-message-purple w-full rounded-lg border border-mauve-600 px-3 py-1.5 text-xs text-mauve-700 placeholder-mauve-700 outline-none'
        />
      </div>

      {/* Filter bar */}
      <div className='flex flex-wrap gap-1.5 border-b border-mauve-500 px-3.5 py-2.5'>
        {FILTERS.map((f) => {
          const isActive = currentFilter === f.key;
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
        <button
          onClick={onToggleHidden}
          data-active={showHidden ? 'true' : undefined}
          className='data-active:bg-highlight-purple data-active:border-highlight-purple cursor-pointer rounded-full border bg-white/30 px-2.5 py-1 text-[11px] text-mauve-700 transition-colors data-active:text-white'
        >
          + Hidden
        </button>
      </div>

      {/* Conversation list */}
      <div className='flex-1 overflow-y-auto'>
        {conversations.map((conv) => {
          const ch = getCharInfo(conv.character_id);
          const isActive = conv.id === activeConvId;
          return (
            <div
              data-active={isActive ? 'true' : undefined}
              key={conv.id}
              onClick={() => onSelectConv(conv.id)}
              className='data-active:bg-highlight-purple/50 flex cursor-pointer items-center gap-2.5 border-b px-3.5 py-2.5 transition-colors'
            >
              <Avatar character={ch.name} />
              <div className='min-w-0'>
                <div className='truncate text-xs font-bold text-mauve-700'>
                  {conv.name}
                  {conv.hidden && (
                    <span className='ml-1 rounded px-1 align-middle text-[9px] text-mauve-600'>
                      hidden
                    </span>
                  )}
                </div>
                <div className='mt-0.5 text-[11px] text-mauve-600'>
                  {ch.name} · #{conv.id}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Count */}
      <div className='border-t border-mauve-500 px-3.5 py-1.5 text-[11px] text-mauve-600'>
        {conversations.length} conversation
        {conversations.length !== 1 ? 's' : ''}
      </div>
    </div>
  );
}
