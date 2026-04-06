'use client';

import { useEffect, useRef } from 'react';
import { Conversation, DisplayMessage, CharInfo } from './types';
import Avatar from './Avatar';

function MessageBubble({
  message,
  ch,
}: {
  message: DisplayMessage;
  ch: CharInfo;
}) {
  const isNpc = message.sender === 'npc';
  return (
    <div
      className={`flex items-end gap-2 ${isNpc ? 'justify-start' : 'justify-end'}`}
    >
      {isNpc && <Avatar character={ch.name} size='md' />}
      <div style={{ maxWidth: '72%' }}>
        <div
          className='data-npc:bg-npc-bg data-npc:border-npc-border bg-mc-bg border-mc-border border px-3 py-2 text-sm leading-relaxed wrap-break-word text-[#8D898F]'
          data-npc={isNpc ? 'true' : undefined}
          style={{
            borderRadius: isNpc ? '4px 16px 16px 16px' : '16px 4px 16px 16px',
          }}
        >
          {message.content ?? ''}
        </div>
      </div>
      {!isNpc && <Avatar character='mc' size='md' />}
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
      <div
        className='flex flex-1 flex-col items-center justify-center gap-3 bg-white'
        style={{ color: '#7a7a9a' }}
      >
        <span className='text-5xl opacity-50'>💬</span>
        <p className='text-sm'>Select a conversation to begin</p>
      </div>
    );
  }

  return (
    <div className='height-full flex grow justify-center bg-white'>
      <div className='border-mc-border flex max-w-162.5 min-w-0 flex-1 grow flex-col border'>
        {/* Header */}
        <div className='from-message-blue via-message-purple to-message-pink flex shrink-0 items-center gap-3 border-b bg-linear-to-r px-5 py-3.5'>
          <div className='flex-1'>
            <div className='text-center text-xl font-semibold text-[#766a7b]'>
              {conv.name} - {ch.name}
            </div>
          </div>
          <div className='flex gap-2'>
            <button
              onClick={onRestart}
              className='bg-message-purple hover:bg-highlight-purple/50 cursor-pointer rounded border px-3.5 py-1.5 text-xs text-mauve-700 transition-colors'
            >
              ↺ Restart
            </button>
            <button
              onClick={onToggleAutoPlay}
              data-active={autoPlay ? 'true' : undefined}
              className='bg-message-purple hover:bg-highlight-purple/50 data-active:bg-highlight-purple cursor-pointer rounded border px-3.5 py-1.5 text-xs text-mauve-700 transition-colors'
            >
              {autoPlay ? '⏸ Auto' : '▶ Auto'}
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className='height-fill flex flex-1 flex-col overflow-y-auto bg-white'>
          <div
            className='height-fill flex grow flex-col gap-5 bg-cover bg-center p-5 bg-blend-lighten'
            style={{
              backgroundImage: `url(/chat/bg/${ch.name.toLowerCase()}.jpg)`,
              backgroundColor: 'rgba(255, 255, 255, 0.75)',
            }}
          >
            {messages.map((m, i) => (
              <MessageBubble key={`${m.id}-${i}`} message={m} ch={ch} />
            ))}
          </div>
          <div ref={messagesEndRef} />
        </div>

        {/* Choices */}
        {choices.length > 0 && (
          <div className='flex flex-col gap-2 border-t border-mauve-500 bg-gray-100 px-5 pt-3 pb-4'>
            <div className='text-xs tracking-widest text-mauve-700 uppercase'>
              Choose a reply
            </div>
            <div className='flex flex-col gap-1.5'>
              {choices.map((c) => (
                <button
                  key={c.id}
                  onClick={() => onPickChoice(c)}
                  className='bg-mauve-00 cursor-pointer rounded-lg border px-3.5 py-2.5 text-left text-sm text-mauve-700 transition-colors hover:bg-mauve-200'
                >
                  {c.title || c.content || '…'}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Done */}
        {choices.length === 0 && isDone && (
          <div className='from-message-blue to-message-pink border-t border-white bg-linear-90 px-5 py-4 text-center text-xs text-mauve-700'>
            ✨ Conversation complete
          </div>
        )}
      </div>
    </div>
  );
}
