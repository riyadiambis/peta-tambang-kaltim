// titik masuk: rakit peta, panel, pencarian, halaman, lalu muat data hasil Notebook 3
import { DATA, TAUTAN, SPACE, CONTOH_PATCH, KELAS, KELAS_AWAL, OPASITAS_AWAL } from './config.js';
import { buatPeta, lapisPrediksi, lapisMaus, aturGaya, legendaHTML, gantiPetaDasar, sorotWilayah, warnaiSorot } from './peta.js';
import { buatKotak } from './kotak.js';
import { siapkanSel, hitung, tampilkan, tampilkanTotal } from './statistik.js';
import { buatKlaster, isiNama } from './klaster.js';
import { pasangPencarian } from './cari.js';
import { pasangHalaman } from './halaman.js';
import { pasangTema } from './tema.js';

const $ = (id) => document.getElementById(id);
const peta = buatPeta('kanvas-peta');
// ukuran wadah peta bisa berubah (ganti halaman, layar diputar), jadi Leaflet perlu dikabari
// peta dikunci ke area data: batas = bounds GeoJSON prediksi + 15%, zoom out paling jauh = seluruh kotak
let boundsData = null;
let batasKunci = null;
function kunciPeta() {
  if (!boundsData) return;
  const ukuran = peta.getSize();
  if (!ukuran.x || !ukuran.y) return;   // halaman peta sedang disembunyikan
  batasKunci = boundsData.pad(0.15);
  peta.setMaxBounds(batasKunci);
  peta.setMinZoom(peta.getBoundsZoom(batasKunci));
}
new ResizeObserver(() => { peta.invalidateSize(); kunciPeta(); }).observe($('kanvas-peta'));

let sel = [];
let prediksi = null;
let maus = null;
let klaster = [];
const tampil = new Set(KELAS_AWAL);

function pesan(teks, lama = 4000) {
  const el = $('pesan');
  el.textContent = teks;
  el.hidden = false;
  clearTimeout(pesan.t);
  pesan.t = setTimeout(() => { el.hidden = true; }, lama);
}

// ---------- kotak analisis (opsional) ----------
const kotak = buatKotak(peta, (batas) => tampilkan(hitung(sel, batas)));
$('cek-kotak').addEventListener('change', (e) => {
  $('isi-kotak').hidden = !e.target.checked;
  kotak.tampilkan(e.target.checked);
  if (e.target.checked) kotak.pindahKe(peta.getCenter());
});
$('btn-tengah').addEventListener('click', () => kotak.pindahKe(peta.getCenter()));

// sorot satu kelas di peta saat barisnya di panel disentuh
const barKelas = $('bar-kelas');
const sorot = (e) => { const r = e.target.closest('.bar-baris'); aturGaya(prediksi, { sorot: r ? +r.dataset.k : null }); };
barKelas.addEventListener('mouseover', sorot);
barKelas.addEventListener('focusin', sorot);
barKelas.addEventListener('mouseleave', () => aturGaya(prediksi, { sorot: null }));
barKelas.addEventListener('focusout', () => aturGaya(prediksi, { sorot: null }));

// ---------- lapisan ----------
$('chip-kelas').innerHTML = KELAS.map((c, i) =>
  `<button type="button" class="chip${tampil.has(i) ? ' aktif' : ''}" data-k="${i}" aria-pressed="${tampil.has(i)}">
    <i style="background:${c.warna}"></i>${c.nama}</button>`).join('');
$('chip-kelas').addEventListener('click', (e) => {
  const b = e.target.closest('.chip');
  if (!b) return;
  const k = +b.dataset.k;
  if (tampil.has(k)) tampil.delete(k); else tampil.add(k);
  b.classList.toggle('aktif', tampil.has(k));
  b.setAttribute('aria-pressed', tampil.has(k));
  aturGaya(prediksi, { tampil });
});
$('cek-baru').addEventListener('change', (e) => aturGaya(prediksi, { baru: e.target.checked }));
$('cek-maus').addEventListener('change', (e) => {
  if (maus) (e.target.checked ? maus.addTo(peta) : peta.removeLayer(maus));
});
$('geser-opasitas').addEventListener('input', (e) => {
  aturGaya(prediksi, { opasitas: e.target.value / 100 });
  $('nilai-opasitas').textContent = `${e.target.value}%`;
});
$('geser-opasitas').value = OPASITAS_AWAL * 100;

$('legenda').innerHTML = legendaHTML();
// di HP legenda dilipat dulu biar peta nggak ketutup
if (window.matchMedia('(max-width: 768px)').matches) $('kotak-legenda').open = false;

// di HP panel analisis jadi bottom sheet yang bisa dibuka dan ditutup
function aturSheet(buka) {
  $('pegangan-sheet').closest('.panel').classList.toggle('terbuka', buka);
  $('pegangan-sheet').setAttribute('aria-expanded', buka);
}
$('pegangan-sheet').addEventListener('click', () => aturSheet(!$('pegangan-sheet').closest('.panel').classList.contains('terbuka')));

pasangTema($('tombol-tema'), () => warnaiSorot());

// pilihan peta dasar
document.querySelectorAll('[data-dasar]').forEach((b) => b.addEventListener('click', () => {
  gantiPetaDasar(peta, b.dataset.dasar);
  document.querySelectorAll('[data-dasar]').forEach((x) => x.classList.toggle('aktif', x === b));
}));

// koordinat kursor
peta.on('mousemove', (e) => { $('koordinat').textContent = `${e.latlng.lat.toFixed(4)}, ${e.latlng.lng.toFixed(4)}`; });

