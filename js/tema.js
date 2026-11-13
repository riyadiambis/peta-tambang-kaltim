// mode gelap / terang, pilihan disimpan di browser (kalau bisa)
export function pasangTema(tombol, saatGanti) {
  const akar = document.documentElement;
  const sekarang = () => (akar.dataset.tema === 'terang' ? 'terang' : 'gelap');
  tombol.addEventListener('click', () => {
    const baru = sekarang() === 'terang' ? 'gelap' : 'terang';
    akar.dataset.tema = baru;
    try { localStorage.setItem('tema', baru); } catch (e) { /* mode privat: abaikan */ }
    saatGanti(baru);
  });
  return sekarang();
}
