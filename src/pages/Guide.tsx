
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "@/components/Layout";
import { CheckCircle2, FileText, HelpCircle, Lightbulb, Timer } from "lucide-react";

const Guide = () => {
  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#020817] mb-2">Panduan Simulasi CAT PNS</h1>
          <p className="text-lg text-gray-600">
            Penjelasan menyeluruh mengenai sistem CAT untuk seleksi PNS serta tips persiapan yang efektif.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="overview">Pendahuluan</TabsTrigger>
              <TabsTrigger value="exam-tips">Tips Ujian</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="prose max-w-none">
                    <h2 className="text-xl font-semibold text-[#020817] flex items-center">
                      <FileText className="h-5 w-5 mr-2" />
                      Tentang CAT PNS
                    </h2>
                    <p>
                      Computer Assisted Test (CAT) merupakan metode seleksi berbasis komputer yang diterapkan oleh Badan Kepegawaian Negara (BKN) dalam perekrutan Aparatur Sipil Negara (ASN). Penggunaan sistem ini bertujuan untuk memperkuat transparansi, meningkatkan akuntabilitas, serta mempercepat efisiensi dalam pelaksanaan seleksi.                    
                    </p>
                    <h3 className="text-lg font-semibold text-[#020817] mt-6">Jenis Seleksi yang Menggunakan CAT</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>CPNS (Calon Pegawai Negeri Sipil)</strong></li>
                      <li><strong>PPPK (Pegawai Pemerintah dengan Perjanjian Kerja)</strong></li>
                      <li><strong>Sekolah Kedinasan</strong></li>
                      <li><strong>Ujian Dinas/Penyesuaian Ijazah</strong></li>
                    </ul>

                    <h3 className="text-lg font-semibold text-[#020817] mt-6">Komponen Ujian SKD CPNS</h3>
                    <div className="flex flex-col">
                      <div className="flex flex-col">
                        <h4 className="font-medium text-[#020817]"><strong>TWK:</strong> <span className="font-normal">Tes Wawasan Kebangsaan mengukur pengetahuan tentang Pancasila, UUD 1945, NKRI, dan Bhinneka Tunggal Ika.</span></h4>
                      </div>
                      <div className="flex flex-col">
                        <h4 className="font-medium text-[#020817]"><strong>TIU:</strong> <span className="font-normal">Tes Intelegensi Umum mengukur kemampuan verbal, numerik, dan reasoning atau logika.</span></h4>
                      </div>
                      <div className="flex flex-col">
                        <h4 className="font-medium text-[#020817]"><strong>TKP:</strong> <span className="font-normal">Tes Karakteristik Pribadi mengukur karakteristik pribadi untuk pelayanan publik.</span></h4>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-[#020817] mt-6">Keunggulan Sistem CAT</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Transparansi:</strong> Hasil ujian dapat dilihat secara langsung.</li>
                      <li><strong>Efisiensi:</strong> Mempercepat proses koreksi dan pengumuman hasil.</li>
                      <li><strong>Akuntabilitas:</strong> Meminimalisir intervensi manusia dalam proses seleksi.</li>
                      <li><strong>Keamanan:</strong> Soal diacak untuk setiap peserta, meminimalisir kecurangan.</li>
                      <li><strong>Ramah Lingkungan:</strong> Mengurangi penggunaan kertas.</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="exam-tips" className="mt-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="prose max-w-none">
                    <h2 className="text-xl font-semibold text-[#020817] flex items-center">
                      <Lightbulb className="h-5 w-5 mr-2" />
                      Tips Menghadapi Ujian CAT PNS
                    </h2>

                    <div className="mt-4 space-y-6">
                      <div className="flex space-x-4">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-catpns-lighter text-white flex items-center justify-center">
                          <CheckCircle2 className="h-5 w-5 text-catpns-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">Persiapan Sebelum Ujian</h3>
                          <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li>Pelajari materi ujian secara rutin dan terstruktur</li>
                            <li>Berlatih dengan berbagai contoh soal CAT</li>
                            <li>Ikuti try out atau simulasi ujian CAT</li>
                            <li>Istirahat cukup sebelum hari ujian</li>
                            <li>Siapkan dokumen yang diperlukan (KTP, kartu peserta)</li>
                          </ul>
                        </div>
                      </div>

                      <div className="flex space-x-4">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-catpns-lighter text-white flex items-center justify-center">
                          <Timer className="h-5 w-5 text-catpns-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">Manajemen Waktu</h3>
                          <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li>Alokasikan waktu untuk setiap bagian ujian</li>
                            <li>Jangan terpaku pada soal yang sulit, lanjutkan ke soal berikutnya</li>
                            <li>Tandai soal yang belum terjawab untuk dikerjakan nanti</li>
                            <li>Sisakan waktu untuk memeriksa kembali jawaban</li>
                          </ul>
                        </div>
                      </div>

                      <div className="flex space-x-4">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-catpns-lighter text-white flex items-center justify-center">
                          <FileText className="h-5 w-5 text-catpns-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">Strategi Menjawab Soal</h3>
                          <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li><strong>TWK:</strong> Fokus pada pemahaman dasar tentang Pancasila, UUD 1945, dan sejarah Indonesia</li>
                            <li><strong>TIU:</strong> Latih kemampuan logika dan penalaran, perbanyak latihan soal matematika dasar</li>
                            <li><strong>TKP:</strong> Pahami karakteristik yang diharapkan dari ASN, pilih jawaban yang paling positif</li>
                          </ul>
                        </div>
                      </div>

                      <div className="flex space-x-4">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-catpns-lighter text-white flex items-center justify-center">
                          <HelpCircle className="h-5 w-5 text-catpns-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">Kiat Khusus untuk TKP</h3>
                          <p className="mt-2">
                            Bagian TKP sering menjadi penentu kelulusan karena bobot nilainya yang tinggi. Berikut kiatnya:
                          </p>
                          <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li>Pilih jawaban yang menunjukkan sikap positif dan proaktif</li>
                            <li>Hindari jawaban yang ekstrim (terlalu pasif atau terlalu agresif)</li>
                            <li>Prioritaskan kepentingan organisasi di atas kepentingan pribadi</li>
                            <li>Pahami pola penilaian: 5-4-3-2-1 untuk setiap opsi jawaban</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Guide;
