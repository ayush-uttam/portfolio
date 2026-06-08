import { useEffect, useState, useRef } from "react";

interface ClickEffect {
  id: number;
  x: number;
  y: number;
}

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [effects, setEffects] = useState<ClickEffect[]>([]);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const onClick = (e: MouseEvent) => {
      const newEffect = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
      };
      setEffects((prev) => [...prev, newEffect]);

      // Auto-remove line effect after animations complete
      setTimeout(() => {
        setEffects((prev) => prev.filter((eff) => eff.id !== newEffect.id));
      }, 600);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("click", onClick, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <>
      {/* Core Custom Hardware-Accelerated Crosshair Tracker */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      >
        <div className="relative">
          {/* Pristine Black crosshair design */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            strokeWidth="1.5"
            className={`transition-all duration-150 ${
              isClicking ? "scale-75 rotate-45 stroke-rose-500" : "scale-100 rotate-0"
            }`}
          >
            <line x1="12" y1="2" x2="12" y2="22" />
            <line x1="2" y1="12" x2="22" y2="12" />
          </svg>
        </div>
      </div>

      {/* Crosshair 2-Axis Laser shooting animation particles */}
      {effects.map((effect) => (
        <div
          key={effect.id}
          className="fixed top-0 left-0 pointer-events-none z-[9998]"
          style={{ transform: `translate3d(${effect.x}px, ${effect.y}px, 0)` }}
        >
          {/* Horizontal shooting laser line */}
          <div className="absolute top-0 left-0 -translate-y-1/2 -translate-x-1/2 flex items-center justify-center">
            <div className="absolute h-[1.5px] bg-black animate-shoot-left origin-right" />
            <div className="absolute h-[1.5px] bg-black animate-shoot-right origin-left" />
          </div>

          {/* Vertical shooting laser line */}
          <div className="absolute top-0 left-0 -translate-y-1/2 -translate-x-1/2 flex items-center justify-center">
            <div className="absolute w-[1.5px] bg-black animate-shoot-top origin-bottom" />
            <div className="absolute w-[1.5px] bg-black animate-shoot-bottom origin-top" />
          </div>
        </div>
      ))}
    </>
  );
}
