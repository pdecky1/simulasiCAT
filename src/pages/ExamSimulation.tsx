
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import QuestionCard from "@/components/exam/QuestionCard";
import QuestionNavigation from "@/components/exam/QuestionNavigation";
import ExamTimer from "@/components/exam/ExamTimer";
import { examTypes, generateQuestions } from "@/data/examData";
import { Question, ExamType } from "@/types/exam";
import { toast } from "sonner";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const ExamSimulation = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [user] = useLocalStorage("user", null);

  const [exam, setExam] = useState<ExamType | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [timeSpent, setTimeSpent] = useState(0);
  const [examStartTime, setExamStartTime] = useState<Date | null>(null);
  
  const [confirmFinishOpen, setConfirmFinishOpen] = useState(false);
  const [timeUpDialogOpen, setTimeUpDialogOpen] = useState(false);
  const [confirmLeaveOpen, setConfirmLeaveOpen] = useState(false);
  
  // Load exam data and initialize
  useEffect(() => {
    const selectedExam = examTypes.find((e) => e.id === examId);
    
    if (!selectedExam) {
      toast.error("Ujian tidak ditemukan");
      navigate("/exam");
      return;
    }
    
    setExam(selectedExam);
    
    // Generate questions for each section
    let allQuestions: Question[] = [];
    let startId = 1;
    
    for (const section of selectedExam.sections) {
      const sectionQuestions = generateQuestions(
        section.type,
        section.questionCount,
        startId
      );
      allQuestions = [...allQuestions, ...sectionQuestions];
      startId += section.questionCount;
    }
    
    // Initialize empty answers array
    const initialAnswers = new Array(allQuestions.length).fill(null);
    
    setQuestions(allQuestions);
    setAnswers(initialAnswers);
    setExamStartTime(new Date());
  }, [examId, navigate]);

  // Handle page leave/refresh
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // Update time spent
  useEffect(() => {
    if (!examStartTime) return;
    
    const interval = setInterval(() => {
      const elapsedSeconds = Math.floor(
        (new Date().getTime() - examStartTime.getTime()) / 1000
      );
      setTimeSpent(elapsedSeconds);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [examStartTime]);

  if (!exam || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-[#020817] mb-2">Memuat Ujian...</h2>
          <p className="text-gray-600">Mohon tunggu sebentar</p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerChange = (answer: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);
    
    // Update answered questions set
    const newAnsweredQuestions = new Set(answeredQuestions);
    newAnsweredQuestions.add(currentQuestionIndex);
    setAnsweredQuestions(newAnsweredQuestions);
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleFinishExam();
    }
  };

  const handleNavigateToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const handleFinishExam = () => {
    // Check if all questions are answered
    if (answeredQuestions.size < questions.length) {
      setConfirmFinishOpen(true);
    } else {
      submitExam();
    }
  };

  const handleAutoAnswerAll = () => {
    const allAnswers = questions.map(q => q.correctAnswer);
    setAnswers(allAnswers);
    setAnsweredQuestions(new Set(questions.map((_, index) => index)));
    toast.success("Semua soal telah dijawab dengan benar secara otomatis.");
  };

  const handleTimeUp = () => {
    setTimeUpDialogOpen(true);
  };

  const submitExam = () => {
    // Calculate scores
    let twkScore = 0;
    let tiuScore = 0;
    let tkpScore = 0;
    
    const results = questions.map((q, index) => {
      const selectedOption = answers[index];
      const isCorrect = selectedOption === q.correctAnswer;
      
      // Update section scores
      if (isCorrect) {
        if (q.type === "TWK") twkScore += 5;
        if (q.type === "TIU") tiuScore += 5;
        if (q.type === "TKP") tkpScore += 5;
      }
      
      return {
        questionId: q.id,
        selectedOption: selectedOption ?? -1,
        correct: isCorrect,
      };
    });
    
    const totalScore = twkScore + tiuScore + tkpScore;
    
    // Save results
    const examResult = {
      examId: exam.id,
      date: new Date().toISOString(),
      score: {
        TWK: twkScore,
        TIU: tiuScore,
        TKP: tkpScore,
        total: totalScore
      },
      passed: totalScore >= 280, // Example threshold
      answers: results,
      timeSpentInSeconds: timeSpent
    };
    
    // Store result in localStorage
    const existingResults = JSON.parse(localStorage.getItem("examResults") || "[]");
    localStorage.setItem("examResults", JSON.stringify([...existingResults, examResult]));
    
    // Navigate to results page
    navigate(`/exam/results/${exam.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm py-3 px-4 fixed top-0 left-0 right-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <div>
              <h1 className="text-base font-semibold text-[#020817]">{exam.title}</h1>
              <p className="text-xs text-gray-500">
                Peserta: {user?.name || "Peserta Ujian"}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <ExamTimer 
                totalSeconds={exam.totalTimeInMinutes * 60} 
                onTimeUp={handleTimeUp} 
              />
            </div>
            {/* <Button
              variant="outline"
              size="sm"
              onClick={handleAutoAnswerAll}
              className="text-green-600 hover:text-green-700 hover:bg-green-50"
            >
              Jawab Semua Otomatis
            </Button> */}
            <Button 
              variant="outline"
              size="sm"
              onClick={() => setConfirmLeaveOpen(true)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              Keluar
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Timer (Only visible on small screens) */}
      <div className="md:hidden fixed top-16 left-0 right-0 z-10 bg-white shadow-sm py-2 px-4">
        <ExamTimer 
          totalSeconds={exam.totalTimeInMinutes * 60} 
          onTimeUp={handleTimeUp} 
        />
      </div>
      
      {/* Main Content */}
      <main className="container mx-auto pt-24 md:pt-20 pb-10 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Question Card */}
          <div className="lg:col-span-2">
            <QuestionCard
              question={currentQuestion}
              questionIndex={currentQuestionIndex}
              totalQuestions={questions.length}
              selectedAnswer={answers[currentQuestionIndex]}
              onAnswerChange={handleAnswerChange}
              onPrevious={handlePreviousQuestion}
              onNext={handleNextQuestion}
            />
          </div>
          
          {/* Navigation Panel */}
          <div className="order-first lg:order-last">
            <QuestionNavigation
              totalQuestions={questions.length}
              currentQuestion={currentQuestionIndex}
              answeredQuestions={answeredQuestions}
              onNavigate={handleNavigateToQuestion}
              onFinish={handleFinishExam}
            />
          </div>
        </div>
      </main>
      
      {/* Confirm Finish Dialog */}
      <Dialog open={confirmFinishOpen} onOpenChange={setConfirmFinishOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi Selesai Ujian</DialogTitle>
            <DialogDescription>
              Anda masih memiliki {questions.length - answeredQuestions.size} soal yang belum dijawab. Apakah Anda yakin ingin menyelesaikan ujian?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setConfirmFinishOpen(false)}
            >
              Kembali ke Ujian
            </Button>
            <Button 
              className="bg-catpns-primary hover:bg-catpns-secondary"
              onClick={submitExam}
            >
              Ya, Selesaikan Ujian
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Time Up Dialog */}
      <Dialog open={timeUpDialogOpen} onOpenChange={setTimeUpDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Waktu Habis!</DialogTitle>
            <DialogDescription>
              Batas waktu ujian telah habis. Sistem akan mengumpulkan jawaban Anda secara otomatis.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              className="bg-catpns-primary hover:bg-catpns-secondary w-full"
              onClick={submitExam}
            >
              Lihat Hasil
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Confirm Leave Dialog */}
      <Dialog open={confirmLeaveOpen} onOpenChange={setConfirmLeaveOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi Keluar</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin keluar dari ujian? Seluruh jawaban Anda akan hilang.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setConfirmLeaveOpen(false)}
            >
              Batal
            </Button>
            <Button 
              variant="destructive"
              onClick={() => navigate("/")}
            >
              Keluar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExamSimulation;
