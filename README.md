# Arabiyya Full

Website media pembelajaran kosakata bahasa Arab untuk pemula.

## Stack
- Astro 5 + React 19
- TypeScript
- Tailwind CSS 4
- JSON sebagai sumber data
- LocalStorage untuk favorit, progres, dan riwayat kuis
- Static Site Generation (tanpa backend/database)

## Fitur
- Homepage, kategori, daftar kosakata, detail kata
- 12 kategori dan 120 entri kosakata
- Ilustrasi SVG lokal untuk setiap kata
- Audio player: MP3 jika disediakan, fallback SpeechSynthesis browser
- Pencarian dan filter
- Kuis 10 soal acak dengan skor
- Favorit dan status dipelajari
- Halaman progres, materi dasar, dan tentang
- Responsive layout

## Persyaratan
Node.js LTS (disarankan Node 20 atau lebih baru).

## Menjalankan
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

## Audio penutur asli
File audio rekaman belum disertakan dalam paket ini. Untuk memakai audio penutur asli, rekam dan verifikasi tiap kata, lalu simpan MP3 pada path yang sudah ditentukan di `src/data/vocabulary.json`, misalnya:
`public/audio/family/family-01.mp3`.
Komponen akan memutar MP3 tersebut. Jika file belum tersedia, browser mencoba SpeechSynthesis dengan locale `ar-SA`; suara sintetis bukan audio native dan bergantung pada perangkat.

## Gambar
Setiap kosakata memiliki ilustrasi SVG lokal di `public/images/<kategori>/<slug>.svg`. Ilustrasi prototipe menggunakan ikon/emoji sebagai representasi visual. Untuk materi publikasi, ganti dengan ilustrasi orisinal atau aset berlisensi dan pertahankan nama file/path.

## Data
Edit:
- `src/data/categories.json`
- `src/data/vocabulary.json`

Jaga konsistensi `id`, `slug`, `category`, `image`, dan `audio`.

## Deploy Vercel
1. Push repository ke GitHub.
2. Import repository di Vercel.
3. Framework preset: Astro.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Deploy. Tidak ada environment variables yang diperlukan.

## Batasan arsitektur
Ini aplikasi statis lengkap untuk kebutuhan tanpa akun dan database. LocalStorage hanya tersimpan pada browser/perangkat yang digunakan. Tidak ada sinkronisasi lintas perangkat, admin panel server, atau data pengguna terpusat.
