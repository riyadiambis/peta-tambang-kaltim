// kotak analisis yang bisa digeser (titik tengah) dan diubah ukurannya (pojok kanan bawah)
import { KOTAK_AWAL } from './config.js';

export function buatKotak(peta, saatBerubah) {
  const kotak = L.rectangle(KOTAK_AWAL, {
    color: '#00E5FF', weight: 2, fillColor: '#00E5FF', fillOpacity: 0.06, dashArray: '6 6', interactive: false,
  }).addTo(peta);
  const ikon = (kelas, isi, ukuran) => L.divIcon({
    className: '', html: `<div class="pegangan ${kelas}">${isi}</div>`,
    iconSize: [ukuran, ukuran], iconAnchor: [ukuran / 2, ukuran / 2],
  });
  const pGeser = L.marker(kotak.getBounds().getCenter(), { icon: ikon('', '✥', 26), draggable: true, zIndexOffset: 1000 }).addTo(peta);
  const pUbah = L.marker(kotak.getBounds().getSouthEast(), { icon: ikon('ubah', '◢', 18), draggable: true, zIndexOffset: 1000 }).addTo(peta);

  function set(batas) {
    kotak.setBounds(batas);
    pGeser.setLatLng(batas.getCenter());
    pUbah.setLatLng(batas.getSouthEast());
    saatBerubah(batas);
  }

  pGeser.on('drag', (e) => {
    const b = kotak.getBounds();
    const c = b.getCenter();
    const dLat = e.latlng.lat - c.lat;
    const dLng = e.latlng.lng - c.lng;
    const baru = L.latLngBounds([b.getSouth() + dLat, b.getWest() + dLng], [b.getNorth() + dLat, b.getEast() + dLng]);
    kotak.setBounds(baru);
    pUbah.setLatLng(baru.getSouthEast());
    saatBerubah(baru);
  });

  pUbah.on('drag', (e) => {
    const b = kotak.getBounds();
    const lat = Math.min(e.latlng.lat, b.getNorth() - 0.005);
    const lng = Math.max(e.latlng.lng, b.getWest() + 0.005);
    const baru = L.latLngBounds([lat, b.getWest()], [b.getNorth(), lng]);
    kotak.setBounds(baru);
    pGeser.setLatLng(baru.getCenter());
    saatBerubah(baru);
  });

  return {
    batas: () => kotak.getBounds(),
    set,
    pindahKe(latlng) {
      const b = kotak.getBounds();
      const h = (b.getNorth() - b.getSouth()) / 2;
      const w = (b.getEast() - b.getWest()) / 2;
      set(L.latLngBounds([latlng.lat - h, latlng.lng - w], [latlng.lat + h, latlng.lng + w]));
    },
    keDepan: () => kotak.bringToFront(),
  };
}
