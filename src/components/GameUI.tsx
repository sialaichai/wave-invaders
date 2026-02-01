import type { GameStats, GameState } from '@/types/game';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, Pause, RotateCcw, Heart, Trophy, Target, Brain, Zap } from 'lucide-react';

interface GameUIProps {
  stats: GameStats;
  gameState: GameState;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
}

export const GameUI: React.FC<GameUIProps> = ({
  stats,
  gameState,
  onStart,
  onPause,
  onResume
}) => {
  const accuracy = stats.questionsAnswered > 0 
    ? Math.round((stats.correctAnswers / stats.questionsAnswered) * 100) 
    : 0;

  return (
    <div className="space-y-4">
      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-slate-800/80 border border-cyan-500/30 rounded-lg p-3 flex items-center gap-3">
          <Trophy className="w-6 h-6 text-yellow-400" />
          <div>
            <p className="text-xs text-slate-400">Score</p>
            <p className="text-xl font-bold text-yellow-400">{stats.score.toLocaleString()}</p>
          </div>
        </div>
        
        <div className="bg-slate-800/80 border border-cyan-500/30 rounded-lg p-3 flex items-center gap-3">
          <Zap className="w-6 h-6 text-cyan-400" />
          <div>
            <p className="text-xs text-slate-400">Level</p>
            <p className="text-xl font-bold text-cyan-400">{stats.level}/5</p>
          </div>
        </div>
        
        <div className="bg-slate-800/80 border border-cyan-500/30 rounded-lg p-3 flex items-center gap-3">
          <Heart className="w-6 h-6 text-red-400" />
          <div>
            <p className="text-xs text-slate-400">Lives</p>
            <p className="text-xl font-bold text-red-400">{stats.lives}</p>
          </div>
        </div>
        
        <div className="bg-slate-800/80 border border-cyan-500/30 rounded-lg p-3 flex items-center gap-3">
          <Brain className="w-6 h-6 text-purple-400" />
          <div>
            <p className="text-xs text-slate-400">Accuracy</p>
            <p className="text-xl font-bold text-purple-400">{accuracy}%</p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-slate-800/80 border border-cyan-500/30 rounded-lg p-4">
        <div className="flex justify-between text-sm text-slate-400 mb-2">
          <span>Level Progress</span>
          <span>Enemies Destroyed: {stats.enemiesDestroyed}</span>
        </div>
        <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
            style={{ width: `${(stats.level / 5) * 100}%` }}
          />
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex gap-3 justify-center">
        {gameState === 'menu' && (
          <Button 
            onClick={onStart}
            className="px-8 py-6 text-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500"
          >
            <Play className="w-5 h-5 mr-2" />
            Start Game
          </Button>
        )}
        
        {gameState === 'playing' && (
          <Button 
            onClick={onPause}
            variant="outline"
            className="px-6 py-4 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10"
          >
            <Pause className="w-5 h-5 mr-2" />
            Pause
          </Button>
        )}
        
        {gameState === 'paused' && (
          <Button 
            onClick={onResume}
            className="px-6 py-4 bg-gradient-to-r from-cyan-600 to-blue-600"
          >
            <Play className="w-5 h-5 mr-2" />
            Resume
          </Button>
        )}
        
        {(gameState === 'gameOver' || gameState === 'victory') && (
          <Button 
            onClick={onStart}
            className="px-8 py-6 text-lg bg-gradient-to-r from-cyan-600 to-blue-600"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Play Again
          </Button>
        )}
      </div>
    </div>
  );
};

interface MenuScreenProps {
  onStart: () => void;
}

export const MenuScreen: React.FC<MenuScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-8">
      <div className="text-center">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
          WAVE INVADERS
        </h1>
        <p className="text-xl text-slate-400">Physics Quiz Space Shooter</p>
      </div>
      
      <Card className="bg-slate-900/90 border-cyan-500/30 max-w-md">
        <CardHeader>
          <CardTitle className="text-cyan-400 text-center">How to Play</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-slate-300">
          <div className="flex items-start gap-3">
            <Target className="w-5 h-5 text-cyan-400 mt-1" />
            <p>Use <span className="text-cyan-400 font-bold">Arrow Keys</span> or <span className="text-cyan-400 font-bold">A/D</span> to move</p>
          </div>
          <div className="flex items-start gap-3">
            <Zap className="w-5 h-5 text-yellow-400 mt-1" />
            <p>Press <span className="text-yellow-400 font-bold">SPACE</span> to shoot</p>
          </div>
          <div className="flex items-start gap-3">
            <Brain className="w-5 h-5 text-purple-400 mt-1" />
            <p>Answer physics questions when you hit enemies</p>
          </div>
          <div className="flex items-start gap-3">
            <Trophy className="w-5 h-5 text-green-400 mt-1" />
            <p>Correct answers: <span className="text-green-400">+100 pts</span> | Wrong: <span className="text-red-400">-25 pts</span></p>
          </div>
        </CardContent>
      </Card>
      
      <Button 
        onClick={onStart}
        className="px-12 py-8 text-2xl bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 hover:from-cyan-500 hover:via-purple-500 hover:to-pink-500 animate-pulse"
      >
        <Play className="w-8 h-8 mr-3" />
        START GAME
      </Button>
    </div>
  );
};

interface GameOverScreenProps {
  stats: GameStats;
  onRestart: () => void;
  isVictory: boolean;
}

export const GameOverScreen: React.FC<GameOverScreenProps> = ({ stats, onRestart, isVictory }) => {
  const accuracy = stats.questionsAnswered > 0 
    ? Math.round((stats.correctAnswers / stats.questionsAnswered) * 100) 
    : 0;

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6">
      <h1 className={`text-5xl font-bold ${isVictory ? 'text-green-400' : 'text-red-400'}`}>
        {isVictory ? 'VICTORY!' : 'GAME OVER'}
      </h1>
      
      <Card className="bg-slate-900/90 border-cyan-500/30 w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-cyan-400 text-center">Final Statistics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-800 p-4 rounded-lg text-center">
              <p className="text-slate-400 text-sm">Final Score</p>
              <p className="text-3xl font-bold text-yellow-400">{stats.score.toLocaleString()}</p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg text-center">
              <p className="text-slate-400 text-sm">Level Reached</p>
              <p className="text-3xl font-bold text-cyan-400">{stats.level}/5</p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg text-center">
              <p className="text-slate-400 text-sm">Enemies Destroyed</p>
              <p className="text-3xl font-bold text-green-400">{stats.enemiesDestroyed}</p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg text-center">
              <p className="text-slate-400 text-sm">Accuracy</p>
              <p className="text-3xl font-bold text-purple-400">{accuracy}%</p>
            </div>
          </div>
          
          <div className="bg-slate-800 p-4 rounded-lg">
            <p className="text-slate-400 text-sm mb-2">Questions Summary</p>
            <div className="flex justify-between">
              <span className="text-white">Answered: {stats.questionsAnswered}</span>
              <span className="text-green-400">Correct: {stats.correctAnswers}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Button 
        onClick={onRestart}
        className="px-8 py-6 text-xl bg-gradient-to-r from-cyan-600 to-blue-600"
      >
        <RotateCcw className="w-6 h-6 mr-2" />
        Play Again
      </Button>
    </div>
  );
};
