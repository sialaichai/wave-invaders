import { useEffect, useState } from 'react';
import { RotateCcw, Trophy, Star, Target } from 'lucide-react';
import confetti from 'canvas-confetti';

interface GameOverScreenProps {
  score: number;
  level: number;
  onRestart: () => void;
}

export function GameOverScreen({ score, level, onRestart }: GameOverScreenProps) {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    // Animate score counting
    const duration = 2000;
    const steps = 60;
    const increment = score / steps;
    let current = 0;
    
    const interval = setInterval(() => {
      current += increment;
      if (current >= score) {
        setDisplayScore(score);
        clearInterval(interval);
        
        // Trigger confetti for high scores
        if (score > 500) {
          confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 },
            colors: ['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1'],
          });
        }
      } else {
        setDisplayScore(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [score]);

  const getRank = (score: number) => {
    if (score >= 2000) return { title: 'PHYSICS MASTER', color: 'text-purple-400' };
    if (score >= 1500) return { title: 'WAVE EXPERT', color: 'text-cyan-400' };
    if (score >= 1000) return { title: 'SCIENCE HERO', color: 'text-green-400' };
    if (score >= 500) return { title: 'SPACE CADET', color: 'text-yellow-400' };
    return { title: 'ROOKIE PILOT', color: 'text-gray-400' };
  };

  const rank = getRank(score);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-red-500/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `pulse ${1 + Math.random()}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Scanlines */}
      <div className="absolute inset-0 scanlines pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        {/* Game Over text */}
        <h1 className="text-6xl md:text-8xl font-bold text-red-500 glow-text mb-4">
          GAME OVER
        </h1>

        {/* Rank */}
        <div className={`text-2xl font-bold ${rank.color} mb-8`}>
          {rank.title}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-6 mb-8 max-w-md mx-auto">
          <div className="bg-gray-900/80 border-2 border-yellow-500/50 rounded-lg p-4">
            <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <p className="text-gray-400 text-sm">Final Score</p>
            <p className="text-3xl font-bold text-yellow-400 font-mono">
              {displayScore.toString().padStart(6, '0')}
            </p>
          </div>

          <div className="bg-gray-900/80 border-2 border-cyan-500/50 rounded-lg p-4">
            <Target className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
            <p className="text-gray-400 text-sm">Level Reached</p>
            <p className="text-3xl font-bold text-cyan-400 font-mono">
              {level}
            </p>
          </div>
        </div>

        {/* Stars rating */}
        <div className="flex justify-center gap-2 mb-8">
          {[...Array(5)].map((_, i) => {
            const threshold = (i + 1) * 400;
            const filled = score >= threshold;
            return (
              <Star
                key={i}
                className={`w-8 h-8 ${
                  filled
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-700'
                }`}
              />
            );
          })}
        </div>

        {/* Encouragement message */}
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          {score >= 2000
            ? "Incredible! You've mastered the physics of waves!"
            : score >= 1000
            ? "Great job! Keep learning and you'll become a master!"
            : score >= 500
            ? "Good effort! Practice makes perfect!"
            : "Don't give up! Every attempt makes you stronger!"}
        </p>

        {/* Restart button */}
        <button
          onClick={onRestart}
          className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xl rounded-lg arcade-btn flex items-center justify-center gap-2 mx-auto"
        >
          <RotateCcw className="w-6 h-6" />
          PLAY AGAIN
        </button>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <p className="text-gray-600 text-sm">Thanks for playing Wave Invaders!</p>
      </div>
    </div>
  );
}
