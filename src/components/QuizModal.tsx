import { useState } from 'react';
import { Check, X, HelpCircle } from 'lucide-react';
import type { Question } from '../types/game';
import confetti from 'canvas-confetti';

interface QuizModalProps {
  question: Question;
  onAnswer: (correct: boolean) => void;
}

export function QuizModal({ question, onAnswer }: QuizModalProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSelect = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    
    const correct = selectedAnswer === question.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00ff00', '#00ffff', '#ffff00'],
      });
    }

    setTimeout(() => {
      onAnswer(correct);
    }, 2000);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'text-green-400';
      case 'medium':
        return 'text-yellow-400';
      case 'hard':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl mx-4 p-6 bg-gray-900 border-2 border-cyan-500 rounded-lg shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <HelpCircle className="w-6 h-6 text-cyan-400" />
            <span className="text-sm text-gray-400">Physics Quiz</span>
          </div>
          <div className="flex items-center gap-4">
            <span className={`text-sm font-bold ${getDifficultyColor(question.difficulty)}`}>
              {question.difficulty.toUpperCase()}
            </span>
            <span className="text-sm text-gray-500">{question.topic}</span>
          </div>
        </div>

        {/* Question */}
        <h3 className="text-xl font-bold text-white mb-6 leading-relaxed">
          {question.question}
        </h3>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {question.options.map((option, index) => {
            let buttonClass = 'w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ';
            
            if (showResult) {
              if (index === question.correctAnswer) {
                buttonClass += 'bg-green-900/50 border-green-500 text-green-100';
              } else if (index === selectedAnswer && index !== question.correctAnswer) {
                buttonClass += 'bg-red-900/50 border-red-500 text-red-100';
              } else {
                buttonClass += 'bg-gray-800 border-gray-700 text-gray-400';
              }
            } else {
              if (selectedAnswer === index) {
                buttonClass += 'bg-cyan-900/50 border-cyan-500 text-cyan-100';
              } else {
                buttonClass += 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:border-gray-600';
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                disabled={showResult}
                className={buttonClass}
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 text-sm font-bold">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span>{option}</span>
                  {showResult && index === question.correctAnswer && (
                    <Check className="w-5 h-5 text-green-400 ml-auto" />
                  )}
                  {showResult && index === selectedAnswer && index !== question.correctAnswer && (
                    <X className="w-5 h-5 text-red-400 ml-auto" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showResult && (
          <div className={`p-4 rounded-lg mb-4 ${isCorrect ? 'bg-green-900/30 border border-green-500' : 'bg-red-900/30 border border-red-500'}`}>
            <p className={`font-bold mb-2 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
              {isCorrect ? 'Correct!' : 'Incorrect!'}
            </p>
            <p className="text-gray-300 text-sm">{question.explanation}</p>
          </div>
        )}

        {/* Submit Button */}
        {!showResult && (
          <button
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
            className={`w-full py-3 px-6 rounded-lg font-bold text-lg transition-all duration-200 ${
              selectedAnswer !== null
                ? 'bg-cyan-500 hover:bg-cyan-400 text-black arcade-btn'
                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
          >
            Submit Answer
          </button>
        )}

        {/* Decorative corners */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-500 -translate-x-1 -translate-y-1" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-500 translate-x-1 -translate-y-1" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-500 -translate-x-1 translate-y-1" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-500 translate-x-1 translate-y-1" />
      </div>
    </div>
  );
}
