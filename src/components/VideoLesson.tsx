import { useEffect, useRef } from 'react';

interface Lesson {
  id: number;
  title: string;
  playerId: string;
  scriptSrc: string;
  thumbnail?: string;
}

interface VideoLessonProps {
  lesson: Lesson;
}

export default function VideoLesson({ lesson }: VideoLessonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    container.innerHTML = '';

    if (lesson.thumbnail) {
      const videoDiv = document.createElement('div');
      videoDiv.id = lesson.playerId;
      videoDiv.style.cssText = 'position: relative; width: 100%; padding: 217.96296296296296% 0 0;';

      const img = document.createElement('img');
      img.id = `thumb_${lesson.playerId.replace('vid_', '')}`;
      img.src = lesson.thumbnail;
      img.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; display: block;';
      img.alt = 'thumbnail';

      const backdrop = document.createElement('div');
      backdrop.id = `backdrop_${lesson.playerId.replace('vid_', '')}`;
      backdrop.style.cssText = '-webkit-backdrop-filter: blur(5px); backdrop-filter: blur(5px); position: absolute; top: 0; height: 100%; width: 100%;';

      videoDiv.appendChild(img);
      videoDiv.appendChild(backdrop);
      container.appendChild(videoDiv);
    } else {
      const player = document.createElement('vturb-smartplayer');
      player.id = lesson.playerId;
      player.style.cssText = 'display: block; margin: 0 auto; width: 100%;';
      container.appendChild(player);
    }

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = lesson.scriptSrc;
    script.async = true;
    script.id = `scr_${lesson.playerId}`;

    scriptRef.current = script;
    document.head.appendChild(script);

    return () => {
      if (scriptRef.current && document.head.contains(scriptRef.current)) {
        document.head.removeChild(scriptRef.current);
      }
    };
  }, [lesson]);

  return (
    <div className="relative w-full bg-black rounded-lg overflow-hidden" style={{ minHeight: '400px' }}>
      <div ref={containerRef} className="w-full" />
    </div>
  );
}
