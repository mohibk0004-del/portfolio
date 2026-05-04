import { useCallback, useEffect, useMemo, useState } from 'react';

type Point = { x: number; y: number };

const GRID_SIZE = 16;
const TICK_MS = 120;

const INITIAL_SNAKE: Point[] = [
  { x: 8, y: 8 },
  { x: 7, y: 8 },
  { x: 6, y: 8 },
];

const randomFood = (snake: Point[]) => {
  const occupied = new Set(snake.map((segment) => `${segment.x},${segment.y}`));
  const freeCells: Point[] = [];

  for (let y = 0; y < GRID_SIZE; y += 1) {
    for (let x = 0; x < GRID_SIZE; x += 1) {
      const key = `${x},${y}`;
      if (!occupied.has(key)) freeCells.push({ x, y });
    }
  }

  if (freeCells.length === 0) return { x: 0, y: 0 };
  return freeCells[Math.floor(Math.random() * freeCells.length)];
};

export function ValentineSnakeGame() {
  const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE);
  const [direction, setDirection] = useState<Point>({ x: 1, y: 0 });
  const [food, setFood] = useState<Point>(() => randomFood(INITIAL_SNAKE));
  const [score, setScore] = useState(0);
  const [running, setRunning] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  const resetGame = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setDirection({ x: 1, y: 0 });
    setFood(randomFood(INITIAL_SNAKE));
    setScore(0);
    setGameOver(false);
    setRunning(true);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      let next: Point | null = null;

      if (key === 'arrowup' || key === 'w') next = { x: 0, y: -1 };
      if (key === 'arrowdown' || key === 's') next = { x: 0, y: 1 };
      if (key === 'arrowleft' || key === 'a') next = { x: -1, y: 0 };
      if (key === 'arrowright' || key === 'd') next = { x: 1, y: 0 };

      if (key === ' ' && !gameOver) {
        event.preventDefault();
        setRunning((value) => !value);
        return;
      }

      if (!next) return;

      event.preventDefault();
      setDirection((current) => {
        // Prevent immediate 180 turns to keep movement valid.
        if (current.x + next.x === 0 && current.y + next.y === 0) {
          return current;
        }
        return next;
      });
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [gameOver]);

  useEffect(() => {
    if (!running || gameOver) return;

    const interval = window.setInterval(() => {
      setSnake((current) => {
        const head = current[0];
        const nextHead = { x: head.x + direction.x, y: head.y + direction.y };

        const hitsWall =
          nextHead.x < 0 ||
          nextHead.y < 0 ||
          nextHead.x >= GRID_SIZE ||
          nextHead.y >= GRID_SIZE;

        const hitsSelf = current.some(
          (segment) => segment.x === nextHead.x && segment.y === nextHead.y
        );

        if (hitsWall || hitsSelf) {
          setGameOver(true);
          setRunning(false);
          return current;
        }

        const ateFood = nextHead.x === food.x && nextHead.y === food.y;
        const nextSnake = ateFood
          ? [nextHead, ...current]
          : [nextHead, ...current.slice(0, -1)];

        if (ateFood) {
          setScore((value) => value + 1);
          setFood(randomFood(nextSnake));
        }

        return nextSnake;
      });
    }, TICK_MS);

    return () => window.clearInterval(interval);
  }, [direction, food, gameOver, running]);

  const cellType = useMemo(() => {
    const map = new Map<string, 'head' | 'body' | 'food'>();

    snake.forEach((segment, index) => {
      map.set(`${segment.x},${segment.y}`, index === 0 ? 'head' : 'body');
    });

    map.set(`${food.x},${food.y}`, 'food');
    return map;
  }, [food.x, food.y, snake]);

  return (
    <section className="valentine-snake" aria-label="Valentine snake mini game">
      <header className="valentine-snake__header">
        <p className="valentine-snake__eyebrow">AMNA MODE MINI GAME</p>
        <h3 className="valentine-snake__title">Valentine Snake</h3>
      </header>

      <div className="valentine-snake__hud">
        <span>Score: {score}</span>
        <span>{gameOver ? 'Game Over' : running ? 'Running' : 'Paused'}</span>
        <button type="button" className="valentine-snake__btn" onClick={resetGame}>
          Restart
        </button>
      </div>

      <div
        className="valentine-snake__board"
        style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}
        role="application"
        aria-label="Use arrow keys or WASD to move. Press space to pause."
      >
        {Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, index) => {
          const x = index % GRID_SIZE;
          const y = Math.floor(index / GRID_SIZE);
          const key = `${x},${y}`;
          const type = cellType.get(key);

          return (
            <div
              key={key}
              className={`valentine-snake__cell${type ? ` valentine-snake__cell--${type}` : ''}`}
              aria-hidden="true"
            />
          );
        })}
      </div>

      <p className="valentine-snake__hint">Use arrow keys or WASD. Space pauses.</p>
    </section>
  );
}
