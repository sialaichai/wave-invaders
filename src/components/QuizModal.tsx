import { useState } from 'react';
import type { Question } from '@/types/game';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';

interface QuizModalProps {
  question: Question;
  onAnswer: (answer: string) => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({ question, onAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [numericalAnswer, setNumericalAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const handleSubmit = () => {
    const answer = question.type === 'mcq' ? selectedAnswer : numericalAnswer;
    
    if (!answer) return;
    
    const correct = question.type === 'calculation' 
      ? Math.abs(parseFloat(answer) - parseFloat(question.correctAnswer)) <= (question.tolerance || 0)
      : answer === question.correctAnswer;
    
    setIsCorrect(correct);
    setShowResult(true);
    
    setTimeout(() => {
      onAnswer(answer);
    }, 2000);
  };

  const formatNumber = (num: string) => {
    const n = parseFloat(num);
    if (n >= 1000) return n.toExponential(2);
    if (n < 0.001 && n > 0) return n.toExponential(2);
    return parseFloat(num).toFixed(3).replace(/\.?0+$/, '');
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl bg-slate-900 border-cyan-500/50">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-cyan-400 flex items-center justify-center gap-2">
            <HelpCircle className="w-6 h-6" />
            Physics Challenge!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {!showResult ? (
            <>
              <div className="text-lg text-white leading-relaxed">
                {question.question}
              </div>
              
              {question.type === 'mcq' && question.options && (
                <div className="grid grid-cols-1 gap-3">
                  {question.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedAnswer(option)}
                      className={`p-4 rounded-lg text-left transition-all ${
                        selectedAnswer === option
                          ? 'bg-cyan-600 text-white border-2 border-cyan-400'
                          : 'bg-slate-800 text-slate-200 border-2 border-slate-700 hover:border-cyan-500/50'
                      }`}
                    >
                      <span className="font-bold mr-2">{String.fromCharCode(65 + index)}.</span>
                      {option}
                    </button>
                  ))}
                </div>
              )}
              
              {question.type === 'calculation' && (
                <div className="space-y-4">
                  <label className="text-slate-300 block">
                    Enter your answer (numerical value):
                  </label>
                  <Input
                    type="number"
                    step="any"
                    value={numericalAnswer}
                    onChange={(e) => setNumericalAnswer(e.target.value)}
                    placeholder="Type your answer..."
                    className="bg-slate-800 border-slate-600 text-white text-lg py-6"
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                  />
                  <p className="text-sm text-slate-400">
                    Tip: Small numerical variations are accepted. Use scientific notation if needed (e.g., 2.5e-6)
                  </p>
                </div>
              )}
              
              <Button
                onClick={handleSubmit}
                disabled={question.type === 'mcq' ? !selectedAnswer : !numericalAnswer}
                className="w-full py-6 text-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500"
              >
                Submit Answer
              </Button>
            </>
          ) : (
            <div className="text-center space-y-4 py-4">
              {isCorrect ? (
                <>
                  <CheckCircle className="w-20 h-20 text-green-500 mx-auto animate-bounce" />
                  <h3 className="text-3xl font-bold text-green-400">Correct! +100 Points</h3>
                </>
              ) : (
                <>
                  <XCircle className="w-20 h-20 text-red-500 mx-auto" />
                  <h3 className="text-3xl font-bold text-red-400">Incorrect! -25 Points</h3>
                </>
              )}
              
              <div className="bg-slate-800 p-4 rounded-lg text-left">
                <p className="text-slate-300 mb-2">
                  <span className="font-bold text-cyan-400">Correct Answer:</span>{' '}
                  {question.type === 'calculation' 
                    ? formatNumber(question.correctAnswer)
                    : question.correctAnswer}
                </p>
                <p className="text-slate-400 text-sm">
                  <span className="font-bold">Explanation:</span> {question.explanation}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
