export interface Conversation {
  id: number;
  name: string;
  character_id: number;
  type: number; // 1 = interactive (NPC opens), 0 = linear (player opens)
  background: number;
  hidden: boolean;
}

export interface MessageData {
  content?: string;
  title?: string;
  send_time?: string;
}

export interface DisplayMessage extends MessageData {
  id: number;
  sender: 'npc' | 'player';
  branch?: number;
  round?: number;
}

export interface CharInfo {
  name: string;
  emoji: string;
  initial: string;
  bg: string;
  bubble: string;
}
