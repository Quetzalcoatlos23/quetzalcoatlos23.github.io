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
  heroFirst: "GEOREL", // Dua baris besar pada bagian awal halaman
  heroLast: "BONAI",
  portrait: "assets/Studio Photo.png", // Ganti dengan "assets/foto-saya.jpg" setelah mengunggah foto
  role: "COMPUTER ENGINEERING / CYBERSECURITY / AI & MACHINE LEARNING / SYSTEM ADMINISTRATION",
  tagline: "Building reliable systems and exploring practical security.",
  intro: "Computer Engineering Fresh Graduate from Universitas Amikom Yogyakarta. I'm interested in cybersecurity, networks, system administration, and machine learning.",
  location: "Papua Tengah, Indonesia",
  email: "georelbonai@gmail.com",
  github: "https://github.com/Quetzalcoatlos23",
  linkedin: "https://www.linkedin.com/in/georel-bonai-4b25943bb",
  cv: "assets/documents/Curiculum Vitae ATS (English).pdf", // contoh: "assets/documents/CV-Georel-Bonai.pdf"
  coverLetter: "", // contoh: "assets/documents/Cover-Letter.pdf"

  // Setiap kategori menjadi baris tersendiri di halaman.
  // Tambah sertifikat di dalam items kategori yang sesuai.
  // Isi certificateNumber dengan nomor yang benar pada sertifikat Anda; jangan menebak.
  // preview dapat berisi JPG/PNG halaman pertama untuk thumbnail cepat dan rapi.
  // Jika preview kosong, browser mencoba menampilkan halaman pertama langsung dari PDF.
  // Nama file harus sama persis dengan PDF yang diunggah, termasuk spasi dan huruf besar.
  certificateGroups: [
    {
      heading: "Cisco Networking Academy",
      note: "Networking & security",
      items: [
        { title: "CCNAv7 - Introduction to Network", description: "Cisco Networking Academy - Issued on Jan 31, 2024", year: "2024", certificateNumber: "", keywords: ["NETWORK FUNDAMENTALS", "IP ADDRESSING", "ETHERNET"], file: "assets/certificates/CCNAv7 - Introduction to Networks.pdf", preview: "" },
        { title: "CCNAv7 - Switching, Routing, and Wireless Essentials", description: "Cisco Networking Academy - Issued on Feb 13, 2024", year: "2024", certificateNumber: "", keywords: ["VLAN", "ROUTING", "WIRELESS"], file: "assets/certificates/CCNAv7 - Switching, Routing, and Wireless Essentials.pdf", preview: "" },
        { title: "CCNAv7 - Enterprise Networking, Security, and Automation", description: "Cisco Networking Academy - Issued on Oct 10, 2024", year: "2024", certificateNumber: "", keywords: ["OSPFV2", "SDN", "NETWORK AUTOMATION"], file: "assets/certificates/CCNAv7 - Enterprise Networking, Security, and Automation.pdf", preview: "" },
        { title: "CCNAv7 - Network Security", description: "Cisco Networking Academy - Issued on Jan 12, 2026", year: "2026", certificateNumber: "", keywords: ["CISCO ASA", "IPSEC VPN", "AAA / ACL"], file: "assets/certificates/CCNAv7 - Network Security.pdf", preview: "" }
      ]
    },
    {
      heading: "Language & Academic Certificates",
      note: "TOEFL and academic certificates",
      items: [
        { title: "TOEFL PRED: 490", description: "Amikom English Proficiency Test - Issued on Feb 6, 2026", year: "2026", certificateNumber: "#AEPT022609153", keywords: ["TOEFL PRED 490", "Upper Intermediate", "English Proficiency"], file: "assets/certificates/Sertifikat TOEFL.pdf", preview: "" }
      ]
    },
    {
      heading: "Seminars & Training",
      note: "Activities participated in",
      items: [
        { title: "Kuliah Umum Daring Mahasiswa Baru", description: "As a Participant in Online Public Lecture for New Students: AMIKOM Creative Economy Park - Building Positive Energy in Online Classes - Issued May 28, 2022", year: "2022", certificateNumber: "No: 0649.S/A.DKUI/AMIKOM/V/2022", keywords: ["ONLINE LECTURE", "NEW STUDENTS", "CREATIVE ECONOMY"], file: "assets/certificates/E-SertifikatKU Georel Jeferson Fransiskus Bonai - Kuliah Umum.pdf", preview: "" },
        { title: "Digital Marketing Seminars", description: "As a Participant in Digital Marketing Seminar: \"Creating Marketing Content Is Easy\" - Issued Nov 30, 2022", year: "2022", certificateNumber: "No: 213/KMHS/AMIKOM/XI/2022", keywords: ["DIGITAL MARKETING", "CONTENT MARKETING"], file: "assets/certificates/E Sertifikat Georel Jeferson Fransiskus Bonai - Seminar Bikin Konten itu Mudah.pdf", preview: "" }
        // Contoh: ,{ title: "Seminar Jaringan", description: "Penyelenggara - 2026", year: "2026", certificateNumber: "ABC-123", keywords: ["NETWORKING"], file: "assets/certificates/seminar.pdf", preview: "assets/certificates/seminar.jpg" }
      ]
    }
  ],

  focus: [
    { title: "CYBERSECURITY", tags: ["NETWORKS", "DEFENSE"], description: "Studying network security, threat analysis, and system protection practices." },
    { title: "SYSTEM ADMINISTRATION", tags: ["LINUX", "AUTOMATION"], description: "Building and maintaining reliable infrastructure through automation and monitoring." },
    { title: "AI + MACHINE LEARNING", tags: ["PYTHON", "SCIKIT-LEARN"], description: "Developing research on phishing URL detection using Multinomial Naïve Bayes." }
  ]
};
