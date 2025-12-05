# Website Romantis 💕

Website romantis yang dibuat dengan penuh cinta untuk menyampaikan perasaanmu.

## Fitur

- ✨ **Hero Section** - Pembuka yang indah dengan animasi bintang
- 📝 **Puisi Cinta** - Bagian untuk menampilkan puisi romantis
- 🎤 **Pesan Suara** - Player audio untuk voice note
- 🎥 **Video Cinta** - Pemutar video untuk kenangan indah
- 📸 **Galeri Foto** - Galeri foto dengan lightbox yang cantik
- 💖 **Animasi Interaktif** - Hati yang mengambang dan efek klik

## Cara Menggunakan

### 1. Menambahkan Voice Note
- Buat folder `audio` di root project
- Tambahkan file audio dengan nama `voice-note.mp4` atau `voice-note.mp3`
- Format yang didukung: MP3, MP4, OGG, WAV

### 2. Menambahkan Video
- Buat folder `videos` di root project
- Tambahkan file video dengan nama `love-video.mp4`
- Format yang didukung: MP4, WebM, OGG
- (Opsional) Tambahkan thumbnail dengan nama `video-poster.jpg` di folder `images`

### 3. Menambahkan Foto ke Galeri
- Buat folder `images` di root project
- Tambahkan foto dengan nama:
  - `photo1.jpg`
  - `photo2.jpg`
  - `photo3.jpg`
  - `photo4.jpg`
  - `photo5.jpg`
  - `photo6.jpg`
- Atau tambahkan lebih banyak foto dengan mengedit `index.html` di bagian gallery

### 4. Menjalankan Website
1. Buka file `index.html` di browser web modern
2. Atau gunakan live server:
   - VS Code: Install extension "Live Server" dan klik "Go Live"
   - Python: `python -m http.server 8000` lalu buka `http://localhost:8000`
   - Node.js: Install `http-server` dengan `npm install -g http-server` lalu jalankan `http-server`

## Kustomisasi

### Mengubah Puisi
Edit bagian puisi di `index.html` pada section dengan id `poem`.

### Mengubah Warna
Edit variabel CSS di `style.css` pada bagian `:root`:
```css
:root {
    --primary-color: #ff6b9d;
    --secondary-color: #c44569;
    --accent-color: #f8b500;
}
```

### Menambah Foto
Tambahkan item baru di gallery grid:
```html
<div class="gallery-item">
    <img src="images/photo7.jpg" alt="Foto 7">
    <div class="gallery-overlay">
        <span class="gallery-heart">❤️</span>
    </div>
</div>
```

## Browser Support

Website ini bekerja optimal di:
- Chrome (terbaru)
- Firefox (terbaru)
- Safari (terbaru)
- Edge (terbaru)

## Tips

- Gunakan foto dengan resolusi tinggi untuk hasil terbaik
- Kompres video untuk loading yang lebih cepat
- Pastikan file audio tidak terlalu besar (< 10MB)
- Test di berbagai device untuk memastikan responsive

## Lisensi

Dibuat dengan ❤️ untuk menyampaikan cinta.

---

**Selamat! Semoga website ini membantu menyampaikan perasaanmu! 💕**

