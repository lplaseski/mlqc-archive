'use cache';

import { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import ChatPageClient from './ChatPageClient';
import { Conversation } from './types';

export const metadata: Metadata = {
  title: "Chat Messages | Mr Love: Queen's Choice Archive",
  description: "Replay in-game chat conversations from Mr Love: Queen's Choice.",
};

export default async function ChatMessagesPage() {
  const { data, error } = await supabase
    .from('conversations')
    .select('id, name, character_id, type, background, hidden')
    .not('name', 'is', null)
    .order('character_id')
    .order('id');

  if (error) {
    return (
      <div
        className='fixed inset-0 flex items-center justify-center'
        style={{ background: '#0f0f13', color: '#ef5350' }}
      >
        Failed to load conversations: {error.message}
      </div>
    );
  }

  const conversations = (data as Conversation[]) ?? [];

  return <ChatPageClient conversations={conversations} />;
}
