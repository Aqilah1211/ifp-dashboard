# 📊 Cara Import Data dari Spreadsheet - Panduan Lengkap

## 🎯 Overview

Data **TIDAK perlu di-import manual** — sistem otomatis **menarik data (fetch) langsung dari Spreadsheet** setiap 30 detik.

Ada 2 cara:

### **Cara 1: Via Google Apps Script Web App (RECOMMENDED)**
- Data ditarik via API endpoint yang sudah dideploy
- **Sudah jadi di project Anda!** (lihat di `Monitoring.html` baris 117)
- Lebih aman dan efisien

### **Cara 2: Fallback ke Google Sheets CSV**
- Jika Apps Script belum ready, sistem otomatis fallback ke CSV
- Memerlukan Spreadsheet harus public

---

## ✅ Setup Data Source (Spreadsheet)

### Step 1: Pastikan Spreadsheet Sudah Public

1. Buka Spreadsheet Anda di Google Sheets:
   ```
   https://docs.google.com/spreadsheets/d/1UxSvet7BwwgYec5b4kN4bT5zquYU2rOPSBNFXqVgJa4/
   ```

2. Klik **Share** (tombol di atas kanan)

3. Di popup, ubah permission ke:
   - **"Anyone with the link can view"** ✅
   - (atau "Public on the web" untuk lebih permissive)

4. Copy link jika diperlukan (tapi di code sudah ada)

### Step 2: Verifikasi Struktur Sheet

Sheet harus bernama **`MASTER`** dan punya kolom:

| Index | Kolom | Digunakan Untuk |
|-------|-------|-----------------|
| C (2) | NPSN | Nomor Pokok Sekolah Nasional |
| D (3) | Nama Sekolah | Nama lengkap sekolah |
| G (6) | Status | Status instalasi (cek: "terpasang" vs "belum pasang") |
| H (7) | Kendala/Detail | Pesan kendala/trouble (yang ditampilkan di table) |

**Contoh data yang benar:**

```
| Index | A | B | C (NPSN) | D (Nama) | E | F | G (Status) | H (Kendala) |
|-------|---|---|----------|----------|---|---|-----------|-------------|
| 0 | ... | ... | 10370001 | SD Maju | ... | ... | Terpasang | - |
| 1 | ... | ... | 10370002 | SMP Jaya | ... | ... | Belum Pasang | - |
| 2 | ... | ... | 10370003 | SMA Harapan | ... | ... | Terpasang | Layar rusak |
```

---

## 🔌 Cara Kerja Import Data

### Flow Otomatis:

```
Dashboard (Monitoring.html)
    ↓
Fetch ke API_URL setiap 30 detik (atau manual click)
    ↓
Google Apps Script (GAS_Code.gs)
    ↓
Buka Spreadsheet + compute hash
    ↓
Return JSON + data rows
    ↓
Dashboard parse + tampilkan
```

### Kode yang Menjalankan Import:

**Di Monitoring.html** (baris 150-180), fungsi `fetchSheetData()` yang:
1. Kirim request ke `API_URL` (Apps Script endpoint)
2. Terima response JSON dengan `{rows: [...], hash: "...", changed: true/false}`
3. Parse rows
4. Tampilkan di table

---

## 🔧 Konfigurasi API_URL

Untuk mengubah data source, edit di **Monitoring.html** baris 117:

```javascript
// SAAT INI (Apps Script - Recommended):
const API_URL = 'https://script.google.com/macros/s/AKfycby-HnH7NBFI9eLWNn2RVssnLr1DotsNicZUp5A_UNgWHQ5-69VyLdwGSyO7ohUtpJPd/exec';

// FALLBACK (Direct CSV - jika Apps Script belum ready):
// const API_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tqx=out:csv&sheet=${SHEET_NAME}`;
```

---

## 📋 Troubleshooting Import Data

### ❌ Problem: "Gagal memuat data"

**Cek:**
1. ✅ Spreadsheet sudah public? (Share → Anyone can view)
2. ✅ Sheet bernama `MASTER`?
3. ✅ API_URL benar?
4. ✅ Apps Script sudah di-authorize?

**Solusi:**
```javascript
// Di browser console (F12), jalankan:
fetch('https://script.google.com/macros/s/[URL_ANDA]/exec')
  .then(r => r.json())
  .then(d => console.log(d))
  .catch(e => console.error('Error:', e));

// Harusnya return: {rows: [[...],[...],...], hash: "abc123", changed: true}
```

### ❌ Problem: Data tidak update

**Cek:**
1. ✅ Auto-refresh aktif? (icon jam di header terang)
2. ✅ Kolom H (Kendala) ada nilai?
3. ✅ Klik manual refresh (icon ⟳)

---

## 🚀 Cara Mengubah Data Source

Jika ingin fetch dari spreadsheet **lain**:

### Option A: Ubah SPREADSHEET_ID

Di **Monitoring.html** baris 114-115:
```javascript
const SPREADSHEET_ID = '1UxSvet7BwwgYec5b4kN4bT5zquYU2rOPSBNFXqVgJa4';  // ← Ganti ID-nya
const SHEET_NAME = 'MASTER';  // ← Ganti nama sheet jika berbeda
```

Kemudian di **GAS_Code.gs** baris 5-6, ganti juga:
```javascript
const SPREADSHEET_ID = '1UxSvet7BwwgYec5b4kN4bT5zquYU2rOPSBNFXqVgJa4';  // ← Sama dengan di HTML
const SHEET_NAME = 'MASTER';  // ← Sama dengan di HTML
```

Deploy ulang Apps Script.

### Option B: Tidak pakai Apps Script (Direct CSV)

Jika gak ingin deploy Apps Script, bisa langsung ke CSV:

```javascript
// Di Monitoring.html baris 117, ganti dengan:
const API_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=${SHEET_NAME}`;
```

**Kekurangan:**
- Tidak bisa detect perubahan (akan fetch full data setiap 30s)
- CORS bisa jadi issue di beberapa browser

---

## 📱 Fitur Fetch Data

| Fitur | Keterangan |
|-------|-----------|
| **Auto-Refresh** | Setiap 30 detik (bisa di-toggle) |
| **Manual Refresh** | Klik icon ⟳ di header |
| **Change Detection** | Hash-based (hanya update jika data berubah) |
| **Highlight Baru** | Kendala baru di-highlight kuning 2 detik |
| **Search** | Filter by NPSN atau Nama Sekolah real-time |
| **Timestamp** | "Last updated" terlihat di header |

---

## 🔐 Keamanan

⚠️ **INGAT**: Karena Spreadsheet public, pastikan:
- ✅ Tidak ada data sensitif (PII, password, dll)
- ✅ Hanya data instalasi & status yang visible
- ✅ Untuk data sensitif, gunakan server auth terpisah

---

## 📞 Quick Reference

**Format Data Diharapkan:**
```json
{
  "rows": [
    ["Header", "NPSN", "Nama", ..., "Status", "Kendala"],
    ["", "10370001", "SD Maju", ..., "Terpasang", "-"],
    ["", "10370002", "SMP Jaya", ..., "Belum Pasang", "Delay pengiriman barang"]
  ],
  "hash": "md5hash123",
  "changed": true
}
```

**Kolom Index (sesuaikan sesuai sheet Anda):**
```
rows[i][2]  → NPSN
rows[i][3]  → Nama Sekolah
rows[i][6]  → Status
rows[i][7]  → Kendala
```

Jika kolom berbeda, edit di **Monitoring.html** baris 165-168.

---

**Butuh bantuan?** Pastikan Spreadsheet sudah public, lalu test di browser console! 👍
