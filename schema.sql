create table public.movies (
  id bigint generated always as identity primary key,
  title text not null,
  type text not null check (type in ('فیلم', 'زنجیرە')),
  year int, genre text, rating numeric(3,1), duration text, overview text,
  hue int default 200, poster_url text,
  created_at timestamptz default now()
);

alter table public.movies enable row level security;

create policy "public read" on public.movies for select using (true);

create policy "admin write" on public.movies for all to authenticated
  using ((auth.jwt() ->> 'email') = 'sbryar75@gmail.com')
  with check ((auth.jwt() ->> 'email') = 'sbryar75@gmail.com');

insert into public.movies (title, type, year, genre, rating, duration, hue, overview) values
('شەوی کۆتایی','فیلم',2025,'ئەکشن',8.4,'114 خولەک',28,'پاش ساڵانێک دوورکەوتنەوە، ئەفسەرێکی خانەنشین دەبێت لە یەک شەودا شارەکەی ڕزگار بکات.'),
('ڕێگای شاخ','زنجیرە',2024,'دراما',8.9,'٣ وەرز',200,'چیرۆکی سێ خێزان کە لە گوندێکی سنووری دەژین و هەر یەکەیان نهێنییەکی هەیە.'),
('دەنگی دەریا','فیلم',2023,'دراما',7.8,'102 خولەک',195,'گۆرانیبێژێکی نەخۆش بۆ دوایین جار دەگەڕێتەوە بۆ شارۆچکەی منداڵییەکەی.'),
('چرای ژێرزەوی','زنجیرە',2026,'تۆقێنەر',8.1,'١ وەرز',265,'گروپێک خوێندکار لە ژێرزەمینی زانکۆیەک شتێکی نامۆ دەدۆزنەوە.'),
('قەڵای بەفر','فیلم',2022,'ئەکشن',7.2,'126 خولەک',210,'هێزێکی بچووک دەبێت لە زستانێکی سەخت قەڵایەک بپارێزێت.'),
('کوڕی ئاگر','فیلم',2025,'فانتازیا',7.6,'131 خولەک',12,'کوڕێکی گوندنشین دەزانێت توانای ئاگری هەیە و دەبێت بیشارێتەوە.'),
('بەیانییەکی درەنگ','زنجیرە',2023,'کۆمیدی',7.9,'٢ وەرز',48,'ژیانی ڕۆژانەی کارمەندانی چایخانەیەک لە بازاڕی کۆن.'),
('ئاسمانی سوور','فیلم',2024,'زانستی خەیاڵی',8.0,'119 خولەک',350,'ئاسمان ڕەنگی دەگۆڕێت و تەنها یەک ئامێر دەتوانێت هۆکارەکەی بدۆزێتەوە.');
