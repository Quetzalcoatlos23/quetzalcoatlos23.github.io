# Memperbarui website GitHub Pages

Paket ini berisi foto asli Anda, PDF sertifikat, gambar pratinjau sertifikat, CV, dan kode website. Nama file yang dipakai website sekarang lebih sederhana dan semua path sudah disesuaikan.

1. Ekstrak ZIP ini di komputer.
2. Buka repository `Quetzalcoatlos23/quetzalcoatlos23.github.io`.
3. Pilih **Add file > Upload files**.
4. Buka folder hasil ekstrak, lalu seret **seluruh isinya**, termasuk folder `assets`, `index.html`, `config.js`, `script.js`, dan `style.css` ke halaman upload. Jangan unggah ZIP saja, dan jangan unggah folder pembungkusnya.
5. Pastikan daftar upload memuat `assets/profile-photo.png`, `assets/certificates/toefl.jpg`, `assets/certificates/toefl.pdf`, serta file seminar dan CCNA.
6. Commit ke `main`, tunggu deployment Pages selesai, lalu buka situs dengan **Ctrl+F5**.

Berkas lama boleh tetap ada; kode baru hanya memakai path yang ada di config.js terbaru. Jangan menimpa config.js terbaru dengan salinan lama karena nama aset sudah diubah.

## Pemeriksaan langsung setelah upload

Buka tautan berikut. Jika salah satunya 404, berkas tersebut belum tersedia di deployment yang sedang dibuka:

- Foto: https://quetzalcoatlos23.github.io/assets/profile-photo.png
- Pratinjau TOEFL: https://quetzalcoatlos23.github.io/assets/certificates/toefl.jpg
- PDF TOEFL: https://quetzalcoatlos23.github.io/assets/certificates/toefl.pdf
- Seminar: https://quetzalcoatlos23.github.io/assets/certificates/seminar-digital-marketing.jpg

Jika file langsung bisa dibuka tetapi website masih memakai data lama, periksa bahwa deployment terbaru selesai dan config.js di repository sudah berasal dari paket ini. File index.html terbaru juga memiliki penanda versi untuk memuat ulang CSS dan JavaScript.
