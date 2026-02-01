import { useState, useCallback, useEffect } from 'react';
import { GameCanvas } from './components/GameCanvas';
import { QuizModal } from './components/QuizModal';
import { StartScreen } from './components/StartScreen';
import { GameOverScreen } from './components/GameOverScreen';
import { useGameState } from './hooks/useGameState';
import { useSound } from './hooks/useSound';
import { physicsQuestions } from './lib/questions';
import type { Question } from './types/game';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [gameOver, setGameOver] = useState(false);
  
  const { 
    gameState, 
    startGame, 
    pauseGame, 
    resumeGame,
    updateScore,
    loseLife,
    levelUp 
  } = useGameState();
  
  const { playSound } = useSound();

  const handleStartGame = useCallback(() => {
    setGameStarted(true);
    setGameOver(false);
    startGame();
    playSound('start');
  }, [startGame, playSound]);

  const handleEnemyHit = useCallback(() => {
    pauseGame();
    const randomQuestion = physicsQuestions[Math.floor(Math.random() * physicsQuestions.length)];
    setCurrentQuestion(randomQuestion);
    setShowQuiz(true);
    playSound('hit');
  }, [pauseGame, playSound]);

  const handleAnswer = useCallback((correct: boolean) => {
    setShowQuiz(false);
    setCurrentQuestion(null);
    
    if (correct) {
      updateScore(100);
      playSound('correct');
    } else {
      updateScore(-25);
      playSound('wrong');
    }
    
    resumeGame();
  }, [updateScore, resumeGame, playSound]);

  const handlePlayerHit = useCallback(() => {
    loseLife();
    playSound('damage');
    
    if (gameState.lives <= 1) {
      setGameOver(true);
      playSound('gameover');
    }
  }, [loseLife, gameState.lives, playSound]);

  const handleLevelComplete = useCallback(() => {
    levelUp();
    playSound('levelup');
  }, [levelUp, playSound]);

  const handleRestart = useCallback(() => {
    setGameOver(false);
    setGameStarted(true);
    startGame();
    playSound('start');
  }, [startGame, playSound]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && gameStarted && !showQuiz && !gameOver) {
        if (gameState.isPaused) {
          resumeGame();
        } else {
          pauseGame();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameStarted, showQuiz, gameOver, gameState.isPaused, pauseGame, resumeGame]);

  if (!gameStarted) {
    return <StartScreen onStart={handleStartGame} />;
  }

  if (gameOver) {
    return (
      <GameOverScreen 
        score={gameState.score} 
        level={gameState.level}
        onRestart={handleRestart}
      />
    );
  }

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* HUD */}
      <div className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center p-4 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex gap-6">
          <div className="text-white">
            <span className="text-cyan-400 font-bold">Score:</span>
            <span className="ml-2 text-xl font-mono">{gameState.score}</span>
          </div>
          <div className="text-white">
            <span className="text-green-400 font-bold">Level:</span>
            <span className="ml-2 text-xl font-mono">{gameState.level}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-red-400 font-bold">Lives:</span>
          <div className="flex gap-1">
            {Array.from({ length: gameState.lives }).map((_, i) => (
              <div key={i} className="w-6 h-6 bg-red-500 rounded-full animate-pulse" />
            ))}
          </div>
        </div>
      </div>

      {/* Pause Overlay */}
      {gameState.isPaused && !showQuiz && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/70">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-4">PAUSED</h2>
            <p className="text-gray-300">Press ESC to resume</p>
          </div>
        </div>
      )}

      {/* Game Canvas */}
      <GameCanvas 
        isPaused={gameState.isPaused || showQuiz}
        level={gameState.level}
        onEnemyHit={handleEnemyHit}
        onPlayerHit={handlePlayerHit}
        onLevelComplete={handleLevelComplete}
      />

      {/* Quiz Modal */}
      {showQuiz && currentQuestion && (
        <QuizModal 
          question={currentQuestion}
          onAnswer={handleAnswer}
        />
      )}
    </div>
  );
}

export default App;
