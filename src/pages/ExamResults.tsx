
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { examTypes } from "@/data/examData";
import { ExamResult } from "@/types/exam";
import { ChevronRight, Clock, Download, FileCheck, FileX, Trophy } from "lucide-react";

const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return `${hours > 0 ? `${hours} jam ` : ""}${minutes} menit ${remainingSeconds} detik`;
};

const ExamResults = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState<ExamResult | null>(null);
  const [exam, setExam] = useState<any | null>(null);

  useEffect(() => {
    if (!examId) return;

    // Get the exam type
    const selectedExam = examTypes.find((e) => e.id === examId);
    if (!selectedExam) {
      navigate("/exam");
      return;
    }
    setExam(selectedExam);

    // Get the result from localStorage
    const allResults = JSON.parse(localStorage.getItem("examResults") || "[]");
    const examResults = allResults.filter((r: ExamResult) => r.examId === examId);
    
    if (examResults.length === 0) {
      navigate("/exam");
      return;
    }
    
    // Get the latest result
    const latestResult = examResults[examResults.length - 1];
    setResult(latestResult);
  }, [examId, navigate]);

  if (!result || !exam) {
    return (
      <Layout>
        <div className="container mx-auto py-20 px-4 text-center">
          <h1 className="text-2xl font-bold mb-4 text-[#020817]">Memuat Hasil Ujian...</h1>
        </div>
      </Layout>
    );
  }

  const twkPercentage = (result.score.TWK / 150) * 100;
  const tiuPercentage = (result.score.TIU / 175) * 100;
  const tkpPercentage = (result.score.TKP / 175) * 100;
  const totalPercentage = (result.score.total / 500) * 100;

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-2 text-[#020817]">
              Hasil Simulasi Ujian
            </h1>
            <p className="text-gray-600">{exam.title}</p>
          </div>

          {/* Result Summary Card */}
          <Card className="mb-8">
            <CardHeader className="bg-[#002EC1] text-white">
              <CardTitle>Ringkasan Hasil Ujian</CardTitle>
              <CardDescription className="text-catpns-lighter">
                Tanggal: {new Date(result.date).toLocaleDateString('id-ID', { 
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div className="flex items-center mb-4 md:mb-0">
                  {result.passed ? (
                    <div className="flex items-center text-green-600">
                      <Trophy className="h-8 w-8 mr-3" />
                      <div>
                        <p className="font-bold text-lg">Selamat!</p>
                        <p>Anda lulus simulasi ujian</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center text-red-600">
                      <FileX className="h-8 w-8 mr-3" />
                      <div>
                        <p className="font-bold text-lg">Maaf</p>
                        <p>Anda belum lulus simulasi ujian</p>
                      </div>
                    </div>
                  )}
                </div>

                <Badge 
                  className={result.passed ? "bg-green-100 text-green-800 hover:bg-green-200" : "bg-red-100 text-red-800 hover:bg-red-200"}
                >
                  Skor Total: {result.score.total}/500
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-4">Detail Skor per Bagian</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">TWK</span>
                        <span className="text-sm font-medium">{result.score.TWK}/150</span>
                      </div>
                      <Progress value={twkPercentage} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">TIU</span>
                        <span className="text-sm font-medium">{result.score.TIU}/175</span>
                      </div>
                      <Progress value={tiuPercentage} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">TKP</span>
                        <span className="text-sm font-medium">{result.score.TKP}/175</span>
                      </div>
                      <Progress value={tkpPercentage} className="h-2" />
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-bold">Total</span>
                        <span className="text-sm font-bold">{result.score.total}/500</span>
                      </div>
                      <Progress value={totalPercentage} className="h-3 bg-gray-200" 
                        indicatorColor={result.passed ? "bg-green-600" : "bg-red-600"} />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-700 mb-4">Statistik Ujian</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between p-2 bg-gray-50 rounded">
                      <span className="text-gray-600">Waktu Penyelesaian</span>
                      <span className="font-medium flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-[#020817]" />
                        {formatTime(result.timeSpentInSeconds)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between p-2 bg-gray-50 rounded">
                      <span className="text-gray-600">Total Soal</span>
                      <span className="font-medium">{exam.totalQuestions}</span>
                    </div>
                    
                    <div className="flex justify-between p-2 bg-gray-50 rounded">
                      <span className="text-gray-600">Soal Dijawab</span>
                      <span className="font-medium">{result.answers.filter(a => a.selectedOption !== -1).length}</span>
                    </div>
                    
                    <div className="flex justify-between p-2 bg-gray-50 rounded">
                      <span className="text-gray-600">Jawaban Benar</span>
                      <span className="font-medium text-green-600">
                        {result.answers.filter(a => a.correct).length}
                      </span>
                    </div>
                    
                    <div className="flex justify-between p-2 bg-gray-50 rounded">
                      <span className="text-gray-600">Jawaban Salah</span>
                      <span className="font-medium text-red-600">
                        {result.answers.filter(a => !a.correct && a.selectedOption !== -1).length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              variant="outline" 
              className="flex items-center"
              asChild
            >
              <Link to="/exam">
                <FileCheck className="h-4 w-4 mr-2" />
                Lihat Semua Ujian
              </Link>
            </Button>
            
            <Button 
              className="flex items-center bg-[#002EC1] hover:bg-[#002EC1]/80"
              asChild
            >
              <Link to={`/exam/${examId}/instructions`}>
                <ChevronRight className="h-4 w-4 mr-2" />
                Coba Lagi
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ExamResults;
