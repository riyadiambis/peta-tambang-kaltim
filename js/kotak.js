// kotak analisis opsional: digeser lewat titik tengah, diubah ukurannya lewat pojok kanan bawah,
// dan tidak bisa keluar dari area data
import { KOTAK_AWAL } from './config.js';

export function buatKotak(peta, saatBerubah) {
  const kotak = L.rectangle(KOTAK_AWAL, {
    color: '#00E5FF', weight: 2, fillColor: '#00E5FF', fillOpacity: 0.06, dashArray: '6 6', interactive: false,
  });
  const ikon = (kelas, isi, ukuran) => L.divIcon({
    className: '', html: `<div class="pegangan ${kelas}">${isi}</div>`,
    iconSize: [ukuran, ukuran], iconAnchor: [ukuran / 2, ukuran / 2],
  });
  const pGeser = L.marker(kotak.getBounds().getCenter(), { icon: ikon('', '✥', 26), draggable: true, zIndexOffset: 1000 });
  const pUbah = L.marker(kotak.getBounds().getSouthEast(), { icon: ikon('ubah', '◢', 18), draggable: true, zIndexOffset: 1000 });
  let area = null;   // batas data, diisi setelah GeoJSON dimuat
  let aktif = false;

  // jaga kotak tetap di dalam area data
  function jepit(b) {
    if (!area) return b;
    const tinggi = Math.min(b.getNorth() - b.getSouth(), area.getNorth() - area.getSouth());
    const lebar = Math.min(b.getEast() - b.getWest(), area.getEast() - area.getWest());
    const s = Math.min(Math.max(b.getSouth(), area.getSouth()), area.getNorth() - tinggi);
    const w = Math.min(Math.max(b.getWest(), area.getWest()), area.getEast() - lebar);
    return L.latLngBounds([s, w], [s + tinggi, w + lebar]);
  }

  function set(batas, ubahPegangan = true) {
    const b = jepit(batas);
    kotak.setBounds(b);
    if (ubahPegangan) { pGeser.setLatLng(b.getCenter()); pUbah.setLatLng(b.getSouthEast()); }
    saatBerubah(b);
  }

  pGeser.on('drag', (e) => {
    const b = kotak.getBounds();
    const c = b.getCenter();
    const dLat = e.latlng.lat - c.lat;
    const dLng = e.latlng.lng - c.lng;
    set(L.latLngBounds([b.getSouth() + dLat, b.getWest() + dLng], [b.getNorth() + dLat, b.getEast() + dLng]), false);
    pUbah.setLatLng(kotak.getBounds().getSouthEast());
  });
  pGeser.on('dragend', () => pGeser.setLatLng(kotak.getBounds().getCenter()));

  pUbah.on('drag', (e) => {
    const b = kotak.getBounds();
    const lat = Math.min(e.latlng.lat, b.getNorth() - 0.01);
    const lng = Math.max(e.latlng.lng, b.getWest() + 0.01);
    set(L.latLngBounds([lat, b.getWest()], [b.getNorth(), lng]), false);
    pGeser.setLatLng(kotak.getBounds().getCenter());
  });
  pUbah.on('dragend', () => pUbah.setLatLng(kotak.getBounds().getSouthEast()));

  return {
    batas: () => kotak.getBounds(),
    set,
    aktif: () => aktif,
    aturArea(b) { area = b; set(kotak.getBounds()); },
    tampilkan(ya) {
      aktif = ya;
      [kotak, pGeser, pUbah].forEach((l) => (ya ? l.addTo(peta) : peta.removeLayer(l)));
      if (ya) set(kotak.getBounds());
    },
    pindahKe(latlng) {
      const b = kotak.getBounds();
      const h = (b.getNorth() - b.getSouth()) / 2;
      const w = (b.getEast() - b.getWest()) / 2;
      set(L.latLngBounds([latlng.lat - h, latlng.lng - w], [latlng.lat + h, latlng.lng + w]));
    },
    keDepan: () => { if (aktif) kotak.bringToFront(); },
  };
}
