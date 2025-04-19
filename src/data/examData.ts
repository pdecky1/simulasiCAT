
import { ExamType, Question } from "@/types/exam";

export const examTypes: ExamType[] = [
  {
    id: "cpns-skd",
    title: "Seleksi Kompetensi Dasar (SKD) CPNS",
    description: "Ujian seleksi calon pegawai negeri sipil yang mengukur kompetensi dasar",
    sections: [
      {
        id: "twk",
        title: "Tes Wawasan Kebangsaan (TWK)",
        type: "TWK",
        description: "Mengukur pengetahuan tentang Pancasila, UUD 1945, Bhineka Tunggal Ika, dan NKRI",
        questionCount: 30,
        timeInMinutes: 30,
        passingScore: 65,
      },
      {
        id: "tiu",
        title: "Tes Intelegensi Umum (TIU)",
        type: "TIU",
        description: "Mengukur kemampuan verbal, numerik, dan figural",
        questionCount: 35,
        timeInMinutes: 30,
        passingScore: 80,
      },
      {
        id: "tkp",
        title: "Tes Karakteristik Pribadi (TKP)",
        type: "TKP",
        description: "Mengukur karakteristik pribadi untuk pelayanan publik",
        questionCount: 35,
        timeInMinutes: 30,
        passingScore: 119,
      },
    ],
    totalQuestions: 100,
    totalTimeInMinutes: 90,
  },
  {
    id: "sekolah-kedinasan",
    title: "Seleksi Sekolah Kedinasan",
    description: "Ujian seleksi masuk sekolah kedinasan",
    sections: [
      {
        id: "twk-kedinasan",
        title: "Tes Wawasan Kebangsaan (TWK)",
        type: "TWK",
        description: "Mengukur wawasan kebangsaan dan pengetahuan umum",
        questionCount: 30,
        timeInMinutes: 30,
        passingScore: 70,
      },
      {
        id: "tiu-kedinasan",
        title: "Tes Intelegensi Umum (TIU)",
        type: "TIU",
        description: "Mengukur kemampuan kognitif dan penalaran",
        questionCount: 30,
        timeInMinutes: 30,
        passingScore: 70,
      },
      {
        id: "tkp-kedinasan",
        title: "Tes Karakteristik Pribadi (TKP)",
        type: "TKP",
        description: "Mengukur sikap dan perilaku",
        questionCount: 40,
        timeInMinutes: 30,
        passingScore: 126,
      },
    ],
    totalQuestions: 100,
    totalTimeInMinutes: 90,
  },
];

