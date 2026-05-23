import { useEffect, useRef } from 'react';

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      time += 0.005;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const orb1X = canvas.width * (0.5 + 0.3 * Math.sin(time * 0.7));
      const orb1Y = canvas.height * (0.3 + 0.2 * Math.sin(time * 0.5 + 1));
      const orb1Radius = Math.min(canvas.width, canvas.height) * 0.25;

      const gradient1 = ctx.createRadialGradient(orb1X, orb1Y, 0, orb1X, orb1Y, orb1Radius);
      gradient1.addColorStop(0, 'rgba(168, 85, 247, 0.15)');
      gradient1.addColorStop(0.5, 'rgba(168, 85, 247, 0.05)');
      gradient1.addColorStop(1, 'rgba(168, 85, 247, 0)');
      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const orb2X = canvas.width * (0.5 + 0.35 * Math.sin(time * 0.6 + 2));
      const orb2Y = canvas.height * (0.7 + 0.2 * Math.sin(time * 0.8 + 3));
      const orb2Radius = Math.min(canvas.width, canvas.height) * 0.2;

      const gradient2 = ctx.createRadialGradient(orb2X, orb2Y, 0, orb2X, orb2Y, orb2Radius);
      gradient2.addColorStop(0, 'rgba(34, 211, 238, 0.12)');
      gradient2.addColorStop(0.5, 'rgba(34, 211, 238, 0.04)');
      gradient2.addColorStop(1, 'rgba(34, 211, 238, 0)');
      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const orb3X = canvas.width * (0.2 + 0.2 * Math.sin(time * 0.4 + 4));
      const orb3Y = canvas.height * (0.5 + 0.3 * Math.sin(time * 0.3 + 5));
      const orb3Radius = Math.min(canvas.width, canvas.height) * 0.15;

      const gradient3 = ctx.createRadialGradient(orb3X, orb3Y, 0, orb3X, orb3Y, orb3Radius);
      gradient3.addColorStop(0, 'rgba(168, 85, 247, 0.1)');
      gradient3.addColorStop(0.5, 'rgba(34, 211, 238, 0.03)');
      gradient3.addColorStop(1, 'rgba(168, 85, 247, 0)');
      ctx.fillStyle = gradient3;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
}
