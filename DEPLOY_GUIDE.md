# 🚀 Panduan Deploy IFP Monitoring Dashboard

Ikuti langkah-langkah di bawah untuk deploy aplikasi hingga siap pakai.

---

## 📋 BAGIAN A: Deploy Google Apps Script (5-10 menit)

### Step 1: Buka Google Apps Script
1. Buka [script.google.com](https://script.google.com)
2. Klik **"New project"** atau **"Buat proyek baru"**
3. Beri nama: `IFP Monitoring API`
4. Klik **Create**

### Step 2: Copy Kode dari `GAS_Code.gs`
1. Buka file `GAS_Code.gs` di folder ini
2. **Copy SEMUA** isi file (Ctrl+A lalu Ctrl+C)
3. Di Google Apps Script, **paste** ke editor (hapus kode default jika ada)
4. Klik **Save** (Ctrl+S)

### Step 3: Deploy sebagai Web App
1. Di menu atas, klik **Deploy** → **New deployment**
2. Pilih icon **⚙️** (gear icon) dan pilih **Web app**
3. Isi form:
   - **Description**: `IFP Monitoring API`
   - **Execute as**: Pilih akun Google Anda (yang punya akses spreadsheet)
   - **Who has access**: Pilih **`Anyone, even anonymous`**
4. Klik **Deploy**
5. **PENTING**: Akan muncul dialog. Klik **Authorize** dan login dengan akun Google Anda
6. Copy **URL deploy** yang tampil (format: `https://script.google.com/macros/s/AKfycb...../exec`)
   - Simpan URL ini, butuh di step berikutnya ✅

**Contoh URL:**
```
https://script.google.com/macros/s/AKfycbYxAbC123def456ghijklmnop/exec
```

---

## 📋 BAGIAN B: Update File HTML (2 menit)

### Step 4: Ganti API_URL di Monitoring.html
1. Buka file `Monitoring.html`
2. Cari baris:
   ```javascript
   const API_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=${SHEET_NAME}`;
   ```
3. **Ganti dengan:**
   ```javascript
   const API_URL = 'https://script.google.com/macros/s/AKfycbYxAbC123def456ghijklmnop/exec';
   ```
   *(Ganti `AKfycbYxAbC123def456ghijklmnop` dengan URL deploy Anda dari Step 3)*

4. Klik **Save** (Ctrl+S)

---

## 📋 BAGIAN C: Jalankan di Browser Lokal (1 menit)

### Option 1: Gunakan Python 3 (Recommended - Tersingkat)
Buka **PowerShell** atau **Command Prompt** di folder aplikasi, lalu jalankan:

```powershell
python -m http.server 8000
```

Setelah itu:
- Buka browser, kunjungi: **`http://localhost:8000/Monitoring.html`**
- Dashboard akan loading dan menampilkan data dari Spreadsheet

### Option 2: Gunakan Node.js + http-server
Jika Python tidak tersedia:

```powershell
npm install -g http-server
http-server . -p 8000
```

Lalu buka: **`http://localhost:8000/Monitoring.html`**

### Option 3: Gunakan Live Server (VSCode)
1. Install extension **Live Server** di VSCode
2. Klik kanan `Monitoring.html` → **"Open with Live Server"**
3. Browser otomatis terbuka di `http://127.0.0.1:5500/`

---

## ✅ Verifikasi & Troubleshooting

### ✓ Jika sudah berfungsi:
- Halaman dashboard tampil dengan 4 stat card (Total Sekolah, Terpasang, Belum Pasang, Trouble)
- Tabel kendala muncul dengan data dari Spreadsheet
- Timestamp "Last updated" muncul
- Auto-refresh setiap 30 detik

### ❌ Jika Error:

**Error 1: "Gagal memuat data. Pastikan akses Spreadsheet sudah 'Public'"**
- Pastikan Spreadsheet sudah **dibuka ke publik**:
  - Buka Spreadsheet di Google Sheets
  - Klik **Share** → Ubah ke **"Anyone with the link can view"**

**Error 2: "CORS Error" di Console Browser**
- Pastikan URL Apps Script sudah benar di `API_URL`
- Periksa di Developer Tools (F12) → Console tab

**Error 3: Data tidak muncul tapi tidak ada error**
- Periksa nama kolom di Spreadsheet sesuai ekspektasi kode:
  - Kolom C (Index 2): NPSN
  - Kolom D (Index 3): Nama Sekolah
  - Kolom G (Index 6): Status
  - Kolom H (Index 7): Kendala/Detail

**Error 4: 403 Unauthorized**
- Periksa deploy Apps Script → Edit deployment
- Pastikan **"Execute as"** = akun Google dengan akses spreadsheet
- Deploy ulang jika perlu

---

## 🔄 Update Setelah Deploy

Jika Anda ubah data di Spreadsheet:
- Dashboard **auto-refresh setiap 30 detik**
- Klik icon **refresh** (⟳) di header untuk refresh manual
- Toggle icon **jam** untuk pause auto-refresh

---

## 📚 File Referensi

- **GAS_Code.gs** → Kode server (Google Apps Script)
- **Monitoring.html** → Frontend dashboard
- **GAS_README.md** → Catatan teknis (lama, sudah terupdate)
- **DEPLOY_GUIDE.md** → Panduan ini

---

## 🎯 Ringkas Quick Start
```
1. Copy GAS_Code.gs → Paste ke Apps Script Baru
2. Deploy sebagai Web App (Anyone, even anonymous)
3. Copy URL deploy
4. Ganti API_URL di Monitoring.html dengan URL tersebut
5. Jalankan: python -m http.server 8000
6. Buka: http://localhost:8000/Monitoring.html
7. Done! ✅
```

---

**Butuh bantuan?** Hubungi atau tanyakan detail error yang muncul.
