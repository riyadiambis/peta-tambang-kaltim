// titik masuk: rakit peta, kotak, panel, pencarian, lalu muat data hasil Notebook 3
import { DATA, TAUTAN, SPACE, CONTOH_PATCH } from './config.js';
import { buatPeta, lapisPrediksi, lapisMaus, aturGaya, legendaHTML, gantiPetaDasar, sorotWilayah, warnaiSorot } from './peta.js';
import { pasangTema } from './tema.js';
import { buatKotak } from './kotak.js';
import { siapkanSel, hitung, tampilkan } from './statistik.js';
import { pasangPencarian } from './cari.js';
import { pasangHalaman } from './halaman.js';

const $ = (id) => document.getElementById(id);
const peta = buatPeta('kanvas-peta');
let sel = [];
let prediksi = null;
let maus = null;

function pesan(teks, lama = 4000) {
  const el = $('pesan');
  el.textContent = teks;
  el.hidden = false;
  clearTimeout(pesan.t);
  pesan.t = setTimeout(() => { el.hidden = true; }, lama);
}

const kotak = buatKotak(peta, (batas) => tampilkan(hitung(sel, batas)));

$('legenda').innerHTML = legendaHTML();
// di HP legenda dilipat dulu biar peta nggak ketutup
if (window.matchMedia('(max-width: 760px)').matches) $('kotak-legenda').open = false;
$('tautan').innerHTML = TAUTAN.map((t) =>
  `<a class="tombol${t.sekunder ? ' sekunder' : ''}" href="${t.url}" target="_blank" rel="noopener">${t.teks}</a>`).join('');

$('btn-tengah').addEventListener('click', () => kotak.pindahKe(peta.getCenter()));
$('btn-semua').addEventListener('click', () => { if (prediksi) kotak.set(prediksi.getBounds()); });
$('cek-prediksi').addEventListener('change', (e) => {
  if (prediksi) (e.target.checked ? prediksi.addTo(peta) : peta.removeLayer(prediksi));
});
$('cek-maus').addEventListener('change', (e) => {
  if (maus) (e.target.checked ? maus.addTo(peta) : peta.removeLayer(maus));
});
$('cek-tambang').addEventListener('change', (e) => aturGaya(prediksi, { hanyaTambang: e.target.checked }));
// sorot satu kelas di peta saat barisnya di panel disentuh
const barKelas = $('bar-kelas');
const sorot = (e) => { const r = e.target.closest('.bar-baris'); aturGaya(prediksi, { sorot: r ? +r.dataset.k : null }); };
barKelas.addEventListener('mouseover', sorot);
barKelas.addEventListener('focusin', sorot);
barKelas.addEventListener('mouseleave', () => aturGaya(prediksi, { sorot: null }));
barKelas.addEventListener('focusout', () => aturGaya(prediksi, { sorot: null }));

pasangTema($('tombol-tema'), () => warnaiSorot());

// pilihan peta dasar
document.querySelectorAll('[data-dasar]').forEach((b) => b.addEventListener('click', () => {
  gantiPetaDasar(peta, b.dataset.dasar);
  document.querySelectorAll('[data-dasar]').forEach((x) => x.classList.toggle('aktif', x === b));
}));

// koordinat kursor
peta.on('mousemove', (e) => { $('koordinat').textContent = `${e.latlng.lat.toFixed(4)}, ${e.latlng.lng.toFixed(4)}`; });

$('geser-opasitas').addEventListener('input', (e) => { aturGaya(prediksi, { opasitas: e.target.value / 100 }); $('nilai-opasitas').textContent = `${e.target.value}%`; });

pasangPencarian({
  form: $('form-cari'),
  input: $('input-cari'),
  hasil: $('hasil-cari'),
  saatPilih: (latlng) => { peta.flyTo(latlng, 13); kotak.pindahKe(latlng); },
});

async function muatJSON(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`${url}: ${r.status}`);
  return r.json();
}

async function muat() {
  try {
    const data = await muatJSON(DATA.prediksi);
    sel = siapkanSel(data);
    prediksi = lapisPrediksi(data);
    sorotWilayah(peta, prediksi.getBounds());
    prediksi.addTo(peta);
    peta.fitBounds(prediksi.getBounds(), { padding: [20, 20] });
    kotak.keDepan();
    tampilkan(hitung(sel, kotak.batas()));
  } catch (err) {
    pesan('Data prediksi belum tersedia (data/prediksi_2024.geojson).', 8000);
  } finally {
    $('memuat').hidden = true;
  }
  try {
    maus = lapisMaus(await muatJSON(DATA.maus));
    if ($('cek-maus').checked) maus.addTo(peta);
    kotak.keDepan();
  } catch (err) { /* poligon 2019 opsional */ }
}

// halaman demo: iframe baru dimuat saat halaman dibuka biar peta tetap ringan
$('tautan-space').href = SPACE.halaman;
$('daftar-unduhan').innerHTML = CONTOH_PATCH.map((c) => `<li>
  <a href="data/demo/${c.file}" download>${c.file}</a>
  <span class="${c.label === c.tebakan ? 'benar' : 'salah'}">asli ${c.label} · tebakan ${c.tebakan}</span>
</li>`).join('');

pasangHalaman((nama) => {
  if (nama === 'peta') setTimeout(() => peta.invalidateSize(), 50);
  if (nama === 'demo' && !$('bingkai-demo').src) $('bingkai-demo').src = SPACE.sematan;
});

muat();
