'use cache';

import { Metadata } from 'next';
import { supabase, fetchAll } from '@/lib/supabase';
import MomentsPostsClient from './MomentsPostsClient';
import { FriendPost } from './types';

export const metadata: Metadata = {
  title: "Moments Posts | Mr Love: Queen's Choice Archive",
  description: "Browse moments story posts from Mr Love: Queen's Choice.",
};

export default async function MomentsPostsPage() {
  try {
    const posts = await fetchAll<FriendPost>((from, to) =>
      supabase
        .from('friend_posts')
        .select('id, title, character_id, post, post_speaker_id, post_speaker_name, background')
        .order('character_id')
        .order('id')
        .range(from, to)
    );
    return <MomentsPostsClient posts={posts} />;
  } catch (error) {
    return (
      <div
        className='fixed inset-0 flex items-center justify-center'
        style={{ background: '#0f0f13', color: '#ef5350' }}
      >
        Failed to load posts: {String(error)}
      </div>
    );
  }
}
