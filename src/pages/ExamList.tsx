
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, FileText, Users, AlertTriangle } from "lucide-react";
import Layout from "@/components/Layout";
import { examTypes } from "@/data/examData";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { toast } from "sonner";

const ExamList = () => {
  const [isLoggedIn] = useLocalStorage("isLoggedIn", false);
  const [showWarning, setShowWarning] = useState(false);

  const handleStartExam = (e: React.MouseEvent, examId: string) => {
    if (!isLoggedIn) {
      e.preventDefault();
      setShowWarning(true);
      toast.error("Anda harus login untuk mengikuti ujian", {
        description: "Silakan login terlebih dahulu untuk memulai simulasi ujian"
      });
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold text-center mb-2 text-[#020817]">Simulasi Ujian CAT PNS</h1>
        <p className="text-lg text-center text-gray-600 mb-8">
          Pilih jenis simulasi ujian yang ingin Anda ikuti
        </p>

        {showWarning && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-yellow-400 mr-3 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-yellow-800">Perhatian</h3>
                <p className="mt-1 text-sm text-yellow-700">
                  Anda harus login terlebih dahulu untuk mengikuti simulasi ujian.{" "}
                  <Link to="/login" className="font-medium underline text-yellow-800 hover:text-yellow-900">
                    Login sekarang
                  </Link>
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-6 md:w-3/4 w-full mx-auto">
          {examTypes.map((exam) => (
            <Card key={exam.id} className="overflow-hidden hover:shadow-lg transition-shadow w-full md:w-2/4">
              <CardHeader className="bg-[#002EC1] text-white pb-4">
                <CardTitle className="text-xl">{exam.title}</CardTitle>
                <CardDescription className="text-catpns-lighter">
                  {exam.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-[#020817] mr-2" />
                    <span className="text-gray-700">
                      {exam.totalQuestions} Soal ({exam.sections.map(s => s.type).join(", ")})
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-[#020817] mr-2" />
                    <span className="text-gray-700">
                      {exam.totalTimeInMinutes} Menit
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-[#020817] mr-2" />
                    <span className="text-gray-700">
                      10.945 peserta simulasi
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {exam.sections.map((section) => (
                      <Badge key={section.id} variant="outline" className="bg-catpns-lighter text-[#020817]">
                        {section.title}
                      </Badge>
                    ))}
                  </div>
                  <Button 
                    asChild 
                    className="w-full mt-4 bg-[#002EC1] hover:bg-[#002EC1]/80 text-white"
                    onClick={(e) => handleStartExam(e, exam.id)}
                  >
                    <Link to={isLoggedIn ? `/exam/${exam.id}/instructions` : "/login"}>
                      Mulai Simulasi
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ExamList;