// Sample questions for the TWK section
export const sampleQuestions: Question[] = [
  {
    "id": 1,
    "type": "TWK",
    "question": "Siapakah yang pertama kali merumuskan konsep Pancasila dalam pidatonya di BPUPKI?",
    "options": [
      "Ir. Soekarno",
      "Mohammad Hatta",
      "Sutan Sjahrir",
      "Soepomo",
      "Mohammad Yamin"
    ],
    "correctAnswer": 0
  },
  {
    "id": 2,
    "type": "TWK",
    "question": "Sila keempat Pancasila mengajarkan kita untuk:",
    "options": [
      "Mendahulukan kepentingan pribadi",
      "Mengutamakan musyawarah dalam mengambil keputusan",
      "Menjunjung tinggi kekuasaan",
      "Menolak perbedaan pendapat",
      "Mengabaikan suara minoritas"
    ],
    "correctAnswer": 1
  },
  {
    "id": 3,
    "type": "TWK",
    "question": "Lambang sila kedua Pancasila adalah:",
    "options": [
      "Bintang",
      "Pohon Beringin",
      "Rantai Emas",
      "Kepala Banteng",
      "Padi dan Kapas"
    ],
    "correctAnswer": 2
  },
  {
    "id": 4,
    "type": "TWK",
    "question": "UUD 1945 disahkan oleh PPKI pada tanggal:",
    "options": [
      "16 Agustus 1945",
      "17 Agustus 1945",
      "18 Agustus 1945",
      "19 Agustus 1945",
      "20 Agustus 1945"
    ],
    "correctAnswer": 2
  },
  {
    "id": 5,
    "type": "TWK",
    "question": "Badan yang bertugas menyelidiki usaha-usaha persiapan kemerdekaan Indonesia adalah:",
    "options": [
      "PPKI",
      "BPUPKI",
      "KNIP",
      "MPRS",
      "DPR"
    ],
    "correctAnswer": 1
  },
  {
    "id": 6,
    "type": "TIU",
    "question": "Jika x - 5 = 10, maka nilai x adalah:",
    "options": [
      "10",
      "15",
      "5",
      "20",
      "25"
    ],
    "correctAnswer": 1
  },
  {
    "id": 7,
    "type": "TIU",
    "question": "PENULIS : BUKU = PETANI : ...",
    "options": [
      "Padi",
      "Cangkul",
      "Lahan",
      "Pupuk",
      "Air"
    ],
    "correctAnswer": 0
  },
  {
    "id": 8,
    "type": "TIU",
    "question": "Jika 25% dari sebuah bilangan adalah 50, maka bilangan tersebut adalah:",
    "options": [
      "100",
      "150",
      "200",
      "250",
      "300"
    ],
    "correctAnswer": 2
  },
  {
    "id": 9,
    "type": "TIU",
    "question": "Deret berikut: 2, 4, 8, 16, ... Bilangan selanjutnya adalah:",
    "options": [
      "18",
      "20",
      "24",
      "30",
      "32"
    ],
    "correctAnswer": 4
  },
  {
    "id": 10,
    "type": "TIU",
    "question": "Antonim dari kata 'SOMBONG' adalah:",
    "options": [
      "Rendah hati",
      "Pemalu",
      "Penuh percaya diri",
      "Angkuh",
      "Berani"
    ],
    "correctAnswer": 0
  },
  {
    "id": 11,
    "type": "TKP",
    "question": "Jika Anda melihat rekan kerja mengalami kesulitan, maka Anda akan:",
    "options": [
      "Mengabaikannya karena bukan urusan Anda",
      "Menunggu dia meminta bantuan",
      "Langsung menolong tanpa diminta",
      "Memberi tahu atasan",
      "Menyuruh orang lain untuk membantu"
    ],
    "correctAnswer": 2
  },
  {
    "id": 12,
    "type": "TKP",
    "question": "Saat atasan memuji hasil kerja tim Anda, sikap yang tepat adalah:",
    "options": [
      "Merasa paling berjasa",
      "Berterima kasih atas nama tim",
      "Mengabaikannya",
      "Mengkritik rekan yang tidak bekerja maksimal",
      "Mengambil semua kredit untuk diri sendiri"
    ],
    "correctAnswer": 1
  },
  {
    "id": 13,
    "type": "TKP",
    "question": "Jika ada perbedaan pendapat dalam tim, maka Anda akan:",
    "options": [
      "Membiarkan saja agar selesai sendiri",
      "Memaksakan pendapat Anda",
      "Mencari titik temu yang disepakati bersama",
      "Menghindari diskusi",
      "Mendukung pendapat yang paling populer"
    ],
    "correctAnswer": 2
  },
  {
    "id": 14,
    "type": "TKP",
    "question": "Ketika Anda dituduh melakukan kesalahan yang tidak Anda lakukan, maka sikap terbaik adalah:",
    "options": [
      "Langsung marah",
      "Membela diri dengan bukti yang jelas",
      "Mengabaikan tuduhan tersebut",
      "Menuduh balik",
      "Meminta orang lain membela Anda"
    ],
    "correctAnswer": 1
  },
  {
    "id": 15,
    "type": "TKP",
    "question": "Anda menghadapi pelanggan yang kecewa dan marah, sikap terbaik Anda adalah:",
    "options": [
      "Meminta pelanggan untuk tenang",
      "Langsung menolak melayani",
      "Mendengarkan keluhan dengan empati",
      "Menunjukkan bahwa dia salah",
      "Membantah semua yang dikatakan"
    ],
    "correctAnswer": 2
  }
]


// Generate more questions for demo purposes
export const generateQuestions = (type: "TWK" | "TIU" | "TKP", count: number, startId: number = 1): Question[] => {
  const baseQuestions = sampleQuestions.filter(q => q.type === type);
  const result: Question[] = [];
  
  for (let i = 0; i < count; i++) {
    const baseQuestion = baseQuestions[i % baseQuestions.length];
    result.push({
      ...baseQuestion,
      id: startId + i,
      question: `${baseQuestion.question} (Soal #${i + 1})`,
    });
  }
  
  return result;
};
