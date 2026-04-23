export interface FriendPost {
  id: number;
  title: string;
  character_id: number;
  post: string;
  post_speaker_id: number | null;
  post_speaker_name: string | null;
  background: number;
}

export interface FriendPostExtra {
  id: number;
  post_id: number;
  sort_order: number;
  text: string;
  speaker_id: number | null;
  speaker_name: string | null;
}

export interface FriendPostOption {
  id: number;
  post_id: number;
  sort_order: number;
  player_text: string;
  npc_reply: string;
}

export interface FriendCharInfo {
  name: string;
  emoji: string;
  color: string;
  avatarKey: string;
}
