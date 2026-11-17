# Arabiyya Full

Website media pembelajaran kosakata bahasa Arab untuk pemula.

## Stack
- Astro 5 + React 19
- TypeScript
- Tailwind CSS 4
- JSON sebagai sumber data
- Web Speech API (`SpeechSynthesis`) untuk Text-to-Speech
- LocalStorage untuk favorit, progres, dan riwayat kuis
- Static Site Generation (tanpa backend/database)

## Fitur
- Homepage, kategori, daftar kosakata, dan detail kata
- 12 kategori dan 120 entri kosakata
- Ilustrasi SVG lokal untuk setiap kata
- Pelafalan Arab melalui browser Text-to-Speech, tanpa file MP3
- Pencarian dan filter
- Kuis 10 soal acak dengan skor
- Favorit dan status dipelajari
- Halaman progres, materi dasar, dan tentang
- Responsive layout

## Menjalankan
Pastikan Node.js LTS terpasang.

```bash
npm install
npm run dev
```
Buka `http://localhost:4321`.

## Build
```bash
npm run build
npm run preview
```

## Audio Text-to-Speech
Arabiyya menggunakan Web Speech API melalui `window.speechSynthesis` dengan bahasa pelafalan `ar-SA`. Tidak ada file MP3 yang perlu disimpan atau diunggah.

Ketersediaan dan kualitas suara bergantung pada browser, sistem operasi, dan paket suara yang terpasang di perangkat pengguna. Jika suara Arab tidak tersedia, browser mungkin menggunakan suara default atau gagal menghasilkan pelafalan. Untuk hasil terbaik, gunakan browser dan perangkat yang menyediakan voice bahasa Arab.

TTS browser bukan rekaman penutur asli dan dapat berbeda dalam pelafalan, intonasi, serta kualitas suara.

## Gambar
Setiap kosakata memiliki ilustrasi SVG lokal di `public/images/<kategori>/<slug>.svg`. Ilustrasi prototipe menggunakan ikon/emoji sebagai representasi visual. Untuk materi publikasi, ganti dengan ilustrasi orisinal atau aset berlisensi dan pertahankan nama file/path.

## Data
Edit `src/data/categories.json` dan `src/data/vocabulary.json`.

## Deploy Vercel
1. Push repository ke GitHub.
2. Import repository di Vercel.
3. Framework preset: Astro.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Deploy. Tidak ada environment variables yang diperlukan.

## Batasan arsitektur
Ini aplikasi statis tanpa akun dan database. Favorit, progres belajar, dan riwayat kuis tersimpan di LocalStorage browser pengguna. Data tersebut tidak tersinkronisasi lintas perangkat dan tidak dikirim ke server.
