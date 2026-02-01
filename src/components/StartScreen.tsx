import { useEffect, useState } from 'react';
import { Rocket, Target, Brain, Zap, ChevronRight } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  const [showInstructions, setShowInstructions] = useState(false);
  const [animatedText, setAnimatedText] = useState('');
  const fullText = 'WAVE INVADERS';

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setAnimatedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated starfield background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              opacity: Math.random() * 0.5 + 0.3,
            }}
          />
        ))}
      </div>

      {/* Scanlines overlay */}
      <div className="absolute inset-0 scanlines pointer-events-none" />

      {/* Main content */}
      <div className="relative z-10 text-center px-4">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 glow-text mb-2">
            {animatedText}
            <span className="animate-pulse">_</span>
          </h1>
          <p className="text-xl text-gray-400 mt-4">Physics Quiz Space Shooter</p>
        </div>

        {!showInstructions ? (
          <div className="space-y-6">
            {/* Feature cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="p-4 bg-gray-900/80 border border-cyan-500/50 rounded-lg">
                <Target className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                <p className="text-sm text-gray-300">5 Difficulty Levels</p>
              </div>
              <div className="p-4 bg-gray-900/80 border border-purple-500/50 rounded-lg">
                <Brain className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <p className="text-sm text-gray-300">60 Physics Questions</p>
              </div>
              <div className="p-4 bg-gray-900/80 border border-green-500/50 rounded-lg">
                <Zap className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <p className="text-sm text-gray-300">Retro Arcade Style</p>
              </div>
              <div className="p-4 bg-gray-900/80 border border-pink-500/50 rounded-lg">
                <Rocket className="w-8 h-8 text-pink-400 mx-auto mb-2" />
                <p className="text-sm text-gray-300">Learn While Playing</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onStart}
                className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xl rounded-lg arcade-btn flex items-center justify-center gap-2"
              >
                <Rocket className="w-6 h-6" />
                START GAME
              </button>
              <button
                onClick={() => setShowInstructions(true)}
                className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white font-bold text-xl rounded-lg border border-gray-600 arcade-btn flex items-center justify-center gap-2"
              >
                <ChevronRight className="w-6 h-6" />
                HOW TO PLAY
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-900/90 border-2 border-cyan-500 rounded-lg p-6 mb-6">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">How to Play</h2>
              
              <div className="space-y-4 text-left">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-cyan-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-cyan-400 font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Move Your Ship</h3>
                    <p className="text-gray-400">Use <span className="text-cyan-400">Arrow Keys</span> or <span className="text-cyan-400">A/D</span> to move left and right</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-400 font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Shoot Aliens</h3>
                    <p className="text-gray-400">Press <span className="text-purple-400">SPACE</span> or <span className="text-purple-400">↑</span> to shoot</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-green-400 font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Answer Questions</h3>
                    <p className="text-gray-400">When you hit an alien, answer the physics question to score points!</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-yellow-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-yellow-400 font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Scoring</h3>
                    <p className="text-gray-400">
                      <span className="text-green-400">+100</span> for correct answer<br />
                      <span className="text-red-400">-25</span> for wrong answer<br />
                      <span className="text-red-400">-50</span> and lose a life if hit
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-700">
                <h3 className="font-bold text-white mb-2">Topics Covered:</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-cyan-900/50 text-cyan-400 rounded-full text-sm">Wave Basics</span>
                  <span className="px-3 py-1 bg-purple-900/50 text-purple-400 rounded-full text-sm">Wave Properties</span>
                  <span className="px-3 py-1 bg-green-900/50 text-green-400 rounded-full text-sm">Intensity</span>
                  <span className="px-3 py-1 bg-yellow-900/50 text-yellow-400 rounded-full text-sm">Polarization</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowInstructions(false)}
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-lg border border-gray-600"
            >
              ← Back
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <p className="text-gray-600 text-sm">Master wave mechanics while defending the galaxy!</p>
      </div>
    </div>
  );
}
