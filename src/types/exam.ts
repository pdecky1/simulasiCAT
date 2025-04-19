
export interface Question {
  id: number;
  type: "TWK" | "TIU" | "TKP";
  question: string;
  options: string[];
  correctAnswer?: number; // Index of the correct answer (for scoring)
}

export interface ExamSection {
  id: string;
  title: string;
  type: "TWK" | "TIU" | "TKP";
  description: string;
  questionCount: number;
  timeInMinutes: number;
  passingScore: number;
}

export interface ExamType {
  id: string;
  title: string;
  description: string;
  sections: ExamSection[];
  totalQuestions: number;
  totalTimeInMinutes: number;
}

export interface ExamResult {
  examId: string;
  date: string;
  score: {
    TWK: number;
    TIU: number;
    TKP: number;
    total: number;
  };
  passed: boolean;
  answers: {
    questionId: number;
    selectedOption: number;
    correct: boolean;
  }[];
  timeSpentInSeconds: number;
}
