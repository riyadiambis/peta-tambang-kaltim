// kelompokkan sel kandidat tambang baru yang bersebelahan jadi "lokasi"
import { LUAS_SEL } from './config.js';

export function buatKlaster(sel) {
  const baru = sel.filter((s) => s.b);
  if (!baru.length) return [];
  // jarak antar pusat sel bertetangga sekitar 0,0058 derajat (640 m); 1,6x biar diagonal ikut
  const ambang = 0.0058 * 1.6;
  const induk = baru.map((_, i) => i);
  const cari = (i) => (induk[i] === i ? i : (induk[i] = cari(induk[i])));
  for (let i = 0; i < baru.length; i++) {
    for (let j = i + 1; j < baru.length; j++) {
      if (Math.abs(baru[i].tengah.lat - baru[j].tengah.lat) < ambang &&
          Math.abs(baru[i].tengah.lng - baru[j].tengah.lng) < ambang) induk[cari(i)] = cari(j);
    }
  }
  const grup = new Map();
  baru.forEach((s, i) => {
    const r = cari(i);
    if (!grup.has(r)) grup.set(r, []);
    grup.get(r).push(s);
  });
  return [...grup.values()]
    .map((anggota) => {
      const batas = L.latLngBounds(anggota.map((s) => s.tengah)).pad(0.15);
      return { jumlah: anggota.length, luas: anggota.length * LUAS_SEL, batas, pusat: batas.getCenter(), nama: null };
    })
    .sort((a, b) => b.jumlah - a.jumlah)
    .map((k, i) => ({ ...k, no: i + 1 }));
}

// nama desa/kecamatan terdekat dari Nominatim, satu per satu (batas 1 permintaan per detik)
export async function isiNama(klaster, saatDapat) {
  for (const k of klaster) {
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&zoom=14&accept-language=id&lat=${k.pusat.lat}&lon=${k.pusat.lng}`;
      const d = await (await fetch(url)).json();
      const a = d.address || {};
      k.nama = a.village || a.suburb || a.town || a.city_district || a.county || null;
      if (k.nama && (a.city_district || a.county) && k.nama !== (a.city_district || a.county)) k.nama += `, ${a.city_district || a.county}`;
    } catch (e) { k.nama = null; }
    saatDapat(k);
    await new Promise((r) => setTimeout(r, 1100));
  }
}
