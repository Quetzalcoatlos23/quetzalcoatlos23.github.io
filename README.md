# Portfolio GitHub Pages

Versi statis yang mengikuti desain portfolio Emergent: tipografi, tata letak, warna, dan animasi scan pada bingkai portrait. Berkas HTML asal adalah salinan halaman browser, bukan source project Emergent; skrip preview, backend, dan foto aslinya tidak disertakan. Paket ini berjalan tanpa build, npm, atau backend.

## Struktur

- `index.html` — susunan halaman. Jangan pindahkan dari akar repository.
- `config.js` — **edit data pribadi, tautan, kategori sertifikat, dan fokus di sini**.
- `style.css` — warna dan tampilan.
- `script.js` — mengisi halaman dari `config.js` dan mengatur menu ponsel.
- `assets/certificates/` — taruh berkas sertifikat PDF/JPG/PNG.
- `assets/documents/` — taruh CV dan cover letter PDF.
- `assets/cyber-portrait.svg` — gambar sementara yang menampilkan animasi scan di atasnya.
- `.nojekyll` — menjaga GitHub Pages menyajikan file statis apa adanya.

## Mengedit

1. Buka folder ini di VS Code (`File > Open Folder`). Buka `config.js`.
2. Ganti `name`, `role`, `tagline`, `intro`, `location`, `email`, `github`, dan `linkedin`.
3. Sertifikat dipisah menjadi tiga kategori di `certificateGroups`: **Cisco Networking Academy**, **Kampus & Bahasa**, dan **Seminar & Pelatihan**. Letakkan PDF di `assets/certificates/`, kemudian isi `file: "assets/certificates/Nama File.pdf"` pada item kategori yang sesuai. Nama file harus persis sama, termasuk spasi dan huruf besar/kecil.
4. Dalam setiap item sertifikat, isi `title`, `description`, `year`, `certificateNumber`, `keywords`, dan `file`. Contoh: `certificateNumber: "12345"`, `year: "2026"`, `keywords: ["OSPFV2", "SDN", "NETWORK AUTOMATION"]`. **Isi nomor berdasarkan sertifikat asli Anda.** Bila nomor belum diketahui, biarkan `""`; kartu menampilkan tahun sebagai penggantinya. Daftar keyword CCNA yang ada saat ini adalah contoh materi, silakan sesuaikan dengan isi sertifikat.
5. Bila `preview: ""`, kartu mencoba menampilkan halaman pertama PDF langsung melalui penampil PDF bawaan browser. Untuk hasil thumbnail yang konsisten pada semua perangkat, simpan gambar halaman pertama sebagai JPG/PNG di folder yang sama dan isi misalnya `preview: "assets/certificates/CCNA3.jpg"`. Tombol VIEW PDF dan tampilan besar tetap memakai PDF pada `file`. Pada beberapa browser ponsel, PDF di dalam halaman mungkin tidak tampil; tombol **OPEN FULL PDF** membukanya langsung.
6. Tambah atau hapus objek pada `items` dalam kategori terkait untuk mengubah jumlah kartu. Anda juga dapat menambah objek kategori baru dengan `heading`, `note`, dan `items`. Bila `file` kosong, kartu menampilkan slot kosong. Empat nama PDF Cisco sudah tercantum dalam konfigurasi, tetapi **PDF-nya belum ada dalam paket**; unggah berkas yang sesuai agar pratinjau dan tautannya bekerja.
7. Jika ada CV, simpan di `assets/documents/`, lalu isi `cv: "assets/documents/NamaCV.pdf"`. Begitu pula `coverLetter`.
   Untuk memakai foto sendiri, taruh `foto-saya.jpg` di `assets/`, lalu isi `portrait: "assets/foto-saya.jpg"`. Animasi scan tetap berjalan di atas foto. `heroFirst` dan `heroLast` mengatur dua baris nama besar; `name` tetap berisi nama lengkap.
8. Jalankan pratinjau dengan ekstensi VS Code Live Server, atau dari folder ini jalankan `python -m http.server 8000`, lalu buka `http://localhost:8000`. Koneksi internet diperlukan untuk font Google; font cadangan tetap berfungsi tanpa internet. Coba klik pratinjau, tombol VIEW PDF, dan OPEN FULL PDF setelah berkas ditambahkan.

Jika bagian sertifikat dan fokus sama-sama kosong, kemungkinan `config.js` tidak dapat dibaca atau `script.js` dan `config.js` berasal dari versi berbeda. Unggah keduanya dari paket yang sama, lalu periksa apakah `config.js` masih memakai `certificateGroups` dan tidak mengandung format Markdown seperti `[teks](url)` atau entitas HTML `&#x20;`. URL di JavaScript ditulis langsung dalam tanda kutip.

**Penting:** hanya unggah berkas yang ingin dipublikasikan. GitHub Pages bersifat publik. Jangan menaruh password, API key, alamat rumah, atau dokumen pribadi. Tidak ada formulir kontak/backend di paket ini; kontak bekerja lewat tautan email.

## Upload ke repository GitHub yang sudah ada

1. Pastikan nama repository **persis** `<username>.github.io` jika ingin URL `https://<username>.github.io/`. `username` adalah username GitHub Anda, bukan nama tampilan. Jika repository sudah bernama lain, URL default-nya `https://<username>.github.io/<nama-repository>/`, atau ubah nama repository di Settings > General > Repository name.
2. Buka repository > `Add file` > `Upload files`. **Buka isi folder ini**, lalu seret `index.html`, `config.js`, `script.js`, `style.css`, folder `assets` beserta file di dalamnya, dan `.nojekyll` ke halaman upload. Pastikan `index.html` ada pada tingkat teratas repository, bukan di dalam folder `portfolio-github-pages`.
3. Klik `Commit changes` pada branch `main`.
4. Buka `Settings` > `Pages`. Pada `Build and deployment`, pilih `Deploy from a branch`, pilih branch `main`, folder `/ (root)`, lalu `Save`.
5. Tunggu deployment selesai, lalu buka URL yang tampil di Settings > Pages. Jika muncul 404, pastikan nama repository sesuai dan `index.html` ada di akar branch terpilih.

Catatan: GitHub kadang mengabaikan folder kosong saat upload. Itu tidak masalah; unggah folder `assets` saat sertifikat atau dokumen sudah ada. File `.nojekyll` tersembunyi di sebagian pengelola file, dan boleh dibuat langsung di repository bila tidak terbawa.

Untuk update berikutnya, edit `config.js` dan unggah versi barunya melalui `Add file > Upload files`, atau edit langsung di GitHub. Jika ingin source React asli beserta fungsi/backend Emergent, unduh **source project** dari Emergent; file HTML hasil simpan browser tidak memuat kode itu.
