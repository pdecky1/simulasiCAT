
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Question } from "@/types/exam";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  selectedAnswer: number | null;
  onAnswerChange: (answer: number) => void;
  onPrevious: () => void;
  onNext: () => void;
}

const QuestionCard = ({
  question,
  questionIndex,
  totalQuestions,
  selectedAnswer,
  onAnswerChange,
  onPrevious,
  onNext,
}: QuestionCardProps) => {
  const [localAnswer, setLocalAnswer] = useState<number | null>(selectedAnswer);
  
  useEffect(() => {
    setLocalAnswer(selectedAnswer);
  }, [selectedAnswer, question.id]);

  // Type-based badge styling
  const typeBadgeStyle = useMemo(() => {
    switch (question.type) {
      case "TWK":
        return "bg-blue-100 text-blue-700";
      case "TIU":
        return "bg-green-100 text-green-700";
      case "TKP":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  }, [question.type]);

  const handleOptionChange = (value: string) => {
    const answerIndex = parseInt(value);
    setLocalAnswer(answerIndex);
    onAnswerChange(answerIndex);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-500">
          Soal {questionIndex + 1} dari {totalQuestions}
        </span>
        <span className={cn("text-xs font-medium px-2 py-1 rounded-full", typeBadgeStyle)}>
          {question.type}
        </span>
      </div>
      
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-4">{question.question}</h2>
        <Separator className="my-4" />
        
        <RadioGroup value={localAnswer?.toString()} onValueChange={handleOptionChange}>
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-center p-3 rounded-md border",
                  localAnswer === index 
                    ? "border-catpns-primary bg-catpns-lighter" 
                    : "border-gray-200 hover:border-gray-300"
                )}
              >
                <RadioGroupItem 
                  value={index.toString()} 
                  id={`option-${question.id}-${index}`} 
                  className="mr-3"
                />
                <Label 
                  htmlFor={`option-${question.id}-${index}`}
                  className="flex-1 cursor-pointer"
                >
                  {option}
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>
      
      <div className="flex justify-between items-center mt-6 space-x-4">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={questionIndex === 0}
          className="flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Sebelumnya
        </Button>
        
        <Button
          variant="default"
          onClick={onNext}
          className="bg-[#002EC1] hover:bg-[#002EC1]/80 flex items-center"
        >
          {questionIndex < totalQuestions - 1 ? (
            <>
              Selanjutnya
              <ArrowRight className="h-4 w-4 ml-2" />
            </>
          ) : (
            "Selesai"
          )}
        </Button>
      </div>
    </div>
  );
};

export default QuestionCard;
