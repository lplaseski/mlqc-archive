'use client';

import { useEffect, useRef } from 'react';
import {
  FriendPost,
  FriendPostExtra,
  FriendPostOption,
  FriendCharInfo,
} from './types';
import { getFriendCharInfo } from './charInfo';

const KNOWN_AVATAR_KEYS = new Set([
  'mc',
  'victor',
  'lucien',
  'kiro',
  'gavin',
  'shaw',
]);

function Avatar({
  info,
  size = 'md',
}: {
  info: FriendCharInfo;
  size?: 'sm' | 'md';
}) {
  const dim = size === 'md' ? 'h-12 w-12' : 'h-9 w-9';
  if (KNOWN_AVATAR_KEYS.has(info.avatarKey)) {
    return (
      <div
        className={`${dim} shrink-0 rounded-full bg-cover bg-center`}
        style={{ backgroundImage: `url(/chat/profile/${info.avatarKey}.jpg)` }}
      />
    );
  }
  return (
    <div
      className={`${dim} flex shrink-0 items-center justify-center rounded-full text-xl`}
      style={{ background: info.color, color: 'white' }}
    >
      {info.emoji}
    </div>
  );
}

const MC_INFO: FriendCharInfo = {
  name: 'Heroine',
  emoji: '💕',
  color: '#c2185b',
  avatarKey: 'mc',
};

const MainMessage = ({
  text,
  charInfo,
}: {
  text: string;
  sender: 'npc' | 'player';
  charInfo: FriendCharInfo;
}) => {
  return (
    <div className='flex items-start gap-2.5'>
      <Avatar info={charInfo} />
      <div style={{ maxWidth: '72%' }}>
        <p className='text-lg font-semibold text-red-400'>{charInfo.name}</p>
        <p className='text-lg text-stone-700'>{text}</p>
      </div>
    </div>
  );
};

const Response = ({
  text,
  charInfo,
}: {
  text: string;
  charInfo: FriendCharInfo;
}) => {
  return (
    <p className='text-base text-stone-700'>
      <span className='text-red-400'>{charInfo.name} :</span> {text}
    </p>
  );
};

interface PostPanelProps {
  post: FriendPost | null;
  extras: FriendPostExtra[];
  options: FriendPostOption[];
  chosenOption: FriendPostOption | null;
  npcReply: string | null;
  awaitingReply: boolean;
  onPickOption: (option: FriendPostOption) => void;
  onReset: () => void;
}

export default function PostPanel({
  post,
  extras,
  options,
  chosenOption,
  npcReply,
  awaitingReply,
  onPickOption,
  onReset,
}: PostPanelProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [npcReply, awaitingReply, options]);

  if (!post) {
    return (
      <div
        className='flex flex-1 flex-col items-center justify-center gap-3 bg-white'
        style={{ color: '#7a7a9a' }}
      >
        <span className='text-5xl opacity-50'>💌</span>
        <p className='text-sm'>Select a post to view</p>
      </div>
    );
  }

  const isHeroinePost = post.character_id === 0;
  const charInfo = getFriendCharInfo(post.character_id);

  // Who speaks the main post bubble
  const speakerInfo =
    post.post_speaker_id != null
      ? getFriendCharInfo(post.post_speaker_id, post.post_speaker_name)
      : charInfo;

  const hasBgImage =
    KNOWN_AVATAR_KEYS.has(charInfo.avatarKey) && charInfo.avatarKey !== 'mc';

  return (
    <div className='height-full flex grow justify-center bg-white'>
      <div className='border-mc-border flex max-w-162.5 min-w-0 flex-1 grow flex-col border'>
        {/* Header */}
        <div className='from-message-blue via-message-purple to-message-pink flex shrink-0 items-center gap-3 border-b bg-linear-to-r px-5 py-3.5'>
          <div className='flex-1 text-center text-xl font-semibold text-[#766a7b]'>
            {post.title}
          </div>
          {chosenOption && (
            <button
              onClick={onReset}
              className='bg-message-purple hover:bg-highlight-purple/50 cursor-pointer rounded border px-3.5 py-1.5 text-xs text-mauve-700 transition-colors'
            >
              ↺ Reset
            </button>
          )}
        </div>

        {/* Messages area */}
        <div className='height-fill flex flex-1 flex-col overflow-y-auto'>
          <div
            className={`flex grow flex-col gap-5 p-5 ${hasBgImage ? 'bg-cover bg-center bg-blend-lighten' : ''}`}
            style={
              hasBgImage
                ? {
                    backgroundImage: `url(/chat/bg/${charInfo.avatarKey}.jpg)`,
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  }
                : { backgroundColor: `${charInfo.color}18` }
            }
          >
            {/* Main post */}
            <MainMessage
              text={post.post}
              sender={isHeroinePost ? 'player' : 'npc'}
              charInfo={speakerInfo}
            />

            <div className='ml-15 bg-taupe-200/70 px-4 py-2 empty:hidden'>
              {/* Extras shown before options, in order */}
              {extras.map((ex) => {
                const exInfo = getFriendCharInfo(
                  ex.speaker_id ?? -1,
                  ex.speaker_name
                );
                return (
                  <Response key={ex.id} text={ex.text} charInfo={exInfo} />
                );
              })}

              {/* Heroine post: show all NPC replies directly (no interaction) */}
              {isHeroinePost &&
                options.map((opt) => (
                  <Response
                    key={opt.id}
                    text={opt.npc_reply}
                    charInfo={{
                      name: 'NPC',
                      emoji: '💌',
                      color: '#37474f',
                      avatarKey: '',
                    }}
                  />
                ))}

              {/* Chosen reply + NPC response */}
              {chosenOption && (
                <>
                  <Response
                    text={chosenOption.player_text}
                    charInfo={MC_INFO}
                  />
                  {npcReply && (
                    <Response text={npcReply} charInfo={speakerInfo} />
                  )}
                </>
              )}
            </div>

            <div ref={bottomRef} />
          </div>
        </div>

        {/* Response options (normal posts, before any choice) */}
        {!isHeroinePost && !chosenOption && options.length > 0 && (
          <div className='flex flex-col gap-2 border-t border-mauve-500 bg-gray-100 px-5 pt-3 pb-4'>
            <div className='text-xs tracking-widest text-mauve-700 uppercase'>
              How do you reply?
            </div>
            <div className='flex flex-col gap-1.5'>
              {options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => onPickOption(opt)}
                  className='bg-mauve-00 cursor-pointer rounded-lg border px-3.5 py-2.5 text-left text-sm text-mauve-700 transition-colors hover:bg-mauve-200'
                >
                  {opt.player_text}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* After NPC replies, offer reset */}
        {!isHeroinePost && npcReply && !awaitingReply && (
          <div className='from-message-blue to-message-pink border-t border-white bg-linear-90 px-5 py-4 text-center text-xs text-mauve-700'>
            Try a different reply?{' '}
            <button onClick={onReset} className='cursor-pointer underline'>
              Reset
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
