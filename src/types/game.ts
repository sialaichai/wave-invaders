export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface Velocity {
  dx: number;
  dy: number;
}

export interface Player {
  position: Position;
  size: Size;
  velocity: Velocity;
  color: string;
}

export interface Bullet {
  id: string;
  position: Position;
  size: Size;
  velocity: Velocity;
  isPlayerBullet: boolean;
}

export interface Invader {
  id: string;
  position: Position;
  size: Size;
  velocity: Velocity;
  type: number; // 1-5 for different shapes
  health: number;
  maxHealth: number;
}

export interface Particle {
  id: string;
  position: Position;
  velocity: Velocity;
  size: number;
  color: string;
  life: number;
  maxLife: number;
}

export interface Question {
  id: number;
  question: string;
  type: 'mcq' | 'calculation';
  options?: string[];
  correctAnswer: string;
  tolerance?: number; // For numerical answers
  explanation: string;
}

export type GameState = 'menu' | 'playing' | 'paused' | 'quiz' | 'gameOver' | 'victory';

export interface GameStats {
  score: number;
  level: number;
  lives: number;
  enemiesDestroyed: number;
  questionsAnswered: number;
  correctAnswers: number;
}
