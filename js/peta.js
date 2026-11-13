// peta dasar + lapisan prediksi dan poligon tambang 2019
import { KELAS, KELAS_AIR, WARNA_AIR, WARNA_BARU, PETA_AWAL, OPASITAS_AWAL, KELAS_AWAL } from './config.js';

const gaya = { opasitas: OPASITAS_AWAL, tampil: new Set(KELAS_AWAL), baru: true, sorot: null };

const PETA_DASAR = {
  satelit: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 18, attribution: 'Citra: Esri, Maxar, Earthstar Geographics',
  }),
  gelap: L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 19, subdomains: 'abcd', attribution: '&copy; OpenStreetMap &copy; CARTO',
  }),
};

export function buatPeta(idElemen) {
  const peta = L.map(idElemen, { preferCanvas: true, zoomControl: false, attributionControl: false })
    .setView(PETA_AWAL.pusat, PETA_AWAL.zoom);
  PETA_DASAR.satelit.addTo(peta);
  L.control.zoom({ position: 'bottomright' }).addTo(peta);
  L.control.scale({ position: 'bottomright', imperial: false }).addTo(peta);
  L.control.attribution({ position: 'bottomright', prefix: false })
    .addAttribution('Prediksi: custom CNN, Sentinel-2 2024').addTo(peta);
  return peta;
}

// ganti peta dasar satelit / gelap
export function gantiPetaDasar(peta, nama) {
  Object.entries(PETA_DASAR).forEach(([k, l]) => { if (k === nama) l.addTo(peta).bringToBack(); else peta.removeLayer(l); });
}

// gelapkan semua area di luar wilayah kajian biar fokus ke area studi
const warnaCSS = (nama) => getComputedStyle(document.documentElement).getPropertyValue(nama).trim();
let topeng = null;
let bingkai = null;

export function sorotWilayah(peta, batas) {
  const dunia = [[-90, -360], [-90, 360], [90, 360], [90, -360]];
  const lubang = [batas.getSouthWest(), batas.getNorthWest(), batas.getNorthEast(), batas.getSouthEast()];
  topeng = L.polygon([dunia, lubang], { stroke: false, fillOpacity: 0.55, interactive: false }).addTo(peta);
  bingkai = L.rectangle(batas, { weight: 1, opacity: 0.6, fill: false, interactive: false }).addTo(peta);
  warnaiSorot();
}

// dipanggil lagi saat ganti mode terang/gelap
export function warnaiSorot() {
  if (topeng) topeng.setStyle({ fillColor: warnaCSS('--masker') });
  if (bingkai) bingkai.setStyle({ color: warnaCSS('--teks') });
}

function gayaSel(f) {
  const k = f.properties.k;
  const sembunyi = { stroke: false, fill: false };
  if (k < 0) return { stroke: false, fillColor: '#000', fillOpacity: gaya.opasitas * 0.4 };
  const baru = gaya.baru && f.properties.b === 1;
  if (k === KELAS_AIR) return gaya.tampil.size > 1 ? { stroke: false, fillColor: WARNA_AIR, fillOpacity: gaya.opasitas * 0.7 } : sembunyi;
  if (!gaya.tampil.has(k) && !baru) return sembunyi;
  const redup = gaya.sorot !== null && gaya.sorot !== k;
  if (!gaya.tampil.has(k)) {
    // kelas disembunyikan tapi sel ini kandidat baru: cukup garis tepinya
    return { color: WARNA_BARU, weight: 2, opacity: 1, fill: false };
  }
  return {
    stroke: baru,
    color: WARNA_BARU,
    weight: 2,
    opacity: redup ? 0.15 : 1,
    fill: true,
    fillColor: KELAS[k].warna,
    fillOpacity: redup ? gaya.opasitas * 0.15 : gaya.opasitas,
  };
}

function isiPopup(f) {
  const p = f.properties;
  if (p.k < 0) return '<b>Tidak ada data</b><br>Tertutup awan sepanjang 2024';
  if (p.k === KELAS_AIR) return '<b>Air</b><br>Sungai/danau (masker ESA WorldCover), tidak ditebak model';
  const baris = p.p.map((v, i) => `<div class="pp-baris"><span>${KELAS[i].nama}</span>
    <i><em style="width:${v * 100}%;background:${KELAS[i].warna}"></em></i><b>${Math.round(v * 100)}%</b></div>`).join('');
  const baru = p.b === 1 ? '<div class="popup-baru">Indikasi tambang baru, di luar poligon 2019</div>' : '';
  return `<div class="pp-judul"><span style="background:${KELAS[p.k].warna}"></span>${KELAS[p.k].nama}</div>${baris}${baru}`;
}

export function lapisPrediksi(geojson) {
  return L.geoJSON(geojson, { style: gayaSel, onEachFeature: (f, l) => l.bindPopup(isiPopup(f)) });
}

export function lapisMaus(geojson) {
  return L.geoJSON(geojson, { style: { color: '#ffffff', weight: 1.5, dashArray: '4 3', fill: false, opacity: 0.85 }, interactive: false });
}

export function aturGaya(lapis, ubah) {
  Object.assign(gaya, ubah);
  if (lapis) lapis.setStyle(gayaSel);
}

export function legendaHTML() {
  return KELAS.map((c) => `<li><i style="background:${c.warna}"></i>${c.nama}</li>`).join('') +
    `<li><i style="background:${WARNA_AIR}"></i>Air (dimasker)</li>` +
    `<li><i class="lg-baru" style="background:${KELAS[0].warna}"></i>Indikasi baru</li>` +
    '<li><i class="lg-maus"></i>Poligon 2019</li>';
}
