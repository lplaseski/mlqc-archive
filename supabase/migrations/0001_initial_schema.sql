-- Characters table already exists; insert any names not yet present.
-- The seed script will resolve character_id values by name lookup.
insert into characters (name)
select distinct character_name
from (values
  ('Victor'), ('Lucien'), ('Kiro'), ('Gavin'), ('Shaw'),
  ('Contact 7'), ('Contact 31'), ('Contact 33'), ('Contact 34'),
  ('Contact 45'), ('Contact 985'), ('Contact 986'), ('Contact 987'),
  ('Contact 988'), ('Contact 989'), ('Contact 990'), ('Contact 991'),
  ('Contact 992'), ('Contact 993'), ('Contact 994'), ('Contact 995'),
  ('Contact 996'), ('Contact 997'), ('Contact 998'), ('Contact 999')
) as v(character_name)
where not exists (select 1 from characters c where c.name = character_name);

-- Conversations (phone call / chat threads)
-- type: 0 = no player choice, 1 = has player choice options
-- background: 1-5 background scene ID
create table conversations (
  id           integer primary key,
  name         text,
  character_id integer references characters (id),
  type         smallint not null default 0,
  background   smallint,
  hidden       boolean  not null default false
);

-- Messages (individual chat bubbles / events within a conversation)
-- msg_type: null = plain text, 1 = image/sticker, 3 = phone call, 4 = gift
-- title: the label shown on a player-choice button (null for character messages)
-- send_data: float 0-1 indicating sender; 0 = character, 1 = player (null = character)
-- send_data_typ: 2 = regular sent message style
-- msg_condition: 1 = victory outcome, 2 = failed outcome, 3 = draw outcome
-- reward: raw comma-separated reward string e.g. "120001,101,60"
create table messages (
  id                  bigint   primary key,
  conversation_id     integer  references conversations (id),
  content             text,
  title               text,
  text_time           integer,  -- display delay in milliseconds
  msg_type            smallint,
  msg_type_param      text,
  emoji               text,
  reward              text,
  send_data           real,
  send_time           text,
  send_data_typ       smallint,
  special_ahead_time  real,
  msg_condition       smallint
);

-- Indexes for common query patterns
create index messages_conversation_id_idx on messages (conversation_id);
create index conversations_character_id_idx on conversations (character_id);

-- This is read-only game data with no per-user rows, so RLS is not needed
alter table characters    disable row level security;
alter table conversations disable row level security;
alter table messages      disable row level security;
