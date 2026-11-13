# Peta Tambang Kaltim 2024

Web peta prediksi tutupan lahan (tambang, sawit, hutan, permukiman) area Samarinda hingga Loa Kulu dari citra Sentinel-2 tahun 2024. Prediksi dibuat oleh custom CNN hasil Proyek Akhir Praktikum Kecerdasan Buatan (akurasi test 92,3% pada data 2019-2020).

## Halaman
- **Peta & Hasil**: peta prediksi 2024, kotak analisis, kandidat tambang baru, lapisan
- **Demo Model**: Hugging Face Space tertanam + contoh patch `.npy` untuk diunduh
- **Tentang**: alur kerja, arsitektur model, hasil per kelas, sumber data, keterbatasan

Tersedia mode gelap dan mode terang (tombol di kanan atas).

## Fitur peta
- Pencarian lokasi (Nominatim OpenStreetMap)
- Kotak analisis yang bisa digeser dan diubah ukurannya, dengan persentase dan luas tiap kelas
- Kandidat tambang baru: sel tambang 2024 di luar poligon tambang 2019 (Maus dkk.)
- Lapisan poligon tambang 2019, filter hanya tambang, dan pengatur transparansi

## Struktur
```
index.html
css/style.css
js/config.js      pengaturan kelas, warna, sumber data, tautan
js/peta.js        peta dasar dan lapisan
js/kotak.js       kotak analisis (geser dan ubah ukuran)
js/statistik.js   hitung persen dan luas di dalam kotak
js/cari.js        pencarian lokasi
js/halaman.js     navigasi 3 halaman (#peta, #demo, #tentang)
js/tema.js        mode gelap / terang
js/main.js        titik masuk
data/             prediksi_2024.geojson dan tambang_maus_2019.geojson (dari Notebook 3)
data/demo/        contoh patch .npy untuk demo model
assets/           ikon
```

## Menjalankan di laptop
Buka folder ini di VS Code lalu jalankan dengan ekstensi Live Server (data GeoJSON tidak bisa dibaca dari `file://`).

## Catatan
- Peta 2024 belum memiliki label pembanding, sehingga hasilnya bersifat indikatif.
- Model hanya mengenal 4 kelas, sehingga lahan lain dapat tertebak sebagai sawit. Badan air dimasker memakai ESA WorldCover.
- Citra latar: Esri World Imagery. Data label latih: poligon tambang Maus dkk. 2022, ESA WorldCover, BIOPAMA Global Oil Palm.

Rahmat Riyadi, Informatika Universitas Mulawarman.
