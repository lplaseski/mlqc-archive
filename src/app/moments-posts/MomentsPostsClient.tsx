'use client';

import { useState, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import { FriendPost, FriendPostExtra, FriendPostOption } from './types';
import { getFriendCharInfo, EXTENDED } from './charInfo';
import Sidebar from './Sidebar';
import PostPanel from './PostPanel';

interface Props {
  posts: FriendPost[];
}

export default function FriendPostsClient({ posts }: Props) {
  const [activePost, setActivePost] = useState<FriendPost | null>(null);
  const [extras, setExtras] = useState<FriendPostExtra[]>([]);
  const [options, setOptions] = useState<FriendPostOption[]>([]);
  const [chosenOption, setChosenOption] = useState<FriendPostOption | null>(
    null
  );
  const [npcReply, setNpcReply] = useState<string | null>(null);
  const [awaitingReply, setAwaitingReply] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      if (filter === 'other') {
        if (EXTENDED[post.character_id]) return false;
      } else if (filter !== 'all') {
        if (String(post.character_id) !== filter) return false;
      }
      if (search) {
        const q = search.toLowerCase();
        const ch = getFriendCharInfo(post.character_id);
        if (
          !post.title.toLowerCase().includes(q) &&
          !String(post.id).includes(q) &&
          !ch.name.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [posts, filter, search]);

  async function openPost(postId: number) {
    const post = posts.find((p) => p.id === postId);
    if (!post) return;
    setActivePost(post);
    setExtras([]);
    setOptions([]);
    setChosenOption(null);
    setNpcReply(null);
    setAwaitingReply(false);

    const [
      { data: optData, error: optError },
      { data: extData, error: extError },
    ] = await Promise.all([
      supabase
        .from('friend_post_options')
        .select('*')
        .eq('post_id', postId)
        .order('sort_order'),
      supabase
        .from('friend_post_extras')
        .select('*')
        .eq('post_id', postId)
        .order('sort_order'),
    ]);
    if (optError) console.error('options fetch failed:', optError);
    if (extError) console.error('extras fetch failed:', extError);
    setOptions(optData ?? []);
    setExtras(extData ?? []);
  }

  function handlePickOption(option: FriendPostOption) {
    setChosenOption(option);
    setAwaitingReply(true);
    setNpcReply(null);
    setTimeout(() => {
      setNpcReply(option.npc_reply);
      setAwaitingReply(false);
    }, 800);
  }

  function handleReset() {
    setChosenOption(null);
    setNpcReply(null);
    setAwaitingReply(false);
  }

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
        posts={filteredPosts}
        activePostId={activePost?.id ?? null}
        search={search}
        filter={filter}
        onSelectPost={openPost}
        onSearchChange={setSearch}
        onFilterChange={setFilter}
      />
      <PostPanel
        post={activePost}
        extras={extras}
        options={options}
        chosenOption={chosenOption}
        npcReply={npcReply}
        awaitingReply={awaitingReply}
        onPickOption={handlePickOption}
        onReset={handleReset}
      />
    </div>
  );
}
