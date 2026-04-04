'use client';

import { useEffect, useRef } from 'react';
import { Conversation, DisplayMessage, CharInfo } from './types';

function MessageBubble({ message, ch }: { message: DisplayMessage; ch: CharInfo }) {
  const isNpc = message.sender === 'npc';
  return (
    <div className={`flex items-end gap-2 ${isNpc ? 'justify-start' : 'justify-end'}`}>
      {isNpc && (
        <div
          className='flex h-7 w-7 flex-shrink-0 items-center justify-center self-end rounded-full text-sm font-bold'
          style={{ background: ch.bg, color: '#fff' }}
        >
          {ch.emoji}
        </div>
      )}
      <div style={{ maxWidth: '72%' }}>
        <div
          className='break-words px-3 py-2 text-sm leading-relaxed'
          style={{
            background: isNpc ? '#22222f' : ch.bubble,
            color: '#e8e8f0',
            borderRadius: isNpc ? '4px 16px 16px 16px' : '16px 4px 16px 16px',
          }}
        >
          {message.content ?? ''}
        </div>
        {message.send_time && (
          <div
            className='mt-1 text-[10px]'
            style={{ color: '#7a7a9a', textAlign: isNpc ? 'left' : 'right' }}
          >
            {message.send_time}
          </div>
        )}
      </div>
    </div>
  );
}

interface ChatPanelProps {
  conv: Conversation | null;
  charInfo: CharInfo | null;
  messages: DisplayMessage[];
  choices: DisplayMessage[];
  isDone: boolean;
  autoPlay: boolean;
  onPickChoice: (choice: DisplayMessage) => void;
  onRestart: () => void;
  onToggleAutoPlay: () => void;
}

export default function ChatPanel({
  conv,
  charInfo: ch,
  messages,
  choices,
  isDone,
  autoPlay,
  onPickChoice,
  onRestart,
  onToggleAutoPlay,
}: ChatPanelProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!conv || !ch) {
    return (
      <div className='flex flex-1 flex-col items-center justify-center gap-3' style={{ color: '#7a7a9a' }}>
        <span className='text-5xl opacity-50'>💬</span>
        <p className='text-sm'>Select a conversation to begin</p>
      </div>
    );
  }

  return (
    <div className='flex min-w-0 flex-1 flex-col'>
      {/* Header */}
      <div
        className='flex flex-shrink-0 items-center gap-3 border-b px-5 py-3.5'
        style={{ background: '#1a1a24', borderColor: '#2e2e3e' }}
      >
        <div
          className='flex h-10 w-10 items-center justify-center rounded-full text-xl font-bold'
          style={{ background: ch.bg, color: '#fff' }}
        >
          {ch.emoji}
        </div>
        <div className='flex-1'>
          <div className='text-sm font-bold' style={{ color: '#e8e8f0' }}>
            {conv.name}
          </div>
          <div className='mt-0.5 text-xs' style={{ color: '#7a7a9a' }}>
            {ch.name} · {conv.type === 1 ? 'Interactive' : 'Linear'} · #{conv.id}
          </div>
        </div>
        <div className='flex gap-2'>
          <button
            onClick={onRestart}
            className='cursor-pointer rounded border px-3.5 py-1.5 text-xs transition-colors'
            style={{ background: 'transparent', borderColor: '#2e2e3e', color: '#e8e8f0' }}
          >
            ↺ Restart
          </button>
          <button
            onClick={onToggleAutoPlay}
            className='cursor-pointer rounded border px-3.5 py-1.5 text-xs transition-colors'
            style={{
              background: autoPlay ? '#8b5cf6' : 'transparent',
              borderColor: autoPlay ? '#8b5cf6' : '#2e2e3e',
              color: autoPlay ? '#fff' : '#e8e8f0',
            }}
          >
            {autoPlay ? '⏸ Auto' : '▶ Auto'}
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className='flex flex-1 flex-col gap-1 overflow-y-auto p-5'>
        {messages.map((m, i) => (
          <MessageBubble key={`${m.id}-${i}`} message={m} ch={ch} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Choices */}
      {choices.length > 0 && (
        <div
          className='flex flex-col gap-2 border-t px-5 pb-4 pt-3'
          style={{ background: '#1a1a24', borderColor: '#2e2e3e' }}
        >
          <div
            className='text-[11px] uppercase tracking-widest'
            style={{ color: '#7a7a9a' }}
          >
            Choose a reply
          </div>
          <div className='flex flex-col gap-1.5'>
            {choices.map((c) => (
              <button
                key={c.id}
                onClick={() => onPickChoice(c)}
                className='cursor-pointer rounded-lg border px-3.5 py-2.5 text-left text-xs transition-colors'
                style={{
                  background: '#22222f',
                  borderColor: '#2e2e3e',
                  color: '#e8e8f0',
                  lineHeight: 1.4,
                }}
              >
                {c.title || c.content || '…'}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Done */}
      {choices.length === 0 && isDone && (
        <div
          className='border-t px-5 py-4 text-center text-xs'
          style={{ background: '#1a1a24', borderColor: '#2e2e3e', color: '#7a7a9a' }}
        >
          ✨ Conversation complete
        </div>
      )}
    </div>
  );
}