// ---------- daftar lokasi indikasi tambang baru ----------
let penanda = null;
let noAktif = null;   // supaya sorotan item tetap ada saat daftar digambar ulang (nama desa terisi)
function lihatLokasi(k) {
  noAktif = k.no;
  if (location.hash !== '#peta') location.hash = '#peta';
  peta.flyToBounds(k.batas, { maxZoom: 15, duration: 0.8 });
  if (penanda) peta.removeLayer(penanda);
  penanda = L.rectangle(k.batas, { color: '#00E5FF', weight: 3, fill: false, dashArray: '2 6', className: 'kedip' }).addTo(peta);
  document.querySelectorAll('.daftar-lokasi li').forEach((li) => li.classList.toggle('aktif', +li.dataset.no === k.no));
  if (window.matchMedia('(max-width: 768px)').matches) aturSheet(false);
}

// kode kelas ESA WorldCover. Badge per lokasi hanya tampil jika data punya properti w
const WORLDCOVER = { 10: 'Pohon', 20: 'Semak', 30: 'Rumput', 40: 'Lahan pertanian', 50: 'Terbangun', 60: 'Lahan terbuka', 80: 'Air', 90: 'Lahan basah', 95: 'Mangrove' };
function badgeWC(k) {
  if (k.w == null) return '';
  const label = WORLDCOVER[k.w] || `Kode ${k.w}`;
  return `<span class="lencana-wc${k.w === 60 ? '' : ' netral'}">${label} 2021</span>`;
}

function gambarDaftar() {
  const daftar = klaster.filter((k) => k.jumlah >= 2);
  const sisaKecil = klaster.length - daftar.length;
  $('daftar-lokasi').innerHTML = daftar.map((k) => `<li data-no="${k.no}" tabindex="0"${k.no === noAktif ? ' class="aktif"' : ''}>
      <span class="no">${k.no}</span>
      <span class="isi"><b>${k.nama || 'Lokasi ' + k.no}</b><em>${k.pusat.lat.toFixed(3)}, ${k.pusat.lng.toFixed(3)}</em>${badgeWC(k)}</span>
      <span class="luas">${k.luas.toFixed(1)} km²<em>${k.jumlah} sel</em></span>
    </li>`).join('') || '<li class="kosong">Belum ada indikasi.</li>';
  const btn = $('btn-lokasi-semua');
  btn.hidden = sisaKecil === 0;
  btn.textContent = `+ ${sisaKecil} lokasi 1 sel (kemungkinan noise)`;
}
$('daftar-lokasi').addEventListener('click', (e) => {
  const li = e.target.closest('li[data-no]');
  if (li) lihatLokasi(klaster[+li.dataset.no - 1]);
});
$('daftar-lokasi').addEventListener('keydown', (e) => {
  const li = e.target.closest('li[data-no]');
  if (li && e.key === 'Enter') lihatLokasi(klaster[+li.dataset.no - 1]);
});
$('btn-lokasi-semua').addEventListener('click', () => { $('btn-lokasi-semua').hidden = true; });

// ---------- pencarian, halaman, demo ----------
pasangPencarian({
  form: $('form-cari'),
  input: $('input-cari'),
  hasil: $('hasil-cari'),
  saatPilih: (latlng) => {
    if (batasKunci && !batasKunci.contains(latlng)) { pesan('Lokasi di luar area peta'); return; }
    peta.flyTo(latlng, 13); if (kotak.aktif()) kotak.pindahKe(latlng);
  },
});

$('tautan').innerHTML = TAUTAN.map((t) =>
  `<a class="tombol${t.sekunder ? ' sekunder' : ''}" href="${t.url}" target="_blank" rel="noopener">${t.teks}</a>`).join('');
$('tautan-space').href = SPACE.halaman;
$('daftar-unduhan').innerHTML = CONTOH_PATCH.map((c) => `<li>
  <a href="data/demo/${c.file}" download>${c.file}</a>
  <span class="${c.label === c.tebakan ? 'benar' : 'salah'}">asli ${c.label} · tebakan ${c.tebakan}</span>
</li>`).join('');

pasangHalaman((nama) => {
  if (nama === 'peta') setTimeout(() => {
    peta.invalidateSize();
    kunciPeta();
    if (boundsData) peta.fitBounds(boundsData, { padding: [20, 20], animate: false });
  }, 50);
  if (nama === 'demo' && !$('bingkai-demo').src) $('bingkai-demo').src = SPACE.sematan;
});

// ---------- muat data ----------
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
    await new Promise((r) => requestAnimationFrame(r));
    boundsData = prediksi.getBounds();
    peta.invalidateSize();
    kunciPeta();
    peta.fitBounds(boundsData, { padding: [20, 20], animate: false });
    kotak.aturArea(boundsData);

    klaster = buatKlaster(sel);
    tampilkanTotal(sel, klaster.filter((k) => k.jumlah >= 2).length);
    gambarDaftar();
    isiNama(klaster.filter((k) => k.jumlah >= 2).slice(0, 15), () => gambarDaftar());
  } catch (err) {
    pesan('Data prediksi belum tersedia (data/prediksi_2024.geojson).', 8000);
  } finally {
    $('memuat').hidden = true;
  }
  try {
    maus = lapisMaus(await muatJSON(DATA.maus));
    if ($('cek-maus').checked) maus.addTo(peta);
  } catch (err) { /* poligon 2019 opsional */ }
}

muat();
