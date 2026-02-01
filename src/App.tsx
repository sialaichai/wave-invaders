import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { useGame } from '@/hooks/useGame';
import { GameCanvas } from '@/components/GameCanvas';
import { GameUI, MenuScreen, GameOverScreen } from '@/components/GameUI';
import { QuizModal } from '@/components/QuizModal';
import { SoundEffects } from '@/components/SoundEffects';
import './App.css';

function App() {
  const {
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
    gameWidth,
    gameHeight,
    startGame,
    handleQuizAnswer
  } = useGame();


  
  const [soundTriggers, setSoundTriggers] = useState({
    shoot: false,
    explosion: false,
    correct: false,
    wrong: false,
    levelUp: false
  });

  // Trigger confetti on correct answer
  useEffect(() => {
    if (showConfetti) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00ff00', '#00ffff', '#ff00ff', '#ffff00']
      });
      setSoundTriggers(prev => ({ ...prev, correct: true }));
      setTimeout(() => setSoundTriggers(prev => ({ ...prev, correct: false })), 100);
    }
  }, [showConfetti]);

  // Track bullet firing for sound
  useEffect(() => {
    if (bullets.length > 0) {
      setSoundTriggers(prev => ({ ...prev, shoot: true }));
      setTimeout(() => setSoundTriggers(prev => ({ ...prev, shoot: false })), 100);
    }
  }, [bullets.length]);

  // Track explosions for sound
  useEffect(() => {
    if (particles.length > 0) {
      setSoundTriggers(prev => ({ ...prev, explosion: true }));
      setTimeout(() => setSoundTriggers(prev => ({ ...prev, explosion: false })), 100);
    }
  }, [particles.length]);

  // Track level changes for sound
  useEffect(() => {
    if (stats.level > 1 && gameState === 'playing') {
      setSoundTriggers(prev => ({ ...prev, levelUp: true }));
      setTimeout(() => setSoundTriggers(prev => ({ ...prev, levelUp: false })), 100);
    }
  }, [stats.level, gameState]);

  const handleStart = () => {
    startGame();
  };

  const handlePause = () => {
    setGameState('paused');
  };

  const handleResume = () => {
    setGameState('playing');
  };

  const handleQuizSubmit = (answer: string) => {
    const question = currentQuestion;
    if (question) {
      const isCorrect = question.type === 'calculation' 
        ? Math.abs(parseFloat(answer) - parseFloat(question.correctAnswer)) <= (question.tolerance || 0)
        : answer === question.correctAnswer;
      
      if (!isCorrect) {
        setSoundTriggers(prev => ({ ...prev, wrong: true }));
        setTimeout(() => setSoundTriggers(prev => ({ ...prev, wrong: false })), 100);
      }
    }
    handleQuizAnswer(answer);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4">
      {/* Sound Effects */}
      <SoundEffects
        playShoot={soundTriggers.shoot}
        playExplosion={soundTriggers.explosion}
        playCorrect={soundTriggers.correct}
        playWrong={soundTriggers.wrong}
        playLevelUp={soundTriggers.levelUp}
      />

      {/* Header */}
      <header className="mb-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          WAVE INVADERS
        </h1>
        <p className="text-slate-400 mt-2">Master Physics, Save the Galaxy!</p>
      </header>

      {/* Main Game Area */}
      <div className="w-full max-w-4xl">
        {gameState === 'menu' && (
          <MenuScreen onStart={handleStart} />
        )}

        {(gameState === 'playing' || gameState === 'paused') && (
          <div className="space-y-4">
            <GameUI 
              stats={stats}
              gameState={gameState}
              onStart={handleStart}
              onPause={handlePause}
              onResume={handleResume}
            />
            
            <div className="flex justify-center">
              <GameCanvas
                player={player}
                bullets={bullets}
                invaders={invaders}
                particles={particles}
                enemyBullets={enemyBullets}
                gameWidth={gameWidth}
                gameHeight={gameHeight}
              />
            </div>
            
            {gameState === 'paused' && (
              <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-40">
                <div className="bg-slate-900 border-2 border-cyan-500 rounded-lg p-8 text-center">
                  <h2 className="text-3xl font-bold text-cyan-400 mb-4">PAUSED</h2>
                  <button
                    onClick={handleResume}
                    className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 rounded-lg font-bold"
                  >
                    Resume Game
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {gameState === 'quiz' && currentQuestion && (
          <>
            <GameUI 
              stats={stats}
              gameState={gameState}
              onStart={handleStart}
              onPause={handlePause}
              onResume={handleResume}
            />
            <div className="flex justify-center mt-4">
              <GameCanvas
                player={player}
                bullets={bullets}
                invaders={invaders}
                particles={particles}
                enemyBullets={enemyBullets}
                gameWidth={gameWidth}
                gameHeight={gameHeight}
              />
            </div>
            <QuizModal 
              question={currentQuestion}
              onAnswer={handleQuizSubmit}
            />
          </>
        )}

        {gameState === 'gameOver' && (
          <GameOverScreen 
            stats={stats}
            onRestart={handleStart}
            isVictory={false}
          />
        )}

        {gameState === 'victory' && (
          <GameOverScreen 
            stats={stats}
            onRestart={handleStart}
            isVictory={true}
          />
        )}
      </div>

      {/* Instructions Footer */}
      <footer className="mt-8 text-center text-slate-500 text-sm">
        <p>Use Arrow Keys or A/D to move • Press SPACE to shoot • Answer questions to score!</p>
        <p className="mt-2">Questions based on H2 Physics Waves syllabus</p>
      </footer>
    </div>
  );
}

export default App;
