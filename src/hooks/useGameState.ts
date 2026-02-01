import { useReducer, useCallback } from 'react';
import type { GameState, GameAction } from '../types/game';

const initialState: GameState = {
  score: 0,
  lives: 3,
  level: 1,
  isPaused: false,
  isPlaying: false,
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...initialState,
        isPlaying: true,
        isPaused: false,
      };
    case 'PAUSE_GAME':
      return {
        ...state,
        isPaused: true,
      };
    case 'RESUME_GAME':
      return {
        ...state,
        isPaused: false,
      };
    case 'END_GAME':
      return {
        ...state,
        isPlaying: false,
        isPaused: false,
      };
    case 'UPDATE_SCORE':
      return {
        ...state,
        score: Math.max(0, state.score + action.payload),
      };
    case 'LOSE_LIFE':
      return {
        ...state,
        lives: Math.max(0, state.lives - 1),
      };
    case 'LEVEL_UP':
      return {
        ...state,
        level: state.level + 1,
      };
    default:
      return state;
  }
}

export function useGameState() {
  const [gameState, dispatch] = useReducer(gameReducer, initialState);

  const startGame = useCallback(() => {
    dispatch({ type: 'START_GAME' });
  }, []);

  const pauseGame = useCallback(() => {
    dispatch({ type: 'PAUSE_GAME' });
  }, []);

  const resumeGame = useCallback(() => {
    dispatch({ type: 'RESUME_GAME' });
  }, []);

  const endGame = useCallback(() => {
    dispatch({ type: 'END_GAME' });
  }, []);

  const updateScore = useCallback((points: number) => {
    dispatch({ type: 'UPDATE_SCORE', payload: points });
  }, []);

  const loseLife = useCallback(() => {
    dispatch({ type: 'LOSE_LIFE' });
  }, []);

  const levelUp = useCallback(() => {
    dispatch({ type: 'LEVEL_UP' });
  }, []);

  return {
    gameState,
    startGame,
    pauseGame,
    resumeGame,
    endGame,
    updateScore,
    loseLife,
    levelUp,
  };
}
