"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface QuestionNavigationProps {
  totalQuestions: number;
  currentQuestion: number;
  answeredQuestions: Set<number>;
  onNavigate: (questionIndex: number) => void;
  onFinish: () => void;
}

const QUESTIONS_PER_PAGE = 50;

const QuestionNavigation = ({
  totalQuestions,
  currentQuestion,
  answeredQuestions,
  onNavigate,
  onFinish,
}: QuestionNavigationProps) => {
  const totalPages = Math.ceil(totalQuestions / QUESTIONS_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(0);

  const startIndex = currentPage * QUESTIONS_PER_PAGE;
  const endIndex = Math.min(startIndex + QUESTIONS_PER_PAGE, totalQuestions);

  const allAnswered = answeredQuestions.size === totalQuestions;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="font-semibold text-gray-700 mb-3">Navigasi Soal</h3>

      <div className="grid grid-cols-5 gap-2 mb-4">
        {Array.from({ length: endIndex - startIndex }, (_, i) => {
          const questionIndex = startIndex + i;
          return (
            <Button
              key={questionIndex}
              variant="outline"
              size="sm"
              className={cn(
                "h-9 w-9 p-0 font-medium",
                currentQuestion === questionIndex && "border-2 border-catpns-primary",
                answeredQuestions.has(questionIndex) && "bg-catpns-lighter text-catpns-primary"
              )}
              onClick={() => onNavigate(questionIndex)}
            >
              {questionIndex + 1}
            </Button>
          );
        })}
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-3">
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full bg-catpns-lighter border border-catpns-primary mr-1"></div>
            <span className="text-xs">Terjawab</span>
          </div>
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full bg-white border border-gray-300 mr-1"></div>
            <span className="text-xs">Belum Terjawab</span>
          </div>
        </div>

        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 0}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Back
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages - 1}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      </div>

      <div className="flex justify-end mt-2">
        <Button
          variant="default"
          size="sm"
          className={cn(
            "bg-[#002EC1] hover:bg-[#002EC1]/80",
            !allAnswered && "opacity-50"
          )}
          onClick={onFinish}
        >
          Selesai Ujian
        </Button>
      </div>
    </div>
  );
};

export default QuestionNavigation;
