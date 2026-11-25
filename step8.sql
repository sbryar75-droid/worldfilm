-- ئەپلۆدکردنی ژێرنووس. لە SQL Editor جێبەجێی بکە. پێش ئەوە YOUR_EMAIL بگۆڕە (٤ جێگا)
-- دەکرێت چەند جارێک جێبەجێ بکرێت بەبێ هەڵە
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('subtitles', 'subtitles', true, 2097152, array['text/vtt'])
on conflict (id) do update set public = true, file_size_limit = 2097152, allowed_mime_types = array['text/vtt'];

drop policy if exists "admin select subtitles" on storage.objects;
drop policy if exists "admin insert subtitles" on storage.objects;
drop policy if exists "admin update subtitles" on storage.objects;
drop policy if exists "admin delete subtitles" on storage.objects;

create policy "admin select subtitles" on storage.objects for select to authenticated
  using (bucket_id = 'subtitles' and (auth.jwt() ->> 'email') = 'sbryar75@gmail.com');
create policy "admin insert subtitles" on storage.objects for insert to authenticated
  with check (bucket_id = 'subtitles' and (auth.jwt() ->> 'email') = 'sbryar75@gmail.com');
create policy "admin update subtitles" on storage.objects for update to authenticated
  using (bucket_id = 'subtitles' and (auth.jwt() ->> 'email') = 'sbryar75@gmail.com')
  with check (bucket_id = 'subtitles' and (auth.jwt() ->> 'email') = 'sbryar75@gmail.com');
create policy "admin delete subtitles" on storage.objects for delete to authenticated
  using (bucket_id = 'subtitles' and (auth.jwt() ->> 'email') = 'sbryar75@gmail.com');
