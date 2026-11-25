-- لە Supabase > SQL Editor جێبەجێی بکە. پێش ئەوە YOUR_EMAIL بگۆڕە (٢ جێگا)
alter table public.movies add column video_url text, add column subtitle_url text;

create table public.episodes (
  id bigint generated always as identity primary key,
  movie_id bigint not null references public.movies(id) on delete cascade,
  season int not null default 1,
  number int not null default 1,
  title text, video_url text, subtitle_url text,
  created_at timestamptz default now(),
  unique (movie_id, season, number)
);

alter table public.episodes enable row level security;
create policy "public read" on public.episodes for select using (true);
create policy "admin write" on public.episodes for all to authenticated
  using ((auth.jwt() ->> 'email') = 'sbryar75@gmail.com')
  with check ((auth.jwt() ->> 'email') = 'sbryar75@gmail.com');

-- بۆ تاقیکردنەوە: ڤیدیۆی نموونەی ئازاد بۆ فیلمی ژمارە ١. دواتر بە ڤیدیۆی خۆت بیگۆڕە
update public.movies set video_url = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8' where id = 1;
