export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface GameEntity extends Position, Size {
  id: string;
  velocity: { x: number; y: number };
}

export interface Player extends GameEntity {
  type: 'player';
  lives: number;
}

export interface Enemy extends GameEntity {
  type: 'enemy';
  color: string;
  points: number;
}

export interface Bullet extends GameEntity {
  type: 'bullet';
  owner: 'player' | 'enemy';
}

export interface Particle extends Position {
  id: string;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
}

export interface GameState {
  score: number;
  lives: number;
  level: number;
  isPaused: boolean;
  isPlaying: boolean;
}

export type GameAction = 
  | { type: 'START_GAME' }
  | { type: 'PAUSE_GAME' }
  | { type: 'RESUME_GAME' }
  | { type: 'END_GAME' }
  | { type: 'UPDATE_SCORE'; payload: number }
  | { type: 'LOSE_LIFE' }
  | { type: 'LEVEL_UP' };
