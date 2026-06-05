"use client";

import { useEffect, useRef, useCallback } from "react";

const GRID = 19;

interface Point {
  x: number;
  y: number;
}

interface SnakeGameProps {
  onClose: () => void;
}

export default function SnakeGame({ onClose }: SnakeGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const stateRef = useRef({
    snake: [{ x: 7, y: 7 }, { x: 6, y: 7 }, { x: 5, y: 7 }] as Point[],
    dir: { x: 1, y: 0 } as Point,
    food: { x: 10, y: 10 } as Point,
    score: 0,
    running: true,
    started: false,
    loop: null as ReturnType<typeof setInterval> | null,
  });
  const scoreRef = useRef<HTMLParagraphElement>(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const SZ = canvas.width / GRID;
    const { snake, food } = stateRef.current;

    ctx.fillStyle = "#161616";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#4a7c59";
    ctx.fillRect(food.x * SZ + 1, food.y * SZ + 1, SZ - 2, SZ - 2);

    snake.forEach((s, i) => {
      ctx.fillStyle =
        i === 0 ? "#f0ede6" : `rgba(240,237,230,${Math.max(0.15, 0.9 - i * 0.06)})`;
      ctx.fillRect(s.x * SZ + 1, s.y * SZ + 1, SZ - 2, SZ - 2);
    });
  }, []);

  const placeFood = useCallback(() => {
    const { snake } = stateRef.current;
    let f: Point;
    do {
      f = { x: Math.floor(Math.random() * GRID), y: Math.floor(Math.random() * GRID) };
    } while (snake.some((s) => s.x === f.x && s.y === f.y));
    stateRef.current.food = f;
  }, []);

  const tick = useCallback(() => {
    const s = stateRef.current;
    if (!s.running) return;
    const head = { x: s.snake[0].x + s.dir.x, y: s.snake[0].y + s.dir.y };

    if (
      head.x < 0 || head.x >= GRID ||
      head.y < 0 || head.y >= GRID ||
      s.snake.some((p) => p.x === head.x && p.y === head.y)
    ) {
      clearInterval(s.loop!);
      s.running = false;
      if (scoreRef.current) scoreRef.current.textContent = `Game over! Score: ${s.score}`;
      return;
    }

    s.snake.unshift(head);
    if (head.x === s.food.x && head.y === s.food.y) {
      s.score++;
      placeFood();
      if (scoreRef.current) scoreRef.current.textContent = `Score: ${s.score}`;
    } else {
      s.snake.pop();
    }
    draw();
  }, [draw, placeFood]);

  // Change direction and start game if not started
  const changeDir = useCallback((nd: Point) => {
    const s = stateRef.current;
    if (!s.running) return;
    if (nd.x === -s.dir.x && nd.y === -s.dir.y) return; // can't reverse
    s.dir = nd;
    if (!s.started) {
      s.started = true;
      s.loop = setInterval(tick, 130);
    }
  }, [tick]);

  const init = useCallback(() => {
    const s = stateRef.current;
    s.snake = [{ x: 7, y: 7 }, { x: 6, y: 7 }, { x: 5, y: 7 }];
    s.dir = { x: 1, y: 0 };
    s.score = 0;
    s.running = true;
    s.started = false;
    if (s.loop) clearInterval(s.loop);
    placeFood();
    if (scoreRef.current) scoreRef.current.textContent = "Score: 0 — Swipe or use arrow keys";
    draw();
  }, [draw, placeFood]);

  useEffect(() => {
    init();

    // Keyboard controls
    const handleKey = (e: KeyboardEvent) => {
      const map: Record<string, Point> = {
        ArrowUp: { x: 0, y: -1 }, ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 }, ArrowRight: { x: 1, y: 0 },
      };
      const nd = map[e.key];
      if (nd) { changeDir(nd); e.preventDefault(); }
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
      if (stateRef.current.loop) clearInterval(stateRef.current.loop);
    };
  }, [init, changeDir]);

  // Touch swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
    const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
    touchStartRef.current = null;

    // Minimum swipe distance to register
    if (Math.abs(dx) < 10 && Math.abs(dy) < 10) return;

    if (Math.abs(dx) > Math.abs(dy)) {
      // Horizontal swipe
      changeDir(dx > 0 ? { x: 1, y: 0 } : { x: -1, y: 0 });
    } else {
      // Vertical swipe
      changeDir(dy > 0 ? { x: 0, y: 1 } : { x: 0, y: -1 });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85">
      <div className="bg-[#1e1e1e] rounded-md p-7 text-center">
        <div className="flex justify-between items-center mb-4">
          <span
            className="text-[1.3rem] font-medium"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Snake
          </span>
          <button
            onClick={onClose}
            className="text-[var(--muted)] hover:text-[var(--text)] transition-colors bg-transparent border-none cursor-pointer text-lg"
          >
            ✕
          </button>
        </div>

        <canvas
          ref={canvasRef}
          width={300}
          height={300}
          className="border border-[#333] block touch-none"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        />

        <p ref={scoreRef} className="mt-3 text-[0.78rem]" style={{ color: "var(--muted)" }}>
          Score: 0 — Swipe or use arrow keys
        </p>

        <div className="mt-4 flex flex-col items-center gap-1 md:hidden">
          <button
            onTouchStart={(e) => { e.preventDefault(); changeDir({ x: 0, y: -1 }); }}
            onClick={() => changeDir({ x: 0, y: -1 })}
            className="w-12 h-12 rounded-md text-lg flex items-center justify-center border border-[#444] cursor-pointer hover:brightness-110 active:brightness-125"
            style={{ background: "#2a2a2a", color: "var(--text)" }}
          >↑</button>
          <div className="flex gap-1">
            <button
              onTouchStart={(e) => { e.preventDefault(); changeDir({ x: -1, y: 0 }); }}
              onClick={() => changeDir({ x: -1, y: 0 })}
              className="w-12 h-12 rounded-md text-lg flex items-center justify-center border border-[#444] cursor-pointer hover:brightness-110 active:brightness-125"
              style={{ background: "#2a2a2a", color: "var(--text)" }}
            >←</button>
            <div className="w-12 h-12" />
            <button
              onTouchStart={(e) => { e.preventDefault(); changeDir({ x: 1, y: 0 }); }}
              onClick={() => changeDir({ x: 1, y: 0 })}
              className="w-12 h-12 rounded-md text-lg flex items-center justify-center border border-[#444] cursor-pointer hover:brightness-110 active:brightness-125"
              style={{ background: "#2a2a2a", color: "var(--text)" }}
            >→</button>
          </div>
          <button
            onTouchStart={(e) => { e.preventDefault(); changeDir({ x: 0, y: 1 }); }}
            onClick={() => changeDir({ x: 0, y: 1 })}
            className="w-12 h-12 rounded-md text-lg flex items-center justify-center border border-[#444] cursor-pointer hover:brightness-110 active:brightness-125"
            style={{ background: "#2a2a2a", color: "var(--text)" }}
          >↓</button>
        </div>

        <button
          onClick={init}
          className="mt-3 px-6 py-2 text-[0.78rem] tracking-wider text-white border-none rounded-sm cursor-pointer hover:brightness-110 transition-all"
          style={{ background: "var(--green)" }}
        >
          Restart
        </button>
      </div>
    </div>
  );
}
