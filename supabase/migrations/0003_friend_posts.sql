-- friend_characters: love-interest characters with their original game IDs
-- kept separate from the existing characters table which uses auto-generated serial IDs
-- emoji / color are display metadata specific to the friend system
create table friend_characters (
  id    integer primary key,
  name  text    not null,
  emoji text,
  color text
);

alter table friend_characters disable row level security;

-- friend_posts: individual friend story posts
-- post_speaker_id / post_speaker_name: who said the post when it isn't the character themselves
-- extra_*: optional follow-up line from a secondary speaker after the player chooses a reply
-- background: scene background ID (1–3)
create table friend_posts (
  id                 integer  primary key,
  title              text     not null,
  character_id       integer  references friend_characters (id),
  post               text     not null,
  post_speaker_id    integer,
  post_speaker_name  text,
  extra_text         text,
  extra_speaker_id   integer,
  extra_speaker_name text,
  background         smallint
);

-- friend_post_options: player-choice options and NPC replies for each friend post
-- sort_order preserves the original sequence from the source data
create table friend_post_options (
  id          serial   primary key,
  post_id     integer  not null references friend_posts (id),
  sort_order  smallint not null,
  player_text text     not null,
  npc_reply   text     not null
);

create index friend_posts_character_id_idx   on friend_posts (character_id);
create index friend_post_options_post_id_idx on friend_post_options (post_id);

alter table friend_posts        disable row level security;
alter table friend_post_options disable row level security;
