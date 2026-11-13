// pengaturan umum: kelas, warna, ukuran sel, sumber data, tautan
export const KELAS = [
  { nama: 'Tambang', warna: '#F0563E' },
  { nama: 'Sawit', warna: '#F2B83A' },
  { nama: 'Hutan', warna: '#2BB673' },
  { nama: 'Permukiman', warna: '#9AA4B2' },
];
export const KELAS_AIR = 4;            // sel air dari masker ESA WorldCover
export const KELAS_KOSONG = -1;        // sel tertutup awan
export const WARNA_AIR = '#3B7DD8';
export const WARNA_BARU = '#FFFFFF';   // garis tepi kandidat tambang baru
export const LUAS_SEL = 0.4096;        // km2, 640 m x 640 m
export const OPASITAS_AWAL = 0.35;
export const KELAS_AWAL = [0];         // kelas yang tampil saat pertama dibuka (tambang)

export const DATA = {
  prediksi: 'data/prediksi_2024.geojson',
  maus: 'data/tambang_maus_2019.geojson',
};

export const PETA_AWAL = { pusat: [-0.55, 117.05], zoom: 11 };
export const KOTAK_AWAL = [[-0.62, 116.98], [-0.48, 117.12]];

export const SPACE = {
  halaman: 'https://huggingface.co/spaces/riyadichan/deteksi-tambang-kaltim',
  sematan: 'https://riyadichan-deteksi-tambang-kaltim.hf.space',
};

export const CONTOH_PATCH = [
  { file: 'demo_1_Tambang.npy', label: 'Tambang', tebakan: 'Tambang' },
  { file: 'demo_2_Sawit.npy', label: 'Sawit', tebakan: 'Sawit' },
  { file: 'demo_3_Hutan.npy', label: 'Hutan', tebakan: 'Hutan' },
  { file: 'demo_4_Permukiman.npy', label: 'Permukiman', tebakan: 'Tambang' },
  { file: 'demo_5_Tambang.npy', label: 'Tambang', tebakan: 'Permukiman' },
];

export const TAUTAN = [
  { teks: 'Notebook 1', url: 'https://www.kaggle.com/code/riyadiofishrau/notebook-1-pengumpulan-dan-pelabelan-data', sekunder: true },
  { teks: 'Notebook 2', url: 'https://www.kaggle.com/code/riyadiofishrau/notebook-2-eda-prep-pem-eva', sekunder: true },
  { teks: 'Notebook 3', url: 'https://www.kaggle.com/code/riyadiofishrau/notebook-3-peta-prediksi-2024-ipynb', sekunder: true },
  { teks: 'Hugging Face Space', url: 'https://huggingface.co/spaces/riyadichan/deteksi-tambang-kaltim' },
];
