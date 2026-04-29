import { useEffect, useRef } from 'react';

const CHARS = 'ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜ0123456789ABCDEF';

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const fontSize = 16;
    let cells: { y: number; speed: number; dir: 1 | -1 }[] = [];
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      const cols = Math.max(20, Math.floor(width / fontSize));
      cells = new Array(cols).fill(0).map((_, i) => {
        const dir: 1 | -1 = i % 2 === 0 ? 1 : -1;
        return {
          y: dir === 1 ? Math.random() * height : height - Math.random() * height,
          speed: 0.32 + Math.random() * 0.55,
          dir,
        };
      });
      ctx.fillStyle = 'rgba(2, 2, 2, 1)';
      ctx.fillRect(0, 0, width, height);
    };
    resize();

    let raf = 0;
    let last = 0;
    const targetMs = 1000 / 28;

    const tick = (ts: number) => {
      raf = requestAnimationFrame(tick);
      if (ts - last < targetMs) return;
      last = ts;

      ctx.fillStyle = 'rgba(2, 2, 2, 0.08)';
      ctx.fillRect(0, 0, width, height);
      ctx.font = `${fontSize}px IBM Plex Mono, Courier New, monospace`;
      ctx.textBaseline = 'top';

      for (let i = 0; i < cells.length; i++) {
        const c = cells[i];
        const x = i * fontSize;
        const ch = CHARS.charAt(Math.floor(Math.random() * CHARS.length));

        ctx.fillStyle = '#d6ffd9';
        ctx.fillText(ch, x, c.y);

        const trailCh = CHARS.charAt(Math.floor(Math.random() * CHARS.length));
        ctx.fillStyle = '#00ff41';
        ctx.fillText(trailCh, x, c.y - c.dir * fontSize);

        c.y += c.dir * fontSize * c.speed;
        if (c.dir === 1 && c.y > height + 60) c.y = -40 - Math.random() * 240;
        if (c.dir === -1 && c.y < -60) c.y = height + 40 + Math.random() * 240;
      }
    };

    raf = requestAnimationFrame(tick);
    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, 120);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.clearTimeout(resizeTimer);
    };
  }, []);

  return <canvas ref={canvasRef} className="matrix-rain" aria-hidden="true" />;
}
