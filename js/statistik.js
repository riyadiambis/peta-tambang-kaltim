// hitung persen dan luas tiap kelas di dalam kotak, lalu tampilkan di panel
import { KELAS, KELAS_AIR, LUAS_SEL } from './config.js';

// ubah fitur GeoJSON jadi daftar titik tengah sel biar hitungnya cepat
export function siapkanSel(geojson) {
  return geojson.features.map((f) => {
    const c = f.geometry.coordinates[0];
    const lat = (c[0][1] + c[1][1] + c[2][1] + c[3][1]) / 4;
    const lon = (c[0][0] + c[1][0] + c[2][0] + c[3][0]) / 4;
    return { tengah: L.latLng(lat, lon), k: f.properties.k, b: f.properties.b === 1 };
  });
}

export function hitung(sel, batas) {
  const n = [0, 0, 0, 0];
  let kosong = 0;
  let air = 0;
  let baru = 0;
  for (const s of sel) {
    if (!batas.contains(s.tengah)) continue;
    if (s.k < 0) { kosong++; continue; }
    if (s.k === KELAS_AIR) { air++; continue; }
    n[s.k]++;
    if (s.b) baru++;
  }
  return { n, valid: n.reduce((a, c) => a + c, 0), kosong, air, baru };
}

const $ = (id) => document.getElementById(id);

export function tampilkan(h) {
  $('luas-kotak').textContent = (h.valid * LUAS_SEL).toFixed(1);
  $('jumlah-sel').textContent = h.valid;
  $('jumlah-baru').textContent = h.baru;
  $('luas-baru').textContent = h.baru ? `(±${(h.baru * LUAS_SEL).toFixed(1)} km²)` : '';

  const catatan = [];
  if (h.air) catatan.push(`${h.air} sel air (sungai/danau) tidak dihitung`);
  if (h.kosong) catatan.push(`${h.kosong} sel tertutup awan tidak dihitung`);
  if (h.valid === 0 && !h.air && !h.kosong) catatan.push('Kotak berada di luar area peta. Geser ke area berwarna');
  $('info-kotak').textContent = catatan.length ? `${catatan.join(', ')}.` : '';

  const persen = KELAS.map((c, i) => (h.valid ? (h.n[i] / h.valid) * 100 : 0));
  $('bar-tumpuk').innerHTML = KELAS.map((c, i) => `<span style="width:${persen[i]}%;background:${c.warna}" title="${c.nama}"></span>`).join('');
  $('bar-kelas').innerHTML = KELAS.map((c, i) => `<div class="bar-baris" data-k="${i}" tabindex="0" title="Arahkan untuk menyorot ${c.nama} di peta">
      <i class="titik" style="background:${c.warna}"></i>
      <span>${c.nama}<span class="luas">${(h.n[i] * LUAS_SEL).toFixed(1)} km²</span></span>
      <span class="persen">${persen[i].toFixed(1)}%</span>
      <div class="bar-luar"><div class="bar-isi" style="width:${persen[i]}%;background:${c.warna}"></div></div>
    </div>`).join('');
}

// ringkasan seluruh wilayah kajian (tanpa kotak)
export function tampilkanTotal(sel, jumlahLokasi) {
  const n = [0, 0, 0, 0];
  let baru = 0;
  for (const s of sel) {
    if (s.k >= 0 && s.k < 4) { n[s.k]++; if (s.b) baru++; }
  }
  const valid = n.reduce((a, c) => a + c, 0) || 1;
  $('total-tambang').textContent = (n[0] * LUAS_SEL).toFixed(0);
  $('total-baru').textContent = (baru * LUAS_SEL).toFixed(0);
  $('total-lokasi').textContent = jumlahLokasi;
  $('bar-total').innerHTML = KELAS.map((c, i) => `<span style="width:${(n[i] / valid) * 100}%;background:${c.warna}" title="${c.nama}"></span>`).join('');
  $('komposisi-total').innerHTML = KELAS.map((c, i) =>
    `<li><i style="background:${c.warna}"></i>${c.nama}<b>${((n[i] / valid) * 100).toFixed(1)}%</b></li>`).join('');
}
