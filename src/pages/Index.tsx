
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "@/components/Layout";
import { ArrowRight, BookOpen, CheckCircle2, Clock, FileText, UserCheck } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { ExamResult } from "@/types/exam";
import { cn } from "@/lib/utils";

const Index = () => {
  const [isLoggedIn] = useLocalStorage("isLoggedIn", false);
  const [user] = useLocalStorage("user", null);
  const [examResults, setExamResults] = useState<ExamResult[]>([]);
  
  // Get exam results from localStorage
  useEffect(() => {
    const storedResults = JSON.parse(localStorage.getItem("examResults") || "[]");
    setExamResults(storedResults);
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center flex flex-row items-center justify-center">

          <div className="flex flex-col items-start justify-center md:w-1/2 w-full text-center md:text-start">
            <p className="text-[#002EC1]">Persiapkan diri Anda untuk seleksi CPNS, PPPK, dan Sekolah Kedinasan</p>
            <h1 className="text-7xl font-bold">Simulasi<br /><span className="text-[#002EC1]">{'{CAT PNS}'}</span></h1>
            <p className="text-lg md:w-3/4 w-full py-8">Persiapan maksimal dimulai dari latihan yang tepat — ikuti simulasi ini untuk mengasah kemampuan, mengenal pola soal, dan membiasakan diri dengan sistem CAT.</p>
            <div className="flex flex-row md:items-start items-center md:justify-start justify-center gap-4 w-full">
              <Button asChild variant="ghost" className="text-[#002EC1] hover:text-white hover:bg-[#002EC1] rounded-full border-[#002EC1] border-2 md:px-16 sm:px-4 py-4">
                <Link to="/exam">Mulai Simulasi</Link>
              </Button>
              <Button asChild variant="ghost" className="text-white hover:text-[#002EC1] hover:bg-white bg-[#002EC1] rounded-full md:px-16 sm:px-4 py-4">
                <Link to="/guide">Pelajari Panduan</Link>
              </Button>
            </div>
          </div>
          <div className="hidden md:block w-1/2">
            <img src="/images/logo/hero.png" alt="" />
          </div>  
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 flex md:flex-row flex-col items-start justify-center gap-8">
          <div className="flex flex-col items-start justify-center gap-4 w-full">
            <div className="bg-[#043A53] px-8 py-3 rounded-full mb-3">
              <h1 className="text-white">Feature</h1>
            </div>
            <h1 className="text-[#333333] text-5xl font-bold mb-3">Fitur Sistem<br/> CAT PNS</h1>
            <p className="text-[#333]">Pelajari Berbagai Komponen Penting yang Membuat Sistem CAT PNS Lebih Efisien dan Transparan</p>
          </div>
          <div className="grid md:grid-cols-3 grid-cols-1 items-start justify-center md:gap-12 gap-3">
            <div className="bg-[#F2F5F6] flex flex-col items-start p-6 rounded-lg">
                <div className="mb-4 w-12 h-12 rounded-full bg-catpns-lighter flex items-center justify-center">
                  <FileText className="h-6 w-6 text-catpns-primary" />
                </div>
                <h1 className="text-[#020817] text-3xl font-medium mb-4">Soal Sesuai Standar</h1>
                <p className="text-lg text-[#404040]">Soal simulasi kami mengacu pada kisi-kisi resmi ujian CAT PNS, meliputi TWK, TIU, dan TKP dengan tingkat kesulitan yang setara.</p>
            </div>
            <div className="bg-[#F2F5F6] flex flex-col items-start p-6 rounded-lg">
                <div className="mb-4 w-12 h-12 rounded-full bg-catpns-lighter flex items-center justify-center">
                  <Clock className="h-6 w-6 text-catpns-primary" />
                </div>
                <h1 className="text-[#020817] text-3xl font-medium mb-4">Timer & Navigasi Soal</h1>
                <p className="text-lg text-[#404040]">Dilengkapi dengan timer untuk membatasi waktu ujian dan navigasi soal yang memudahkan Anda berpindah antar soal, persis seperti ujian CAT asli.</p>
            </div>
            <div className="bg-[#F2F5F6] flex flex-col items-start p-6 rounded-lg">
                <div className="mb-4 w-12 h-12 rounded-full bg-catpns-lighter flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-catpns-primary" />
                </div>
                <h1 className="text-[#020817] text-3xl font-medium mb-4">Hasil & Analisis</h1>
                <p className="text-lg text-[#404040]">Dapatkan hasil ujian secara instan dengan analisis detail per bagian dan rekomendasi perbaikan untuk meningkatkan skor Anda.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-[#002EC1] text-white">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="w-full md:w-1/2 flex flex-col items-start justify-center gap-4 text-white">
            <h1 className="text-4xl font-medium">Dipercaya oleh Ribuan Peserta</h1>
            <p className="text-lg">Telah terbukti membantu ribuan peserta mencapai tujuan mereka—dari peningkatan skill hingga perubahan karier yang signifikan.</p>
          </div>
          <div className="w-full md:w-1/2 grid grid-cols-1 md:grid-cols-2 md:gap-8 gap-3">
            <div className="bg-white p-3 rounded-lg flex flex-row">
              <div className="bg-[#11234D] p-1 rounded-lg flex items-center justify-center mr-4">
                <div className="w-12 h-12">
                  <img src="/images/logo/pengguna.png" alt="" />
                </div>
              </div>
              <div className="flex flex-col items-start justify-center">
                <h1 className="text-[#2D2D2D] text-xl font-bold">15,000+</h1>
                <p className="text-[#2D2D2D] text-lg">Pengguna Aktif</p>
              </div>
            </div>
            <div className="bg-white p-3 rounded-lg flex flex-row">
              <div className="bg-[#11234D] p-1 rounded-lg flex items-center justify-center mr-4">
                <div className="w-12 h-12">
                  <img src="/images/logo/simulasi.png" alt="" />
                </div>
              </div>
              <div className="flex flex-col items-start justify-center">
                <h1 className="text-[#2D2D2D] text-xl font-bold">150,000+</h1>
                <p className="text-[#2D2D2D] text-lg">Simulasi Dijalankan</p>
              </div>
            </div>
            <div className="bg-white p-3 rounded-lg flex flex-row">
              <div className="bg-[#11234D] p-1 rounded-lg flex items-center justify-center mr-4">
                <div className="w-12 h-12">
                  <img src="/images/logo/soal.png" alt="" />
                </div>
              </div>
              <div className="flex flex-col items-start justify-center">
                <h1 className="text-[#2D2D2D] text-xl font-bold">3,500+</h1>
                <p className="text-[#2D2D2D] text-lg">Soal Berkualitas</p>
              </div>
            </div>
            <div className="bg-white p-3 rounded-lg flex flex-row">
              <div className="bg-[#11234D] p-1 rounded-lg flex items-center justify-center mr-4">
                <div className="w-12 h-12">
                  <img src="/images/logo/tingkatlulus.png" alt="" />
                </div>
              </div>
              <div className="flex flex-col items-start justify-center">
                <h1 className="text-[#2D2D2D] text-xl font-bold">Kelulusan</h1>
                <p className="text-[#2D2D2D] text-lg">Tingkat Kelulusan</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User Dashboard or CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {isLoggedIn && user ? (
            <div>
              <h2 className="text-4xl font-bold mb-8 text-[#333333]">
                Dashboard {user.name}
              </h2>
              
              <Tabs defaultValue="summary">
                <TabsList className="w-full grid grid-cols-2 mb-8">
                  <TabsTrigger value="summary">Ringkasan</TabsTrigger>
                  <TabsTrigger value="history">Riwayat Ujian</TabsTrigger>
                </TabsList>
                
                <TabsContent value="summary">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Profil Anda</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <dl className="space-y-2">
                          <div className="flex justify-between">
                            <dt className="text-gray-500">Nama</dt>
                            <dd className="font-medium">{user.name}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-gray-500">NIK</dt>
                            <dd className="font-medium">{user.nik || "-"}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-gray-500">Email</dt>
                            <dd className="font-medium">{user.email}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-gray-500">Username</dt>
                            <dd className="font-medium">{user.username}</dd>
                          </div>
                        </dl>
                      </CardContent>
                      <CardFooter>
                        <Button asChild variant="outline" className="w-full">
                          <Link to="/profil">Lihat Profil Lengkap</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Progres Simulasi</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {examResults.length > 0 ? (
                          <div className="space-y-4">
                            <div className="flex justify-between">
                              <span className="text-gray-500">Total Simulasi</span>
                              <span className="font-medium">{examResults.length}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Simulasi Lulus</span>
                              <span className="font-medium text-green-600">
                                {examResults.filter(r => r.passed).length}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Skor Tertinggi</span>
                              <span className="font-medium">
                                {Math.max(...examResults.map(r => r.score.total))}/500
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-4">
                            <p className="text-gray-500 mb-4">Anda belum mengikuti simulasi ujian</p>
                            <Button asChild className="bg-[#002EC1] hover:bg-[#002EC1]/80">
                              <Link to="/exam">Mulai Simulasi Sekarang</Link>
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="history">
                  {examResults.length > 0 ? (
                    <div className="space-y-4">
                      {examResults.map((result, index) => (
                        <Card key={index}>
                          <CardContent className="p-0">
                            <div className="p-4 flex flex-col md:flex-row md:items-center md:justify-between">
                              <div>
                                <h3 className="font-medium">{result.examId === "cpns-skd" ? "Seleksi Kompetensi Dasar (SKD) CPNS" : 
                                  result.examId === "pppk" ? "Seleksi PPPK (P3K)" : "Seleksi Sekolah Kedinasan"}</h3>
                                <p className="text-sm text-gray-500">
                                  {new Date(result.date).toLocaleDateString('id-ID', { 
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </p>
                              </div>
                              
                              <div className="flex items-center mt-2 md:mt-0">
                                <div className="mr-4">
                                  <span className="block text-sm text-gray-500">Skor Total</span>
                                  <span className="font-medium">{result.score.total}/500</span>
                                </div>
                                
                                <div className="mr-4">
                                  <span className={cn(
                                    "px-2 py-1 text-xs rounded-full",
                                    result.passed 
                                      ? "bg-green-100 text-green-800" 
                                      : "bg-red-100 text-red-800"
                                  )}>
                                    {result.passed ? "Lulus" : "Tidak Lulus"}
                                  </span>
                                </div>
                                
                                <Button asChild variant="outline" size="sm">
                                  <Link to={`/exam/results/${result.examId}`}>
                                    Detail
                                  </Link>
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="p-6 text-center">
                        <p className="text-gray-500 mb-4">Anda belum memiliki riwayat ujian</p>
                        <Button asChild className="bg-[#002EC1] hover:bg-[#002EC1]/80">
                          <Link to="/exam">Mulai Simulasi Sekarang</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl md:text-4xl font-bold mb-4 text-[#333333]">
                Siap untuk Persiapan CAT PNS?
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
                Daftar sekarang untuk mengakses simulasi ujian lengkap dan mulai persiapan Anda untuk seleksi CPNS, PPPK, dan Sekolah Kedinasan.
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-[#002EC1] hover:bg-[#002EC1]/80">
                  <Link to="/register">Daftar Sekarang</Link>
                </Button>
                <Button asChild size="lg" className="bg-white rounded-lg border-[#002EC1] border-2 text-[#002EC1] hover:bg-[#002EC1] hover:text-white">
                  <Link to="/login">Sudah Punya Akun? Masuk</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
      

      {/* CTA Section */}
      <section className="bg-[#043A53]">
        <div className="container mx-auto flex flex-row items-center justify-between text-center">
          <div className="w-full md:w-1/3 text-center md:text-start">
            <h1 className="text-4xl font-bold text-white mb-4">Mulai Persiapan Anda Sekarang</h1>
            <p className="text-white text-lg mb-8">Tingkatkan peluang kelulusan Anda dengan simulasi yang realistis dan panduan lengkap</p>
            <div className="flex flex-row bg-[#F0B73F] rounded-full px-4 py-5 w-fit gap-3 justify-center items-center cursor-pointer hover:bg-[#F0B73F]/80 mb-2">
              <p className="text-white font-medium text-lg">Daftar Sekarang</p>
              <div className="bg-[#CA9A35] w-7 h-7 rounded-full flex items-center justify-center ml-2">
                <img src="/images/logo/next.png" alt="" className="" />
              </div>
            </div>
              <div className="text-white/80 flex flex-row gap-4">
                <a href="/">Daftar Gratis</a>
                <a href="/">|</a>
                <a href="/">Pelajari Panduan</a>
              </div>
          </div>
          <div className="hidden md:block w-1/2">
            <img src="/images/logo/dec.png" alt="" />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
