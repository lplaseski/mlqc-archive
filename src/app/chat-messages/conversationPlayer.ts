import { Conversation, MessageData, DisplayMessage } from './types';

export class ConversationPlayer {
  conv: Conversation;
  messages: Record<string, MessageData>;
  convId: number;
  done: boolean;
  round: number;

  constructor(conv: Conversation, messages: Record<string, MessageData>) {
    this.conv = conv;
    this.messages = messages;
    this.convId = conv.id;
    this.done = false;
    this.round = 0;
  }

  // For type=0 conversations the player always opens with the branch-1 message of round 1
  private forcedFirstId(): number {
    return this.convId * 1000 + 110;
  }

  private msg(suffix: number): DisplayMessage | null {
    const id = this.convId * 1000 + suffix;
    const m = this.messages[String(id)];
    return m ? { id, ...m, sender: 'npc' as const } : null;
  }

  introMsgs(): DisplayMessage[] {
    const out: DisplayMessage[] = [];
    for (let c = 0; c <= 9; c++) {
      const m = this.msg(c);
      if (m) out.push({ ...m, sender: 'npc' });
      else break;
    }
    return out;
  }

  npcReplies(round: number, branch: number): DisplayMessage[] {
    const out: DisplayMessage[] = [];
    for (let c = 1; c <= 9; c++) {
      const m = this.msg(round * 100 + branch * 10 + c);
      if (m) out.push({ ...m, sender: 'npc' });
      else break;
    }
    return out;
  }

  getChoices(round: number): DisplayMessage[] {
    const out: DisplayMessage[] = [];
    for (let b = 1; b <= 9; b++) {
      const m = this.msg(round * 100 + b * 10);
      if (m) out.push({ ...m, sender: 'player', branch: b, round });
    }
    return out;
  }

  start(): { messages: DisplayMessage[]; choices: DisplayMessage[] } {
    if (this.conv.type === 1) {
      // NPC opens first
      const msgs = this.introMsgs();
      this.round = 1;
      return { messages: msgs, choices: this.getChoices(1) };
    } else {
      // Player opens first (forced first message)
      const msgs: DisplayMessage[] = [];
      const forcedId = this.forcedFirstId();
      if (this.messages[String(forcedId)]) {
        const suffix = forcedId - this.convId * 1000;
        const round = Math.floor(suffix / 100);
        const branch = Math.floor((suffix % 100) / 10);
        const m = this.messages[String(forcedId)];
        if (m) {
          msgs.push({ id: forcedId, ...m, sender: 'player' });
          msgs.push(...this.npcReplies(round, branch));
          this.round = round + 1;
        }
      } else {
        this.round = 1;
      }
      return { messages: msgs, choices: this.getChoices(this.round) };
    }
  }

  pick(choice: DisplayMessage): { messages: DisplayMessage[]; choices: DisplayMessage[] } {
    const suffix = choice.id - this.convId * 1000;
    const round = Math.floor(suffix / 100);
    const branch = Math.floor((suffix % 100) / 10);

    const msgs: DisplayMessage[] = [
      { ...choice, sender: 'player' },
      ...this.npcReplies(round, branch),
    ];

    this.round = round + 1;
    const nextChoices = this.getChoices(this.round);
    if (nextChoices.length === 0) this.done = true;

    return { messages: msgs, choices: nextChoices };
  }
}
