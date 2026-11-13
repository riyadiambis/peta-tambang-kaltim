// pencarian lokasi pakai Nominatim (OpenStreetMap), dibatasi wilayah Indonesia
export function pasangPencarian({ form, input, hasil, saatPilih }) {
  let jeda = null;

  async function cari(q) {
    hasil.hidden = false;
    hasil.innerHTML = '<li>Mencari...</li>';
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&limit=5&countrycodes=id&accept-language=id&q=${encodeURIComponent(q)}`;
      const data = await (await fetch(url)).json();
      if (!data.length) { hasil.innerHTML = '<li>Lokasi tidak ditemukan</li>'; return; }
      hasil.innerHTML = data.map((d, i) => `<li tabindex="0" data-i="${i}">${d.display_name}</li>`).join('');
      hasil.querySelectorAll('li').forEach((li) => {
        const pilih = () => {
          const d = data[li.dataset.i];
          saatPilih(L.latLng(+d.lat, +d.lon));
          hasil.hidden = true;
        };
        li.addEventListener('click', pilih);
        li.addEventListener('keydown', (ev) => { if (ev.key === 'Enter') pilih(); });
      });
    } catch (err) {
      hasil.innerHTML = '<li>Pencarian gagal, cek koneksi internet</li>';
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const q = input.value.trim();
    if (!q) return;
    clearTimeout(jeda);
    jeda = setTimeout(() => cari(q), 150);
  });
  document.addEventListener('click', (e) => { if (!form.contains(e.target)) hasil.hidden = true; });
}
