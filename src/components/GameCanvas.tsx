import { useEffect, useRef, useCallback } from 'react';
import type { Player, Enemy, Bullet, Particle } from '../types/game';
import { generateId, clamp, checkCollision, randomRange } from '../lib/utils';

interface GameCanvasProps {
  isPaused: boolean;
  level: number;
  onEnemyHit: () => void;
  onPlayerHit: () => void;
  onLevelComplete: () => void;
}

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const PLAYER_WIDTH = 40;
const PLAYER_HEIGHT = 30;
const ENEMY_WIDTH = 35;
const ENEMY_HEIGHT = 25;
const BULLET_WIDTH = 4;
const BULLET_HEIGHT = 12;
const PLAYER_SPEED = 300; // pixels per second
const BULLET_SPEED = 400;
const ENEMY_BASE_SPEED = 30;

export function GameCanvas({ 
  isPaused, 
  level, 
  onEnemyHit, 
  onPlayerHit,
  onLevelComplete 
}: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const lastTimeRef = useRef<number>(performance.now());
  
  const gameStateRef = useRef({
    player: {
      id: 'player',
      x: CANVAS_WIDTH / 2 - PLAYER_WIDTH / 2,
      y: CANVAS_HEIGHT - 60,
      width: PLAYER_WIDTH,
      height: PLAYER_HEIGHT,
      velocity: { x: 0, y: 0 },
      type: 'player' as const,
      lives: 3,
    } as Player,
    enemies: [] as Enemy[],
    bullets: [] as Bullet[],
    particles: [] as Particle[],
    stars: [] as { x: number; y: number; size: number; speed: number }[],
    keys: {} as Record<string, boolean>,
    lastShot: 0,
    enemyDirection: 1,
    enemyDescent: 0,
  });

  // Initialize stars background
  useEffect(() => {
    const stars = [];
    for (let i = 0; i < 100; i++) {
      stars.push({
        x: Math.random() * CANVAS_WIDTH,
        y: Math.random() * CANVAS_HEIGHT,
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 30 + 10,
      });
    }
    gameStateRef.current.stars = stars;
  }, []);

  // Initialize enemies for the level
  useEffect(() => {
    const enemies: Enemy[] = [];
    const rows = 3 + Math.min(level - 1, 3);
    const cols = 8 + Math.min(level - 1, 4);
    const colors = ['#ff4444', '#ff8844', '#ffaa44', '#ff6644', '#ff2244'];
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        enemies.push({
          id: generateId(),
          x: 80 + col * 50,
          y: 50 + row * 40,
          width: ENEMY_WIDTH,
          height: ENEMY_HEIGHT,
          velocity: { x: 0, y: 0 },
          type: 'enemy',
          color: colors[row % colors.length],
          points: (rows - row) * 10,
        });
      }
    }
    
    gameStateRef.current.enemies = enemies;
    gameStateRef.current.enemyDirection = 1;
    gameStateRef.current.enemyDescent = 0;
  }, [level]);

  // Keyboard event handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      gameStateRef.current.keys[e.key] = true;
      if (e.key === ' ' && !isPaused) {
        e.preventDefault();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      gameStateRef.current.keys[e.key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isPaused]);

  const createExplosion = useCallback((x: number, y: number, color: string) => {
    const particles: Particle[] = [];
    for (let i = 0; i < 15; i++) {
      const angle = (Math.PI * 2 * i) / 15;
      const speed = randomRange(50, 150);
      particles.push({
        id: generateId(),
        x: x + ENEMY_WIDTH / 2,
        y: y + ENEMY_HEIGHT / 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0.5,
        maxLife: 0.5,
        color,
        size: randomRange(2, 5),
      });
    }
    gameStateRef.current.particles.push(...particles);
  }, []);

  const shoot = useCallback((owner: 'player' | 'enemy', x: number, y: number) => {
    const now = Date.now();
    if (owner === 'player' && now - gameStateRef.current.lastShot < 250) return;
    
    if (owner === 'player') {
      gameStateRef.current.lastShot = now;
    }

    gameStateRef.current.bullets.push({
      id: generateId(),
      x: x + (owner === 'player' ? PLAYER_WIDTH / 2 - BULLET_WIDTH / 2 : ENEMY_WIDTH / 2 - BULLET_WIDTH / 2),
      y: owner === 'player' ? y : y + ENEMY_HEIGHT,
      width: BULLET_WIDTH,
      height: BULLET_HEIGHT,
      velocity: { x: 0, y: owner === 'player' ? -BULLET_SPEED : BULLET_SPEED * 0.5 },
      type: 'bullet',
      owner,
    });
  }, []);

  const gameLoop = useCallback((timestamp: number) => {
    if (!canvasRef.current) return;
    
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const deltaTime = Math.min((timestamp - lastTimeRef.current) / 1000, 0.1);
    lastTimeRef.current = timestamp;

    const state = gameStateRef.current;

    if (!isPaused) {
      // Update stars
      state.stars.forEach(star => {
        star.y += star.speed * deltaTime;
        if (star.y > CANVAS_HEIGHT) {
          star.y = 0;
          star.x = Math.random() * CANVAS_WIDTH;
        }
      });

      // Handle player movement
      if (state.keys['ArrowLeft'] || state.keys['a'] || state.keys['A']) {
        state.player.velocity.x = -PLAYER_SPEED;
      } else if (state.keys['ArrowRight'] || state.keys['d'] || state.keys['D']) {
        state.player.velocity.x = PLAYER_SPEED;
      } else {
        state.player.velocity.x = 0;
      }

      state.player.x += state.player.velocity.x * deltaTime;
      state.player.x = clamp(state.player.x, 0, CANVAS_WIDTH - PLAYER_WIDTH);

      // Player shooting
      if (state.keys[' '] || state.keys['ArrowUp']) {
        shoot('player', state.player.x, state.player.y);
      }

      // Update bullets
      state.bullets = state.bullets.filter(bullet => {
        bullet.y += bullet.velocity.y * deltaTime;
        return bullet.y > -BULLET_HEIGHT && bullet.y < CANVAS_HEIGHT + BULLET_HEIGHT;
      });

      // Update enemy movement
      const enemySpeed = (ENEMY_BASE_SPEED + level * 10) * state.enemyDirection;
      let shouldDescend = false;

      state.enemies.forEach(enemy => {
        enemy.x += enemySpeed * deltaTime;
        
        if (enemy.x <= 10 || enemy.x >= CANVAS_WIDTH - ENEMY_WIDTH - 10) {
          shouldDescend = true;
        }

        // Enemy shooting (random)
        if (Math.random() < 0.001 * level) {
          shoot('enemy', enemy.x, enemy.y);
        }
      });

      if (shouldDescend && state.enemyDescent <= 0) {
        state.enemyDirection *= -1;
        state.enemyDescent = 20;
      }

      if (state.enemyDescent > 0) {
        state.enemies.forEach(enemy => {
          enemy.y += 30 * deltaTime;
        });
        state.enemyDescent -= 30 * deltaTime;
      }

      // Check bullet-enemy collisions
      for (let i = state.bullets.length - 1; i >= 0; i--) {
        const bullet = state.bullets[i];
        if (bullet.owner !== 'player') continue;

        for (let j = state.enemies.length - 1; j >= 0; j--) {
          const enemy = state.enemies[j];
          if (checkCollision(
            bullet.x, bullet.y, bullet.width, bullet.height,
            enemy.x, enemy.y, enemy.width, enemy.height
          )) {
            createExplosion(enemy.x, enemy.y, enemy.color);
            state.enemies.splice(j, 1);
            state.bullets.splice(i, 1);
            onEnemyHit();
            break;
          }
        }
      }

      // Check bullet-player collisions
      for (let i = state.bullets.length - 1; i >= 0; i--) {
        const bullet = state.bullets[i];
        if (bullet.owner !== 'enemy') continue;

        if (checkCollision(
          bullet.x, bullet.y, bullet.width, bullet.height,
          state.player.x, state.player.y, state.player.width, state.player.height
        )) {
          state.bullets.splice(i, 1);
          createExplosion(state.player.x, state.player.y, '#00ffff');
          onPlayerHit();
        }
      }

      // Check enemy-player collisions
      for (const enemy of state.enemies) {
        if (checkCollision(
          enemy.x, enemy.y, enemy.width, enemy.height,
          state.player.x, state.player.y, state.player.width, state.player.height
        )) {
          onPlayerHit();
          break;
        }
      }

      // Check if all enemies destroyed
      if (state.enemies.length === 0) {
        onLevelComplete();
      }

      // Update particles
      state.particles = state.particles.filter(particle => {
        particle.x += particle.vx * deltaTime;
        particle.y += particle.vy * deltaTime;
        particle.life -= deltaTime;
        particle.vx *= 0.98;
        particle.vy *= 0.98;
        return particle.life > 0;
      });
    }

    // Clear canvas
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw stars
    state.stars.forEach(star => {
      ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + Math.random() * 0.7})`;
      ctx.fillRect(star.x, star.y, star.size, star.size);
    });

    // Draw player
    ctx.fillStyle = '#00ffff';
    ctx.shadowColor = '#00ffff';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.moveTo(state.player.x + PLAYER_WIDTH / 2, state.player.y);
    ctx.lineTo(state.player.x + PLAYER_WIDTH, state.player.y + PLAYER_HEIGHT);
    ctx.lineTo(state.player.x + PLAYER_WIDTH / 2, state.player.y + PLAYER_HEIGHT - 5);
    ctx.lineTo(state.player.x, state.player.y + PLAYER_HEIGHT);
    ctx.closePath();
    ctx.fill();

    // Draw player engine flame
    ctx.fillStyle = '#ff6600';
    ctx.shadowColor = '#ff6600';
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.moveTo(state.player.x + PLAYER_WIDTH / 2 - 5, state.player.y + PLAYER_HEIGHT - 2);
    ctx.lineTo(state.player.x + PLAYER_WIDTH / 2, state.player.y + PLAYER_HEIGHT + 10 + Math.random() * 5);
    ctx.lineTo(state.player.x + PLAYER_WIDTH / 2 + 5, state.player.y + PLAYER_HEIGHT - 2);
    ctx.closePath();
    ctx.fill();

    // Draw enemies
    state.enemies.forEach(enemy => {
      ctx.fillStyle = enemy.color;
      ctx.shadowColor = enemy.color;
      ctx.shadowBlur = 8;
      
      // Draw alien shape
      ctx.beginPath();
      ctx.arc(enemy.x + ENEMY_WIDTH / 2, enemy.y + ENEMY_HEIGHT / 2, ENEMY_WIDTH / 2, 0, Math.PI * 2);
      ctx.fill();
      
      // Eyes
      ctx.fillStyle = '#000';
      ctx.shadowBlur = 0;
      ctx.fillRect(enemy.x + 8, enemy.y + 8, 6, 6);
      ctx.fillRect(enemy.x + 22, enemy.y + 8, 6, 6);
      
      // Antennae
      ctx.strokeStyle = enemy.color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(enemy.x + 10, enemy.y);
      ctx.lineTo(enemy.x + 5, enemy.y - 8);
      ctx.moveTo(enemy.x + ENEMY_WIDTH - 10, enemy.y);
      ctx.lineTo(enemy.x + ENEMY_WIDTH - 5, enemy.y - 8);
      ctx.stroke();
    });

    // Draw bullets
    state.bullets.forEach(bullet => {
      ctx.fillStyle = bullet.owner === 'player' ? '#00ff00' : '#ff0000';
      ctx.shadowColor = ctx.fillStyle;
      ctx.shadowBlur = 5;
      ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    });

    // Draw particles
    state.particles.forEach(particle => {
      const alpha = particle.life / particle.maxLife;
      ctx.fillStyle = particle.color.replace(')', `, ${alpha})`).replace('rgb', 'rgba').replace('#', '');
      ctx.shadowColor = particle.color;
      ctx.shadowBlur = 5;
      
      // Convert hex to rgb for particles
      const r = parseInt(particle.color.slice(1, 3), 16);
      const g = parseInt(particle.color.slice(3, 5), 16);
      const b = parseInt(particle.color.slice(5, 7), 16);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
      
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.shadowBlur = 0;

    animationRef.current = requestAnimationFrame(gameLoop);
  }, [isPaused, level, onEnemyHit, onPlayerHit, onLevelComplete, shoot, createExplosion]);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(gameLoop);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [gameLoop]);

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
      className="w-full h-full object-contain"
      style={{ 
        imageRendering: 'pixelated',
        maxWidth: '100%',
        maxHeight: '100%'
      }}
    />
  );
}
