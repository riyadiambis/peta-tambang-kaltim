# Panduan untuk AI Agent (Antigravity / Claude / Gemini)

Baca file ini dulu sebelum mengubah kode.

## Proyek
Web statis peta prediksi tutupan lahan 2024 area Samarinda hingga Loa Kulu (Kalimantan Timur), hasil custom CNN Proyek Akhir Praktikum Kecerdasan Buatan. Fokus utama: menemukan **kandidat bukaan tambang baru** (sel tambang 2024 di luar poligon tambang 2019 Maus dkk.).
- Online: https://riyadiambis.github.io/peta-tambang-kaltim/
- Deploy: GitHub Pages dari branch `main`, folder root. Setiap `git push` otomatis terbit (1-2 menit).
- Pemilik: Rahmat Riyadi (Informatika Unmul).

## Aturan teknis
- **Tanpa build step, tanpa framework, tanpa npm.** HTML + CSS + JavaScript ES module murni. Library luar hanya Leaflet 1.9.4 dari unpkg dan font Google (Inter, JetBrains Mono).
- Jalankan lokal dengan VS Code Live Server (GeoJSON tidak bisa dibaca dari `file://`).
- Navigasi 3 halaman lewat hash: `#peta`, `#demo`, `#tentang` (lihat `js/halaman.js`). Jangan pakai id elemen yang sama dengan nama hash (dulu `id="peta"` bikin halaman melompat, sekarang peta memakai `id="kanvas-peta"`).
- Ukuran wadah peta bisa berubah, jadi setelah mengubah tata letak pastikan `peta.invalidateSize()` tetap terpanggil (sudah ada ResizeObserver di `js/main.js`).
- Semua teks antarmuka berbahasa Indonesia. Jangan pakai em dash (—).
- Nama variabel dan fungsi berbahasa Indonesia mengikuti gaya yang sudah ada (`muat`, `tampilkan`, `hitung`, `sel`, `kotak`).

## Struktur
```
index.html          3 halaman (peta, demo, tentang) dalam satu file
css/style.css       token warna di :root (mode gelap) dan :root[data-tema="terang"] (krem ke putih)
js/config.js        kelas, warna, sumber data, tautan, opasitas dan kelas awal
js/peta.js          peta dasar (Esri satelit / CARTO gelap), lapisan prediksi, gaya sel, popup, sorot wilayah
js/kotak.js         kotak analisis opsional (geser, ubah ukuran, dijepit di area data)
js/statistik.js     hitung persen/luas di kotak + ringkasan seluruh wilayah
js/klaster.js       kelompokkan sel kandidat baru jadi lokasi + nama desa (Nominatim reverse, 1 req/detik)
js/cari.js          pencarian lokasi (Nominatim)
js/halaman.js       navigasi hash
js/tema.js          mode gelap/terang, disimpan di localStorage (dibungkus try/catch)
js/main.js          titik masuk, merakit semuanya
data/               hasil Notebook 3 (Kaggle) + data/demo/*.npy untuk halaman Demo
```

## Format data
`data/prediksi_2024.geojson`: 4.900 Polygon (sel 640 m x 640 m, UTM 50S lalu diubah ke lon/lat).
- `k`: kelas. 0 Tambang, 1 Sawit, 2 Hutan, 3 Permukiman, 4 Air (dimasker ESA WorldCover), -1 tidak ada data (awan).
- `p`: array 4 peluang softmax [tambang, sawit, hutan, permukiman].
- `b`: 1 jika kandidat tambang baru (k = 0 dan pusat sel di luar poligon 2019). Tidak ada jika bukan.

`data/tambang_maus_2019.geojson`: 153 poligon tambang 2019 (Maus dkk. 2022) di area studi.

Jangan mengubah file data secara manual. Data dibuat ulang dari Notebook 3 di Kaggle (`riyadiofishrau/notebook-3-peta-prediksi-2024-ipynb`).

## Fakta yang boleh ditampilkan (sudah diverifikasi dari notebook)
- Akurasi test model 92,3% (108 dari 117 patch), baseline 88,9%. Model terbaik: Flatten, lr 0,0005, dropout 0,5.
- F1: tambang 0,95, sawit 0,93, hutan 0,93, permukiman 0,77 (test permukiman hanya 7 patch).
- Peta 2024: tambang 398 sel, sawit 2.430, hutan 1.625, permukiman 315, air 132; 279 sel kandidat tambang baru.
- Peta 2024 belum punya label pembanding, jadi selalu sebut sebagai indikatif.
- Validasi silang dengan ESA WorldCover 2021 (angka dari pemilik proyek, dipakai di tabel halaman Tentang):

  | Prediksi | Padanan WorldCover | Hasil 2021 | Kesesuaian |
  |---|---|---|---|
  | Sawit | Pohon | Pohon 97,8% | Tinggi |
  | Hutan | Pohon | Pohon 80,2% | Tinggi |
  | Permukiman | Lahan terbangun | Terbangun 54,0%, Pohon 34,3% | Sedang |
  | Tambang | Lahan terbuka | Terbuka 21,1%, Pohon 62,3% | Rendah |

  Dari 279 sel indikasi tambang baru: 186 sel masih pohon pada 2021, 45 terbuka, 38 air (total 269, jadi 10 sel tidak tercantum rincian kelasnya). Artinya banyak indikasi tambang baru kemungkinan salah, jadi selalu perlu verifikasi visual.
- Properti `w` (kode kelas WorldCover) belum ada di `data/prediksi_2024.geojson`. Kode badge per lokasi sudah disiapkan di `js/klaster.js` dan `js/main.js`, badge baru tampil jika data punya `w`.

## Ide pengembangan berikutnya
1. Analisis per kecamatan (batas GADM) sebagai pengganti kotak bebas.
2. Slider perbandingan citra 2019 vs 2024 di lokasi kandidat.
3. Ekspor daftar lokasi kandidat ke CSV.
4. Tambah kelas "lainnya" dan "air" di model (perlu latih ulang di Kaggle).

## Alur kerja Git
```
git pull
# ubah kode, cek dengan Live Server
git add -A
git commit -m "pesan singkat"
git push
```
