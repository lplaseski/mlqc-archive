-- Replace the single flattened extra columns with a proper one-to-many extras table
alter table friend_posts
  drop column extra_text,
  drop column extra_speaker_id,
  drop column extra_speaker_name;

-- friend_post_extras: ordered extra messages shown before the response options
-- Each extra has its own game ID, speaker, and sort position within the post
create table friend_post_extras (
  id           integer  primary key,
  post_id      integer  not null references friend_posts (id),
  sort_order   smallint not null,
  text         text     not null,
  speaker_id   integer,
  speaker_name text
);

create index friend_post_extras_post_id_idx on friend_post_extras (post_id);

alter table friend_post_extras disable row level security;
