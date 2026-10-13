# 📚 Dokumentasi Lengkap - IFP Monitoring Dashboard

## 🎯 Ringkas: Cara Kerja

**Multi-Source Dashboard** — Bisa menggabungkan **banyak spreadsheet** dan **file CSV** sekaligus dalam satu dashboard.

### 3 Langkah Cepat:
1. ✅ Buka Monitoring.html di browser
2. ✅ Klik ikon 📊 (Kelola Sumber Data) di header
3. ✅ Tambah Spreadsheet ID atau Import CSV → Klik "Simpan & Refresh"

---

## 📖 File Dokumentasi

| File | Tujuan | Untuk Siapa |
|------|--------|------------|
| **[QUICK_IMPORT.md](QUICK_IMPORT.md)** | ⚡ Checklist 30 detik | Yang ingin langsung coba |
| **[IMPORT_DATA_GUIDE.md](IMPORT_DATA_GUIDE.md)** | 📊 Panduan detail + troubleshoot | Yang ingin paham cara kerjanya |
| **[ARCHITECTURE.md](ARCHITECTURE.md)** | 🏗️ Diagram flow + sequence | Developer / yang ingin detail teknis |
| **[DEPLOY_GUIDE.md](DEPLOY_GUIDE.md)** | 🚀 Setup Google Apps Script | Deploy pertama kali |
| **[SETUP_CHECKLIST.md](SETUP_CHECKLIST.md)** | ✅ Checklist lengkap | QA / verification |

---

## 🚀 Mulai dari Sini

### Pilihan A: Saya ingin langsung coba
→ Buka **[Monitoring.html](Monitoring.html)** di browser (double-click atau via server)
→ Klik ikon database di header → Tambah spreadsheet

### Pilihan B: Multi-Spreadsheet
→ Klik ikon 📊 di header
→ Paste beberapa Spreadsheet ID/URL satu per satu
→ Klik "Simpan & Refresh" → Semua data digabung otomatis

### Pilihan C: Import CSV
→ Klik ikon 📊 di header
→ Drag & drop file CSV (bisa banyak file sekaligus)
→ Klik "Simpan & Refresh"

---

## 📊 Data Flow (Ultra-Ringkas)

```
Spreadsheet 1 (public) ─┐
Spreadsheet 2 (public) ─┼─→ Monitoring.html ─→ Merge Data ─→ Dashboard
Spreadsheet N (public) ─┤
File CSV 1 ──────────────┤
File CSV 2 ──────────────┘
```

**Poin Penting:**
- ✅ Setiap Spreadsheet HARUS public (Share → Anyone)
- ✅ Bisa mix spreadsheet + CSV
- ✅ Mapping kolom bisa diatur di modal Kelola Sumber Data
- ✅ Sumber spreadsheet otomatis tersimpan di browser (localStorage)

---

## 📋 Mapping Kolom Default (Sesuai Format IFP)

| Data | Kolom di Spreadsheet | Index |
|------|---------------------|-------|
| NPSN | Kolom D | 3 |
| Nama Sekolah | Kolom I | 8 |
| Direktorat | Kolom B | 1 |
| Tanggal Selesai | Kolom T | 19 |
| Status | Kolom U | 20 |
| Keterangan/Kendala | Kolom V | 21 |

> **Catatan:** Mapping kolom bisa diubah via UI di modal "Kelola Sumber Data" → bagian "Mapping Kolom".

---

## 🔧 File Sumber Kode

| File | Fungsi | Lokasi |
|------|--------|--------|
| `GAS_Code.gs` | Server code (Google Apps Script) | `/GAS_Code.gs` |
| `Monitoring.html` | Frontend dashboard | `/Monitoring.html` |
| `run_server.py` | Local HTTP server runner | `/run_server.py` |

---

## ✨ Fitur Siap Pakai

- ✅ **Multi-Source**: Gabungkan banyak spreadsheet + CSV sekaligus
- ✅ **Import CSV**: Drag & drop file CSV langsung di browser
- ✅ **Source Manager**: UI untuk kelola semua sumber data
- ✅ **Column Mapping**: Atur mapping kolom sesuai format spreadsheet
- ✅ Real-time dashboard dengan 4 statistik
- ✅ Tabel kendala dengan highlight baru
- ✅ Auto-refresh 30 detik (bisa di-pause)
- ✅ Search/filter by NPSN atau Nama
- ✅ Filter tanggal untuk data terpasang
- ✅ Source tracking — lihat data berasal dari mana
- ✅ XSS protection (HTML escaping)
- ✅ Responsive design (mobile-friendly)
- ✅ Persistent settings via localStorage

---

## 🎯 Checklist Jika Ada Masalah

### Data tidak muncul?
```
□ Spreadsheet sudah public? (Share → Anyone)
□ Spreadsheet ID benar? (cek di Kelola Sumber Data)
□ Sheet name/number benar?
□ Mapping kolom sudah sesuai?
□ Klik refresh atau tunggu 30 detik
```

### Ingin tambah Spreadsheet baru?
```
1. Klik ikon 📊 di header
2. Paste Spreadsheet ID atau URL
3. Isi nama sheet (default: 1)
4. Klik "+ Tambah"
5. Klik "Simpan & Refresh"
```

---

## 📞 Referensi Cepat

**Test Server:**
```powershell
python -m http.server 8000
# Buka: http://localhost:8000/Monitoring.html
```

**Deploy Apps Script:**
```
1. Buka script.google.com
2. New project → Copy GAS_Code.gs
3. Deploy → Web App (Anyone, even anonymous)
4. Copy URL → Update API_URL di HTML
```

---

**Status: ✅ SIAP PAKAI**

Tinggal jamin Spreadsheet public dan mulai tracking! 🎉
