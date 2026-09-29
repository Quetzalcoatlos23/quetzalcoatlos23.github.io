# Portfolio GitHub Pages

Versi statis dan mudah diedit dari tampilan portfolio Emergent yang dikirim. Berkas HTML asal adalah salinan halaman browser, bukan source project Emergent; skrip preview, backend, dan aset eksternal tidak disertakan. Desain ini dibuat ulang untuk berjalan tanpa build, npm, atau backend.

## Struktur

- `index.html` — susunan halaman. Jangan pindahkan dari akar repository.
- `config.js` — **edit data pribadi, tautan, sertifikat, dan fokus di sini**.
- `style.css` — warna dan tampilan.
- `script.js` — mengisi halaman dari `config.js` dan mengatur menu ponsel.
- `assets/certificates/` — taruh berkas sertifikat PDF/JPG/PNG.
- `assets/documents/` — taruh CV dan cover letter PDF.
- `.nojekyll` — menjaga GitHub Pages menyajikan file statis apa adanya.

## Mengedit

1. Buka folder ini di VS Code (`File > Open Folder`). Buka `config.js`.
2. Ganti `name`, `role`, `tagline`, `intro`, `location`, `email`, `github`, dan `linkedin`.
3. Letakkan sertifikat pada `assets/certificates/`. Misalnya `CCNA1.pdf`, lalu isi `file: "assets/certificates/CCNA1.pdf"` pada slot yang tepat. Nama file harus persis sama, termasuk huruf besar/kecil.
4. Tambah atau hapus objek di `certificates` untuk mengubah jumlah kartu. Setiap objek memerlukan `title`, `description`, dan `file`. Bila `file` kosong, kartu akan menampilkan keterangan belum ditambahkan dan tidak membuka tautan rusak.
5. Jika ada CV, simpan di `assets/documents/`, lalu isi `cv: "assets/documents/NamaCV.pdf"`. Begitu pula `coverLetter`.
6. Jalankan pratinjau dengan ekstensi VS Code Live Server, atau dari folder ini jalankan `python -m http.server 8000`, lalu buka `http://localhost:8000`. Koneksi internet diperlukan untuk font Google; font cadangan tetap berfungsi tanpa internet.

**Penting:** hanya unggah berkas yang ingin dipublikasikan. GitHub Pages bersifat publik. Jangan menaruh password, API key, alamat rumah, atau dokumen pribadi. Tidak ada formulir kontak/backend di paket ini; kontak bekerja lewat tautan email.

## Upload ke repository GitHub yang sudah ada

1. Pastikan nama repository **persis** `<username>.github.io` jika ingin URL `https://<username>.github.io/`. `username` adalah username GitHub Anda, bukan nama tampilan. Jika repository sudah bernama lain, URL default-nya `https://<username>.github.io/<nama-repository>/`, atau ubah nama repository di Settings > General > Repository name.
2. Buka repository > `Add file` > `Upload files`. **Buka isi folder ini**, lalu seret `index.html`, `config.js`, `script.js`, `style.css`, folder `assets` beserta file di dalamnya, dan `.nojekyll` ke halaman upload. Pastikan `index.html` ada pada tingkat teratas repository, bukan di dalam folder `portfolio-github-pages`.
3. Klik `Commit changes` pada branch `main`.
4. Buka `Settings` > `Pages`. Pada `Build and deployment`, pilih `Deploy from a branch`, pilih branch `main`, folder `/ (root)`, lalu `Save`.
5. Tunggu deployment selesai, lalu buka URL yang tampil di Settings > Pages. Jika muncul 404, pastikan nama repository sesuai dan `index.html` ada di akar branch terpilih.

Catatan: GitHub kadang mengabaikan folder kosong saat upload. Itu tidak masalah; unggah folder `assets` saat sertifikat atau dokumen sudah ada. File `.nojekyll` tersembunyi di sebagian pengelola file, dan boleh dibuat langsung di repository bila tidak terbawa.

Untuk update berikutnya, edit `config.js` dan unggah versi barunya melalui `Add file > Upload files`, atau edit langsung di GitHub. Jika ingin source React asli beserta fungsi/backend Emergent, unduh **source project** dari Emergent; file HTML hasil simpan browser tidak memuat kode itu.
