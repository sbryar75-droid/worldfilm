"use client";
import { useEffect, useRef, useState } from "react";
import { saveProgress } from "@/app/watch/actions";

// پلەیەر: HLS و MP4، ژێرنووس، کوالیتی، و پاشەکەوتکردنی شوێنی سەیرکردن
export default function VideoPlayer({ src, subtitle, poster, movieId, episodeId = 0, startAt = 0, canSave = false }) {
  const ref = useRef(null);
  const hlsRef = useRef(null);
  const lastSave = useRef(0);
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    const video = ref.current;
    if (!video || !src) return;
    let cancelled = false;
    setLevels([]);
    if (src.includes(".m3u8") && !video.canPlayType("application/vnd.apple.mpegurl")) {
      import("hls.js").then(({ default: Hls }) => {
        if (cancelled || !Hls.isSupported()) return;
        const hls = new Hls();
        hlsRef.current = hls;
        hls.loadSource(src);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () =>
          setLevels(hls.levels.map((l) => (l.height ? `${l.height}p` : `${Math.round(l.bitrate / 1000)}kbps`)))
        );
      });
    } else {
      video.src = src;
    }
    return () => {
      cancelled = true;
      hlsRef.current?.destroy();
      hlsRef.current = null;
    };
  }, [src]);

  const save = () => {
    const v = ref.current;
    if (!canSave || !v || !v.duration || v.currentTime < 5) return;
    saveProgress({ movieId, episodeId, position: v.currentTime, duration: v.duration });
  };

  const resume = () => {
    const v = ref.current;
    if (startAt > 10 && v.duration && startAt < v.duration - 30) v.currentTime = startAt;
  };

  const tick = () => {
    const now = Date.now();
    if (now - lastSave.current > 15000) { lastSave.current = now; save(); }
  };

  return (
    <div>
      <video ref={ref} controls playsInline poster={poster || undefined} crossOrigin={subtitle ? "anonymous" : undefined}
        onLoadedMetadata={resume} onTimeUpdate={tick} onPause={save} onEnded={save}
        className="aspect-video w-full rounded-xl bg-black">
        {subtitle && <track kind="subtitles" src={subtitle} srcLang="ckb" label="کوردی" default />}
      </video>
      {levels.length > 1 && (
        <label className="mt-2 flex items-center gap-2 text-sm text-muted">
          کوالیتی:
          <select onChange={(e) => hlsRef.current && (hlsRef.current.currentLevel = Number(e.target.value))}
            className="rounded-md border border-line bg-surface px-2 py-1 text-white">
            <option value={-1}>ئۆتۆماتیک</option>
            {levels.map((l, i) => <option key={i} value={i}>{l}</option>).reverse()}
          </select>
        </label>
      )}
    </div>
  );
}
