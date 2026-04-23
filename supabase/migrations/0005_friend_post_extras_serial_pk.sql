-- Extra IDs from the source data are not unique across posts, so switch to a serial PK
drop table friend_post_extras;

create table friend_post_extras (
  id           serial   primary key,
  post_id      integer  not null references friend_posts (id),
  sort_order   smallint not null,
  text         text     not null,
  speaker_id   integer,
  speaker_name text
);

create index friend_post_extras_post_id_idx on friend_post_extras (post_id);

alter table friend_post_extras disable row level security;
