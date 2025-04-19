
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, FileText, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ExamResult } from "@/types/exam";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { cn } from "@/lib/utils";

const ExamHistory = () => {
  const navigate = useNavigate();
  const [isLoggedIn] = useLocalStorage("isLoggedIn", false);
  const [examResults, setExamResults] = useState<ExamResult[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);
  
  // Get exam results from localStorage
  useEffect(() => {
    const storedResults = JSON.parse(localStorage.getItem("examResults") || "[]");
    setExamResults(storedResults);
  }, []);

  const getExamTitle = (examId: string) => {
    switch (examId) {
      case "cpns-skd":
        return "Seleksi Kompetensi Dasar (SKD) CPNS";
      case "pppk":
        return "Seleksi PPPK (P3K)";
      case "sekolah-kedinasan":
        return "Seleksi Sekolah Kedinasan";
      default:
        return examId;
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    return hours > 0 
      ? `${hours} jam ${minutes} menit` 
      : `${minutes} menit`;
  };

  const filteredResults = examResults.filter(result => 
    getExamTitle(result.examId).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-2xl font-bold mb-2 text-[#020817]">Riwayat Ujian</h1>
        <p className="text-gray-600 mb-6">
          Lihat hasil dan analisis dari simulasi ujian yang telah Anda ikuti
        </p>

        <div className="container mx-auto">
          {/* Search and summary */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Cari riwayat ujian..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex space-x-4">
              <div className="text-sm">
                <span className="text-gray-500">Total Ujian:</span>{" "}
                <span className="font-medium">{examResults.length}</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-500">Lulus:</span>{" "}
                <span className="font-medium text-green-600">
                  {examResults.filter(r => r.passed).length}
                </span>
              </div>
              <div className="text-sm">
                <span className="text-gray-500">Tidak Lulus:</span>{" "}
                <span className="font-medium text-red-600">
                  {examResults.filter(r => !r.passed).length}
                </span>
              </div>
            </div>
          </div>

          {filteredResults.length > 0 ? (
            <div className="space-y-4">
              {filteredResults.map((result, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <div className="p-4">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                          <h3 className="font-medium text-lg">{getExamTitle(result.examId)}</h3>
                          
                          <div className="flex flex-wrap gap-2 mt-2">
                            <div className="text-sm flex items-center text-gray-500">
                              <Calendar className="h-4 w-4 mr-1" />
                              {new Date(result.date).toLocaleDateString('id-ID', { 
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                              })}
                            </div>
                            
                            <div className="text-sm flex items-center text-gray-500">
                              <Clock className="h-4 w-4 mr-1" />
                              {formatTime(result.timeSpentInSeconds)}
                            </div>
                            
                            <Badge className={cn(
                              "ml-auto md:ml-0",
                              result.passed 
                                ? "bg-green-100 text-green-800 hover:bg-green-200" 
                                : "bg-red-100 text-red-800 hover:bg-red-200"
                            )}>
                              {result.passed ? "Lulus" : "Tidak Lulus"}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="mt-4 md:mt-0 flex md:flex-col items-center justify-between">
                          <div className="text-center">
                            <div className="text-sm text-gray-500">Skor Total</div>
                            <div className="font-bold text-lg">{result.score.total}/500</div>
                          </div>
                          
                          <Button 
                            asChild 
                            className="bg-[#002EC1] hover:bg-[#002EC1]/80 ml-4 md:ml-0 md:mt-2"
                            size="sm"
                          >
                            <Link to={`/exam/results/${result.examId}`}>
                              <FileText className="h-4 w-4 mr-2" />
                              Detail Hasil
                            </Link>
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 mt-4">
                        <div className="p-2 bg-blue-50 rounded">
                          <div className="text-xs text-blue-600">TWK</div>
                          <div className="font-medium">{result.score.TWK}/150</div>
                        </div>
                        <div className="p-2 bg-green-50 rounded">
                          <div className="text-xs text-green-600">TIU</div>
                          <div className="font-medium">{result.score.TIU}/175</div>
                        </div>
                        <div className="p-2 bg-purple-50 rounded">
                          <div className="text-xs text-purple-600">TKP</div>
                          <div className="font-medium">{result.score.TKP}/175</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Tidak Ada Riwayat Ujian</CardTitle>
                <CardDescription>
                  {searchTerm 
                    ? `Tidak ditemukan hasil ujian dengan kata kunci "${searchTerm}"`
                    : "Anda belum mengikuti simulasi ujian apapun"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  {searchTerm ? (
                    <Button 
                      variant="outline" 
                      onClick={() => setSearchTerm("")}
                    >
                      Hapus Pencarian
                    </Button>
                  ) : (
                    <Button 
                      asChild
                      className="bg-catpns-primary hover:bg-catpns-secondary"
                    >
                      <Link to="/exam">Mulai Simulasi Sekarang</Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ExamHistory;
