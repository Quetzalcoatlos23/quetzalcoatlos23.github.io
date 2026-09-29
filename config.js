/* ==============================================================
   EDIT SEMUA DATA PORTFOLIO DI SINI (VS Code: buka config.js)
   Isi link dengan URL lengkap. Jika belum ada, biarkan string kosong: "".
   Sertifikat: simpan PDF/JPG/PNG di assets/certificates/ lalu isi file.
   CV dan cover letter: simpan PDF di assets/documents/ lalu isi file.
   Jangan unggah data pribadi yang tidak ingin dilihat publik.
   ============================================================== */
const PORTFOLIO = {
  name: "GEOREL JEFERSON FRANSISKUS BONAI",
  initials: "GB",
  role: "COMPUTER ENGINEERING / CYBERSECURITY / AI & MACHINE LEARNING / SYSTEM ADMINISTRATION",
  tagline: "Building reliable systems and exploring practical security.",
  intro: "Computer Engineering Fresh Graduate from Universitas Amikom Yogyakarta. I'm interested in cybersecurity, networks, system administration, and machine learning.",
  location: "Papua Tengah, Indonesia",
  email: "georelbonai@gmail.com",
  github: "https://github.com/Quetzalcoatlos23",
  linkedin: "https://www.linkedin.com/in/georel-bonai-4b25943bb",
  cv: "", // contoh: "assets/documents/CV-Georel-Bonai.pdf"
  coverLetter: "", // contoh: "assets/documents/Cover-Letter.pdf"

  // Setiap kategori menjadi baris tersendiri di halaman.
  // Tambah sertifikat di dalam items kategori yang sesuai.
  // Nama file harus sama persis dengan PDF yang diunggah, termasuk spasi dan huruf besar.
  certificateGroups: [
    {
      heading: "Cisco Networking Academy",
      note: "Networking & security",
      items: [
        { title: "CCNAv7 - Introduction to Network", description: "Cisco Networking Academy - Issued on Jan 31, 2024", file: "assets/certificates/CCNAv7 - Introduction to Network.pdf" },
        { title: "CCNAv7 - Switching, Routing, and Wireless Essentials", description: "Cisco Networking Academy - Issued on Feb 13, 2024", file: "assets/certificates/CCNAv7 - Switching, Routing, and Wireless Essentials.pdf" },
        { title: "CCNAv7 - Enterprise Networking, Security, and Automation", description: "Cisco Networking Academy - Issued on Oct 10, 2024", file: "assets/certificates/CCNAv7 - Enterprise Networking, Security, and Automation.pdf" },
        { title: "CCNAv7 - Network Security", description: "Cisco Networking Academy - Issued on Jan 12, 2026", file: "assets/certificates/CCNAv7 - Network Security.pdf" }
      ]
    },
    {
      heading: "Campus & Academic Records",
      note: "TOEFL and academic certificates",
      items: [
        { title: "TOEFL PRED: 490", description: "Amikom English Proficiency Test - 6 February 2026", file: "assets/certificates/sertifikat-toefl.pdf" },
        { title: "Kuliah Umum Mahasiswa Baru AMIKOM", description: "Universitas AMIKOM Yogyakarta - 28 May 2022", file: "assets/certificates/E-SertifikatKU Georel Jeferson Fransiskus Bonai - Kuliah Umum.pdf" },
        { title: "Peserta Seminar Digital Marketing", description: "Universitas AMIKOM Yogyakarta - 30 November 2022", file: "assets/certificates/sertifikat-seminar-digital-marketing.pdf" }
      ]
    },
  ],

  focus: [
    { title: "CYBERSECURITY", tags: ["NETWORKS", "DEFENSE"], description: "Studying network security, threat analysis, and system protection practices." },
    { title: "SYSTEM ADMINISTRATION", tags: ["LINUX", "AUTOMATION"], description: "Building and maintaining reliable infrastructure through automation and monitoring." },
    { title: "AI + MACHINE LEARNING", tags: ["PYTHON", "SCIKIT-LEARN"], description: "Developing research on phishing URL detection using Multinomial Naïve Bayes." }
  ]
};
