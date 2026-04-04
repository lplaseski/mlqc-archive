'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Conversation, MessageData, DisplayMessage } from './types';
import { getCharInfo, CHARS } from './charInfo';
import { ConversationPlayer } from './conversationPlayer';
import Sidebar from './Sidebar';
import ChatPanel from './ChatPanel';

interface Props {
  conversations: Conversation[];
}

export default function ChatPageClient({ conversations }: Props) {
  const [activeConv, setActiveConv] = useState<Conversation | null>(null);
  const [search, setSearch] = useState('');
  const [currentFilter, setCurrentFilter] = useState('all');
  const [showHidden, setShowHidden] = useState(false);
  const [messages, setMessages] = useState<DisplayMessage[]>([]);
  const [choices, setChoices] = useState<DisplayMessage[]>([]);
  const [isDone, setIsDone] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);

  const playerRef = useRef<ConversationPlayer | null>(null);
  const autoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoPlayRef = useRef(false);

  useEffect(() => {
    return () => {
      if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    };
  }, []);

  const filteredConvs = useMemo(() => {
    return conversations.filter((conv) => {
      if (currentFilter !== 'all') {
        const isOther = currentFilter === 'other';
        if (isOther && CHARS[conv.character_id]) return false;
        if (!isOther && String(conv.character_id) !== currentFilter) return false;
      }
      if (conv.hidden && !showHidden) return false;
      if (search) {
        const q = search.toLowerCase();
        const ch = getCharInfo(conv.character_id);
        if (
          !conv.name.toLowerCase().includes(q) &&
          !String(conv.id).includes(q) &&
          !ch.name.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [conversations, currentFilter, showHidden, search]);

  function stopAutoPlay() {
    autoPlayRef.current = false;
    setAutoPlay(false);
    if (autoTimerRef.current) {
      clearTimeout(autoTimerRef.current);
      autoTimerRef.current = null;
    }
  }

  function doAutoStep() {
    if (!autoPlayRef.current) return;
    const player = playerRef.current;
    if (!player || player.done) {
      stopAutoPlay();
      return;
    }
    const currentChoices = player.getChoices(player.round);
    if (!currentChoices.length) {
      stopAutoPlay();
      return;
    }
    const { messages: newMsgs, choices: newChoices } = player.pick(currentChoices[0]);
    setMessages((prev) => [...prev, ...newMsgs]);
    setChoices(newChoices);
    setIsDone(player.done);

    if (autoPlayRef.current && !player.done) {
      autoTimerRef.current = setTimeout(doAutoStep, 1200);
    } else {
      stopAutoPlay();
    }
  }

  async function openConversation(convId: number) {
    stopAutoPlay();
    const conv = conversations.find((c) => c.id === convId);
    if (!conv) return;

    const { data: rows } = await supabase
      .from('messages')
      .select('id, content, title, send_time')
      .eq('conversation_id', convId);

    const msgMap: Record<string, MessageData> = {};
    for (const row of rows ?? []) {
      msgMap[String(row.id)] = {
        content: row.content ?? undefined,
        title: row.title ?? undefined,
        send_time: row.send_time ?? undefined,
      };
    }

    setActiveConv(conv);
    const player = new ConversationPlayer(conv, msgMap);
    playerRef.current = player;

    const { messages: msgs, choices: ch } = player.start();
    setMessages(msgs);
    setChoices(ch);
    setIsDone(false);
  }

  function handlePickChoice(choice: DisplayMessage) {
    const player = playerRef.current;
    if (!player) return;
    stopAutoPlay();
    const { messages: newMsgs, choices: newChoices } = player.pick(choice);
    setMessages((prev) => [...prev, ...newMsgs]);
    setChoices(newChoices);
    setIsDone(player.done);
  }

  function handleRestart() {
    if (activeConv) openConversation(activeConv.id);
  }

  function handleToggleAutoPlay() {
    if (autoPlayRef.current) {
      stopAutoPlay();
    } else {
      autoPlayRef.current = true;
      setAutoPlay(true);
      autoTimerRef.current = setTimeout(doAutoStep, 1000);
    }
  }

  const activeCharInfo = activeConv ? getCharInfo(activeConv.character_id) : null;

  return (
    <div
      className='flex overflow-hidden'
      style={{
        height: 'calc(100vh - 48px)',
        background: '#0f0f13',
        color: '#e8e8f0',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        fontSize: 14,
      }}
    >
      <Sidebar
        conversations={filteredConvs}
        activeConvId={activeConv?.id ?? null}
        search={search}
        currentFilter={currentFilter}
        showHidden={showHidden}
        onSelectConv={openConversation}
        onSearchChange={setSearch}
        onFilterChange={setCurrentFilter}
        onToggleHidden={() => setShowHidden((p) => !p)}
      />
      <ChatPanel
        conv={activeConv}
        charInfo={activeCharInfo}
        messages={messages}
        choices={choices}
        isDone={isDone}
        autoPlay={autoPlay}
        onPickChoice={handlePickChoice}
        onRestart={handleRestart}
        onToggleAutoPlay={handleToggleAutoPlay}
      />
    </div>
  );
}
