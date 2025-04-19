
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Clock, FileText, Info, AlertTriangle, ChevronRight } from "lucide-react";
import Layout from "@/components/Layout";
import { examTypes } from "@/data/examData";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";

const ExamInstructions = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);

  const exam = examTypes.find((et) => et.id === examId);

  if (!exam) {
    return (
      <Layout>
        <div className="container mx-auto py-20 px-4 text-center">
          <h1 className="text-2xl font-bold mb-4 text-[#020817]">Ujian Tidak Ditemukan</h1>
          <p className="mb-6">Maaf, ujian yang Anda cari tidak ditemukan.</p>
          <Button asChild className="bg-catpns-primary hover:bg-catpns-secondary">
            <a href="/exam">Kembali ke Daftar Ujian</a>
          </Button>
        </div>
      </Layout>
    );
  }

  const startExam = () => {
    navigate(`/exam/${examId}/simulation`);
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-[#020817]">
          {exam.title}
        </h1>
        <p className="text-base md:text-lg text-center text-gray-600 mb-8">
          Petunjuk Simulasi Ujian
        </p>

        <div className="conteiner mx-auto flex flex-col md:flex-row justify-center items-start gap-3">
          <Card className="rounded-md w-full md:w-2/4">
            <CardHeader className="bg-[#002EC1] text-white">
              <CardTitle className="text-xl">
                <Info className="h-5 w-5 inline mr-2" />
                Informasi Ujian
              </CardTitle>
              <CardDescription className="text-catpns-lighter">
                Detail simulasi ujian yang akan Anda ikuti
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Durasi Ujian</h3>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-5 w-5 text-[#020817] mr-2" />
                    <span>{exam.totalTimeInMinutes} Menit</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Jumlah Soal</h3>
                  <div className="flex items-center text-gray-600">
                    <FileText className="h-5 w-5 text-[#020817] mr-2" />
                    <span>{exam.totalQuestions} Soal</span>
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              <h3 className="font-semibold text-gray-700 mb-2">Bagian Ujian</h3>
              <div className="space-y-3">
                {exam.sections.map((section) => (
                  <div key={section.id} className="p-3 bg-catpns-lighter rounded-md">
                    <div className="font-medium text-[#020817]">{section.title}</div>
                    <div className="text-sm text-gray-700">{section.description}</div>
                    <div className="mt-1 flex flex-wrap gap-4 text-xs text-gray-600">
                      <span className="flex items-center">
                        <FileText className="h-3 w-3 mr-1" /> {section.questionCount} Soal
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" /> {section.timeInMinutes} Menit
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <div className="flex flex-col gap-4">
            <Card className="rounded-md w-full">
              <CardHeader className="bg-[#002EC1] text-white">
                <CardTitle className="text-xl">
                  <AlertTriangle className="h-5 w-5 inline mr-2" />
                  Petunjuk Pengerjaan
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                    <span>Pastikan koneksi internet Anda stabil selama ujian berlangsung.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                    <span>Jangan merefresh atau menutup halaman ujian untuk mencegah kehilangan jawaban.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                    <span>Ujian akan otomatis diakhiri ketika waktu habis.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                    <span>Anda dapat menggunakan navigasi soal untuk berpindah antar soal.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                    <span>Pastikan Anda telah menjawab semua soal sebelum menyelesaikan ujian.</span>
                  </li>
                </ul>

                <Alert className="mt-6 border-yellow-300 bg-yellow-50">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <AlertTitle className="text-yellow-800">Perhatian</AlertTitle>
                  <AlertDescription className="text-yellow-700">
                    Sistem akan otomatis menyimpan jawaban Anda secara berkala. Namun, sebaiknya tetap selesaikan ujian dengan menekan tombol "Selesai Ujian" untuk memastikan semua jawaban terekam.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-2 mb-4">
                  <Checkbox 
                    id="terms" 
                    checked={agreed} 
                    onCheckedChange={(checked) => setAgreed(checked as boolean)} 
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm leading-normal"
                  >
                    Saya telah membaca dan memahami petunjuk pengerjaan ujian, dan siap untuk memulai simulasi ujian.
                  </label>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button
                  onClick={startExam}
                  disabled={!agreed}
                  className="bg-[#002EC1] hover:bg-[#002EC1]/80 text-white"
                >
                  Mulai Ujian Sekarang <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
          
        </div>
      </div>
    </Layout>
  );
};

export default ExamInstructions;
