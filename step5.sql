create table public.favorites (
  user_id uuid not null references auth.users(id) on delete cascade,
  movie_id bigint not null references public.movies(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (user_id, movie_id)
);

create table public.watch_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  movie_id bigint not null references public.movies(id) on delete cascade,
  episode_id bigint not null default 0,
  position_seconds int not null default 0,
  duration_seconds int,
  updated_at timestamptz default now(),
  primary key (user_id, movie_id, episode_id)
);

alter table public.favorites enable row level security;
alter table public.watch_progress enable row level security;

-- هەر بەکارهێنەرێک تەنها داتای خۆی دەبینێت و دەگۆڕێت
create policy "own favorites" on public.favorites for all to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "own progress" on public.watch_progress for all to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
