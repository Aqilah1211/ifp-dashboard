# ✅ IFP Monitoring Dashboard - Pre-Deploy Checklist

## Status File Aplikasi

| File | Status | Keterangan |
|------|--------|-----------|
| `GAS_Code.gs` | ✅ Siap | Google Apps Script code — sudah diperbaiki & valid |
| `Monitoring.html` | ✅ Siap | Frontend dashboard — CSS diperbaiki, fetch logic optimized |
| `run_server.py` | ✅ Siap | Python server runner untuk test lokal |
| `DEPLOY_GUIDE.md` | ✅ Siap | Panduan deploy lengkap step-by-step |

---

## 🔧 Perbaikan yang Dilakukan

### 1. CSS Invalid di Monitoring.html ✅
**Masalah:** 
- `.stat-card` menggunakan invalid CSS (Tailwind @apply di style tag)
- `.stat-card:hover` memakai `@apply` yang tidak didukung di inline style

**Solusi:**
- Ganti dengan valid CSS properties (background-color, padding, border-radius, dll)
- Hover effects menggunakan transform & box-shadow

### 2. API_URL Fetch Error ✅
**Masalah:**
- URL fetch tidak handle parameter dengan benar (double `?` jika sudah ada query string)
- CSV regex parsing tidak tahan baris kosong

**Solusi:**
- Tambah logic check: `const sep = API_URL.includes('?') ? '&' : '?'`
- Guard empty rows di CSV parsing

### 3. GAS Code ✅
- Tidak ada error — sudah valid & siap deploy

---

## 🎯 Next Steps (Segera Lakukan)

### STEP 1: Deploy Google Apps Script (5 menit)
```bash
1. Buka https://script.google.com
2. Buat project baru "IFP Monitoring API"
3. Copy-paste semua isi GAS_Code.gs
4. Deploy → Web App (Anyone, even anonymous)
5. CATAT URL: https://script.google.com/macros/s/AKfycb.../exec
```

### STEP 2: Update API_URL di HTML (1 menit)
```bash
1. Buka Monitoring.html
2. Cari: const API_URL = `https://docs.google.com/spreadsheets...`
3. Ganti dengan: const API_URL = 'https://script.google.com/macros/s/[PASTE_URL_DEPLOY]/exec';
```

### STEP 3: Test Lokal (1 menit)
```bash
# Buka PowerShell di folder aplikasi, jalankan:
python -m http.server 8000

# Atau gunakan run_server.py:
python run_server.py

# Buka browser: http://localhost:8000/Monitoring.html
```

### STEP 4: Verifikasi
```
✓ Dashboard muncul dengan 4 stat cards
✓ Data kendala dari Spreadsheet terlihat
✓ Auto-refresh bekerja (30 detik)
✓ Tombol Refresh & Toggle Auto-Refresh responsif
```

---

## 📚 Files di Folder

```
Aplikasi Report/
├── GAS_Code.gs              ← Google Apps Script code
├── Monitoring.html          ← Frontend dashboard (SUDAH DIPERBAIKI)
├── GAS_README.md            ← Catatan teknis (referensi)
├── DEPLOY_GUIDE.md          ← Panduan deploy detail ← BACA INI
├── run_server.py            ← Python server runner
└── SETUP_CHECKLIST.md       ← File ini
```

---

## 🚀 Quick Reference

**Start Server:**
```powershell
python -m http.server 8000
# atau
python run_server.py
```

**Access Dashboard:**
```
http://localhost:8000/Monitoring.html
```

**Deploy Apps Script:**
1. Buka script.google.com
2. New project → Copy GAS_Code.gs
3. Deploy → Web App
4. Copy URL → Update API_URL di HTML

---

## ⚠️ Common Issues & Fixes

| Issue | Solusi |
|-------|--------|
| Port 8000 sudah dipakai | Ganti port: `python -m http.server 9000` |
| "Gagal memuat data" | Spreadsheet harus public (Share → Anyone) |
| CORS Error | URL Apps Script di API_URL harus benar |
| Data tidak tampil | Check kolom index di spreadsheet (C=NPSN, D=Nama, G=Status, H=Kendala) |

---

## ✨ Fitur Sudah Siap

✅ Real-time monitoring (auto-refresh 30s)
✅ Search by NPSN atau Nama Sekolah
✅ Highlight baris kendala baru (animasi kuning)
✅ Statistik ringkas (4 cards)
✅ Responsive design (mobile-friendly)
✅ Manual refresh button
✅ Toggle auto-refresh
✅ Hash-based change detection (hemat bandwidth)

---

**Status: SIAP DEPLOY** 🎉

Tinggal deploy Google Apps Script + update URL, langsung bisa digunakan!
