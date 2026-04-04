'use client';

import { Conversation } from './types';
import { getCharInfo } from './charInfo';

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
      className='flex flex-shrink-0 flex-col border-r'
      style={{
        width: 300,
        minWidth: 260,
        background: '#1a1a24',
        borderColor: '#2e2e3e',
      }}
    >
      {/* Header */}
      <div className='border-b p-4' style={{ borderColor: '#2e2e3e' }}>
        <h1
          className='mb-2.5 text-sm font-bold tracking-wide'
          style={{ color: '#e8e8f0' }}
        >
          💌 Message Replay
        </h1>
        <input
          type='text'
          placeholder='Search conversations…'
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          autoComplete='off'
          className='w-full rounded-lg border px-3 py-1.5 text-xs outline-none'
          style={{
            background: '#22222f',
            borderColor: '#2e2e3e',
            color: '#e8e8f0',
          }}
        />
      </div>

      {/* Filter bar */}
      <div
        className='flex flex-wrap gap-1.5 border-b px-3.5 py-2.5'
        style={{ borderColor: '#2e2e3e' }}
      >
        {FILTERS.map((f) => {
          const isActive = currentFilter === f.key;
          return (
            <button
              key={f.key}
              onClick={() => onFilterChange(f.key)}
              className='cursor-pointer rounded-full border px-2.5 py-1 text-[11px] transition-colors'
              style={{
                background: isActive ? '#8b5cf6' : 'transparent',
                borderColor: isActive ? '#8b5cf6' : '#2e2e3e',
                color: isActive ? '#fff' : '#7a7a9a',
                fontWeight: isActive ? 600 : 400,
              }}
            >
              {f.label}
            </button>
          );
        })}
        <button
          onClick={onToggleHidden}
          className='cursor-pointer rounded-full border px-2.5 py-1 text-[11px] transition-colors'
          style={{
            background: showHidden ? '#8b5cf6' : 'transparent',
            borderColor: showHidden ? '#8b5cf6' : '#2e2e3e',
            color: showHidden ? '#fff' : '#7a7a9a',
            fontWeight: showHidden ? 600 : 400,
          }}
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
              key={conv.id}
              onClick={() => onSelectConv(conv.id)}
              className='flex cursor-pointer items-center gap-2.5 border-b px-3.5 py-2.5 transition-colors'
              style={{
                borderColor: 'rgba(255,255,255,0.03)',
                background: isActive ? '#22222f' : undefined,
                borderLeft: isActive
                  ? '3px solid #8b5cf6'
                  : '3px solid transparent',
              }}
            >
              <div
                className='flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-lg font-bold'
                style={{ background: ch.bg, color: '#fff' }}
              >
                {ch.emoji}
              </div>
              <div className='min-w-0'>
                <div
                  className='truncate text-xs font-semibold'
                  style={{ color: '#e8e8f0' }}
                >
                  {conv.name}
                  {conv.hidden && (
                    <span
                      className='ml-1 rounded px-1 align-middle text-[9px]'
                      style={{ background: '#22222f', color: '#7a7a9a' }}
                    >
                      hidden
                    </span>
                  )}
                </div>
                <div
                  className='mt-0.5 text-[11px]'
                  style={{ color: '#7a7a9a' }}
                >
                  {ch.name} · #{conv.id}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Count */}
      <div
        className='border-t px-3.5 py-1.5 text-[11px]'
        style={{ borderColor: '#2e2e3e', color: '#7a7a9a' }}
      >
        {conversations.length} conversation
        {conversations.length !== 1 ? 's' : ''}
      </div>
    </div>
  );
}
