import { useState, useCallback, useRef, useEffect } from 'react';
import type { Player, Bullet, Invader, Particle, GameState, GameStats, Position, Question } from '@/types/game';
import { getRandomQuestion } from '@/data/questions';

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const PLAYER_SPEED = 5;
const BULLET_SPEED = 8;
const INVADER_BASE_SPEED = 2;

export const useGame = () => {
  const gameLoopRef = useRef<number | null>(null);
  const lastShotTime = useRef<number>(0);
  const keysPressed = useRef<Set<string>>(new Set());
  
  const [gameState, setGameState] = useState<GameState>('menu');
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  
  const [player, setPlayer] = useState<Player>({
    position: { x: GAME_WIDTH / 2 - 25, y: GAME_HEIGHT - 60 },
    size: { width: 50, height: 40 },
    velocity: { dx: 0, dy: 0 },
    color: '#00ff00'
  });
  
  const [bullets, setBullets] = useState<Bullet[]>([]);
  const [invaders, setInvaders] = useState<Invader[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [enemyBullets, setEnemyBullets] = useState<Bullet[]>([]);
  
  const [stats, setStats] = useState<GameStats>({
    score: 0,
    level: 1,
    lives: 3,
    enemiesDestroyed: 0,
    questionsAnswered: 0,
    correctAnswers: 0
  });

  // Initialize invaders for a level
  const initializeInvaders = useCallback((level: number) => {
    const rows = 3 + Math.floor((level - 1) / 2);
    const cols = 6 + level;
    const invaderSpacing = 55;
    const startX = (GAME_WIDTH - (cols - 1) * invaderSpacing) / 2;
    // Start closer to player (lower startY)
    const startY = 30 + (level - 1) * 15;
    
    const newInvaders: Invader[] = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        // Determine invader type based on level and position
        const type = Math.min(level, 5);
        // Faster speed based on level
        const speedMultiplier = 1 + (level - 1) * 0.4;
        
        newInvaders.push({
          id: `invader-${row}-${col}-${Date.now()}`,
          position: { 
            x: startX + col * invaderSpacing, 
            y: startY + row * 45 
          },
          size: { width: 40, height: 30 },
          velocity: { 
            dx: (Math.random() > 0.5 ? 1 : -1) * INVADER_BASE_SPEED * speedMultiplier, 
            dy: 0.3 + level * 0.1 // Slight downward drift
          },
          type,
          health: 1 + Math.floor(level / 2),
          maxHealth: 1 + Math.floor(level / 2)
        });
      }
    }
    setInvaders(newInvaders);
  }, []);

  // Start game
  const startGame = useCallback(() => {
    setGameState('playing');
    setStats({
      score: 0,
      level: 1,
      lives: 3,
      enemiesDestroyed: 0,
      questionsAnswered: 0,
      correctAnswers: 0
    });
    initializeInvaders(1);
    setBullets([]);
    setEnemyBullets([]);
    setParticles([]);
  }, [initializeInvaders]);

  // Start next level
  const nextLevel = useCallback(() => {
    if (stats.level < 5) {
      setStats(prev => ({ ...prev, level: prev.level + 1 }));
      initializeInvaders(stats.level + 1);
      setGameState('playing');
    } else {
      setGameState('victory');
    }
  }, [stats.level, initializeInvaders]);

  // Create explosion particles
  const createExplosion = useCallback((position: Position, color: string, count: number = 15) => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count;
      const speed = 2 + Math.random() * 4;
      newParticles.push({
        id: `particle-${Date.now()}-${i}`,
        position: { ...position },
        velocity: {
          dx: Math.cos(angle) * speed,
          dy: Math.sin(angle) * speed
        },
        size: 3 + Math.random() * 4,
        color,
        life: 30,
        maxLife: 30
      });
    }
    setParticles(prev => [...prev, ...newParticles]);
  }, []);

  // Fire player bullet
  const fireBullet = useCallback(() => {
    const now = Date.now();
    if (now - lastShotTime.current < 250) return; // Fire rate limit
    
    lastShotTime.current = now;
    const newBullet: Bullet = {
      id: `bullet-${now}`,
      position: {
        x: player.position.x + player.size.width / 2 - 3,
        y: player.position.y
      },
      size: { width: 6, height: 12 },
      velocity: { dx: 0, dy: -BULLET_SPEED },
      isPlayerBullet: true
    };
    setBullets(prev => [...prev, newBullet]);
  }, [player]);

  // Fire enemy bullet
  const fireEnemyBullet = useCallback((invader: Invader) => {
    // Faster bullets at higher levels
    const bulletSpeed = BULLET_SPEED * (0.5 + stats.level * 0.15);
    const newBullet: Bullet = {
      id: `enemy-bullet-${Date.now()}-${invader.id}`,
      position: {
        x: invader.position.x + invader.size.width / 2 - 3,
        y: invader.position.y + invader.size.height
      },
      size: { width: 6, height: 10 },
      velocity: { dx: 0, dy: bulletSpeed },
      isPlayerBullet: false
    };
    setEnemyBullets(prev => [...prev, newBullet]);
  }, [stats.level]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current.add(e.key);
      if (e.key === ' ' && gameState === 'playing') {
        e.preventDefault();
        fireBullet();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current.delete(e.key);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState, fireBullet]);

  // Game loop
  useEffect(() => {
    if (gameState !== 'playing') {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
      return;
    }

    const gameLoop = () => {
      // Update player position
      setPlayer(prev => {
        let newX = prev.position.x;
        if (keysPressed.current.has('ArrowLeft') || keysPressed.current.has('a')) {
          newX = Math.max(0, prev.position.x - PLAYER_SPEED);
        }
        if (keysPressed.current.has('ArrowRight') || keysPressed.current.has('d')) {
          newX = Math.min(GAME_WIDTH - prev.size.width, prev.position.x + PLAYER_SPEED);
        }
        return { ...prev, position: { ...prev.position, x: newX } };
      });

      // Update bullets
      setBullets(prev => prev
        .map(b => ({ ...b, position: { ...b.position, y: b.position.y + b.velocity.dy } }))
        .filter(b => b.position.y > -20 && b.position.y < GAME_HEIGHT + 20)
      );

      setEnemyBullets(prev => prev
        .map(b => ({ ...b, position: { ...b.position, y: b.position.y + b.velocity.dy } }))
        .filter(b => b.position.y > -20 && b.position.y < GAME_HEIGHT + 20)
      );

      // Update invaders with aggressive movement
      setInvaders(prev => prev.map(invader => {
        let newX = invader.position.x + invader.velocity.dx;
        let newY = invader.position.y + invader.velocity.dy; // Add downward movement
        let newDx = invader.velocity.dx;
        let newDy = invader.velocity.dy;

        // Bounce off walls
        if (newX <= 0 || newX >= GAME_WIDTH - invader.size.width) {
          newDx = -newDx;
          newX = Math.max(0, Math.min(GAME_WIDTH - invader.size.width, newX));
        }

        // Invaders move down toward player - cap at player area
        const maxY = GAME_HEIGHT - 150; // Don't go below this (keep above player)
        const minY = 20; // Don't go above this
        
        if (newY > maxY) {
          newY = maxY;
          newDy = -Math.abs(newDy) * 0.5; // Bounce back up slightly
        }
        if (newY < minY) {
          newY = minY;
          newDy = Math.abs(newDy);
        }

        // More frequent random vertical movement toward player
        if (Math.random() < 0.02 * stats.level) {
          newDy += 0.2; // Tend to move down
        }

        // Random direction change (more frequent)
        if (Math.random() < 0.03) {
          const speedMultiplier = 1 + (stats.level - 1) * 0.4;
          newDx = (Math.random() > 0.5 ? 1 : -1) * INVADER_BASE_SPEED * speedMultiplier;
        }

        return {
          ...invader,
          position: { x: newX, y: newY },
          velocity: { dx: newDx, dy: newDy }
        };
      }));

      // More frequent enemy shooting
      if (Math.random() < 0.04 * stats.level && invaders.length > 0) {
        // Prioritize invaders that are lower (closer to player)
        const sortedInvaders = [...invaders].sort((a, b) => b.position.y - a.position.y);
        // Pick from the lower half of invaders more often
        const pickIndex = Math.random() < 0.7 
          ? Math.floor(Math.random() * Math.ceil(sortedInvaders.length / 2))
          : Math.floor(Math.random() * sortedInvaders.length);
        fireEnemyBullet(sortedInvaders[pickIndex]);
      }

      // Update particles
      setParticles(prev => prev
        .map(p => ({
          ...p,
          position: {
            x: p.position.x + p.velocity.dx,
            y: p.position.y + p.velocity.dy
          },
          life: p.life - 1
        }))
        .filter(p => p.life > 0)
      );

      // Check bullet-invader collisions
      setBullets(prevBullets => {
        const remainingBullets = [...prevBullets];
        
        setInvaders(prevInvaders => {
          const remainingInvaders = [...prevInvaders];
          
          remainingBullets.forEach((bullet, bulletIndex) => {
            remainingInvaders.forEach((invader, invaderIndex) => {
              if (
                bullet.position.x < invader.position.x + invader.size.width &&
                bullet.position.x + bullet.size.width > invader.position.x &&
                bullet.position.y < invader.position.y + invader.size.height &&
                bullet.position.y + bullet.size.height > invader.position.y
              ) {
                // Hit!
                remainingBullets.splice(bulletIndex, 1);
                remainingInvaders.splice(invaderIndex, 1);
                
                createExplosion(
                  { 
                    x: invader.position.x + invader.size.width / 2, 
                    y: invader.position.y + invader.size.height / 2 
                  },
                  '#ff6600'
                );
                
                // Show quiz
                setCurrentQuestion(getRandomQuestion());
                setGameState('quiz');
              }
            });
          });
          
          return remainingInvaders;
        });
        
        return remainingBullets;
      });

      // Check enemy bullet-player collisions
      setEnemyBullets(prevBullets => {
        const remainingBullets = [...prevBullets];
        
        remainingBullets.forEach((bullet, index) => {
          if (
            bullet.position.x < player.position.x + player.size.width &&
            bullet.position.x + bullet.size.width > player.position.x &&
            bullet.position.y < player.position.y + player.size.height &&
            bullet.position.y + bullet.size.height > player.position.y
          ) {
            remainingBullets.splice(index, 1);
            
            createExplosion(
              { 
                x: player.position.x + player.size.width / 2, 
                y: player.position.y + player.size.height / 2 
              },
              '#00ff00',
              20
            );
            
            setStats(prev => {
              const newLives = prev.lives - 1;
              const newScore = Math.max(0, prev.score - 50);
              
              if (newLives <= 0) {
                setGameState('gameOver');
              }
              
              return { ...prev, lives: newLives, score: newScore };
            });
          }
        });
        
        return remainingBullets;
      });

      // Check if all invaders destroyed
      setInvaders(prev => {
        if (prev.length === 0 && gameState === 'playing') {
          nextLevel();
        }
        return prev;
      });

      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameState, player, invaders, stats.level, fireEnemyBullet, createExplosion, nextLevel]);

  // Handle quiz answer
  const handleQuizAnswer = useCallback((answer: string) => {
    if (!currentQuestion) return;
    
    setStats(prev => ({ 
      ...prev, 
      questionsAnswered: prev.questionsAnswered + 1 
    }));
    
    const isCorrect = currentQuestion.type === 'calculation' 
      ? Math.abs(parseFloat(answer) - parseFloat(currentQuestion.correctAnswer)) <= (currentQuestion.tolerance || 0)
      : answer === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      setStats(prev => ({ 
        ...prev, 
        score: prev.score + 100,
        correctAnswers: prev.correctAnswers + 1,
        enemiesDestroyed: prev.enemiesDestroyed + 1
      }));
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    } else {
      setStats(prev => ({ 
        ...prev, 
        score: Math.max(0, prev.score - 25)
      }));
    }
    
    setCurrentQuestion(null);
    setGameState('playing');
  }, [currentQuestion]);

  return {
    gameState,
    setGameState,
    player,
    bullets,
    invaders,
    particles,
    enemyBullets,
    stats,
    currentQuestion,
    showConfetti,
    gameWidth: GAME_WIDTH,
    gameHeight: GAME_HEIGHT,
    startGame,
    handleQuizAnswer
  };
};
