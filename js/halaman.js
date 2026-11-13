// navigasi 3 halaman pakai hash (#peta, #demo, #tentang), cocok untuk GitHub Pages
const DAFTAR = ['peta', 'demo', 'tentang'];

export function pasangHalaman(saatPindah) {
  function tampilkan() {
    const nama = DAFTAR.includes(location.hash.slice(1)) ? location.hash.slice(1) : 'peta';
    DAFTAR.forEach((h) => { document.getElementById(`halaman-${h}`).hidden = h !== nama; });
    document.querySelectorAll('.navigasi a').forEach((a) => {
      a.classList.toggle('aktif', a.dataset.halaman === nama);
      if (a.dataset.halaman === nama) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    document.body.dataset.halaman = nama;
    window.scrollTo(0, 0);
    saatPindah(nama);
  }
  window.addEventListener('hashchange', tampilkan);
  tampilkan();
}
