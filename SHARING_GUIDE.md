# 🌐 Cara Share Web App ke Atasan - Deploy Guide

Ada **4 opsi** untuk share web app ke atasan Anda. Pilih yang paling sesuai:

---

## ⭐ **OPSI 1: Netlify (RECOMMENDED - Paling Mudah)**

### Kelebihan:
✅ Gratis  
✅ Tidak perlu server  
✅ URL public (`https://nama-app.netlify.app`)  
✅ Auto-update dari folder  
✅ Custom domain bisa (berbayar)  

### Langkah-Langkah:

**1. Siapkan Folder Project**
```
Buat folder baru: D:\IFP-Dashboard\
Copy ke folder:
  - Monitoring.html
  - GAS_Code.gs (optional, referensi saja)
  - folder atau file pendukung
```

**2. Push ke GitHub** (gratis, akun Anda)
```powershell
# Di folder D:\IFP-Dashboard\

# Inisialisasi git
git init
git config user.email "you@example.com"
git config user.name "Your Name"

# Add semua file
git add .

# Commit
git commit -m "IFP Monitoring Dashboard"

# Buat repo baru di https://github.com/new (pilih Private atau Public)
# Copy URL repo (https://github.com/[USERNAME]/[REPO].git)

# Push ke GitHub
git remote add origin https://github.com/[USERNAME]/[REPO].git
git branch -M main
git push -u origin main
```

**3. Deploy ke Netlify**
```
1. Buka https://app.netlify.com/
2. Login dengan GitHub / Email
3. Click "New site from Git"
4. Pilih GitHub → Auth → Pilih repo yang baru dibuat
5. Configure build (biarkan default)
6. Click "Deploy"
7. Tunggu ~30 detik
8. Share URL Netlify ke atasan (format: https://[nama].netlify.app)
```

**4. Share ke Atasan**
```
Link yang dibagikan:
https://[nama-app].netlify.app/Monitoring.html
```

---

## ⭐ **OPSI 2: GitHub Pages (GRATIS + SIMPLE)**

### Kelebihan:
✅ Gratis selamanya  
✅ URL custom bisa  
✅ Tidak perlu Netlify  

### Langkah:

**1. Push ke GitHub** (sama seperti Opsi 1)

**2. Enable GitHub Pages**
```
1. Buka repo di GitHub
2. Settings → Pages
3. Source: "Deploy from branch"
4. Branch: main / root
5. Save
6. Tunggu ~1 menit
7. URL muncul: https://[username].github.io/[repo-name]
```

**3. Share ke Atasan**
```
https://[username].github.io/[repo-name]/Monitoring.html
```

---

## ⭐ **OPSI 3: Firebase Hosting (Cloud - Lebih Aman)**

### Kelebihan:
✅ Google-powered  
✅ Aman & reliable  
✅ Support custom domain  
✅ Analytics built-in  

### Langkah:

**1. Setup Firebase Project**
```
1. Buka https://console.firebase.google.com
2. Create new project (atau gunakan project Apps Script)
3. Hosting → Get started
4. Install Firebase CLI:
   npm install -g firebase-tools
5. Login:
   firebase login
```

**2. Deploy**
```powershell
cd D:\IFP-Dashboard\

# Init firebase
firebase init hosting

# Pilih project (project Apps Script Anda)
# Public folder: . (atau sesuaikan)

# Deploy
firebase deploy

# Selesai! Link muncul
```

**3. Share ke Atasan**
```
https://[project-id].web.app/Monitoring.html
```

---

## ⭐ **OPSI 4: Server Lokal + Network Share (Untuk Internal Network)**

### Kelebihan:
✅ Tidak perlu internet  
✅ Cocok untuk internal company  
✅ Kontrol penuh  

### Langkah:

**1. Setup Server di Komputer Anda**
```powershell
cd "C:\Users\[USERNAME]\Documents\Teknisi TV Hisense Prabowo\Aplikasi Report"

# Jalankan server (permanent)
python -m http.server 8000
```

**2. Dapatkan IP Address Komputer**
```powershell
# Di terminal
ipconfig

# Cari "IPv4 Address" (contoh: 192.168.1.100)
```

**3. Share URL ke Atasan (via network)**
```
Format: http://[IP_ADDRESS]:8000/Monitoring.html
Contoh: http://192.168.1.100:8000/Monitoring.html
```

**4. Pastikan:**
- ✅ Server tetap running
- ✅ Firewall allow port 8000 (optional: Windows Defender)
- ✅ Atasan terhubung ke network/WiFi yang sama

---

## 📊 **Perbandingan Opsi**

| Opsi | Biaya | Setup | Reliability | Rekomendasi |
|------|-------|-------|------------|------------|
| Netlify | Gratis | Mudah | Sangat Baik | ⭐ Pilih ini (umum) |
| GitHub Pages | Gratis | Mudah | Baik | ⭐ Pilih ini (simple) |
| Firebase | Gratis* | Medium | Sangat Baik | ✅ Pilih ini (profesional) |
| Network Local | Gratis | Sangat Mudah | Depends | ✅ Untuk internal saja |

*Firebase gratis untuk usage kecil

---

## 🎯 **Rekomendasi Singkat**

### Untuk atasan di tempat kerja yang sama?
→ **Opsi 4** (Network lokal) — paling cepat & mudah

### Untuk atasan di tempat lain / VPN?
→ **Opsi 1 (Netlify)** atau **Opsi 2 (GitHub Pages)** — paling praktis

### Untuk production / security lebih ketat?
→ **Opsi 3 (Firebase Hosting)** — paling reliable

---

## 🔐 **Keamanan & Permission**

### Jika Spreadsheet harus tetap private:

**Option A: Gunakan Service Account** (advanced)
```
1. Buat service account di Google Cloud Console
2. Share spreadsheet ke service account email
3. Ubah GAS_Code.gs untuk auth dengan service account
4. Deploy ulang
5. Public web app tetap aman (data hanya accessible via Apps Script)
```

**Option B: Gunakan Authentication (JWT/OAuth)**
```
Tambah login form di Monitoring.html
Hanya authorized users bisa lihat data
```

---

## 📝 **Step-by-Step Recommendation untuk Anda**

Jika ingin **tercepat & teraman**, ikuti **Opsi 2 (GitHub Pages)**:

### 1. Buat GitHub Account (jika belum)
```
https://github.com/signup
```

### 2. Create Repository
```
https://github.com/new
Nama: ifp-monitoring-dashboard
Visibility: Private (atau Public)
```

### 3. Push File ke GitHub
```powershell
cd "C:\Users\kikid\Documents\Project IFP 2026 Batch 2\Aplikasi Report"

git init
git config user.email "[email@example.com]"
git config user.name "[Nama Anda]"
git add Monitoring.html
git commit -m "IFP Dashboard"
git remote add origin https://github.com/[USERNAME]/ifp-monitoring-dashboard.git
git branch -M main
git push -u origin main
```

### 4. Enable GitHub Pages
```
Buka repo → Settings → Pages
Branch: main, folder: root
Save
```

### 5. Share ke Atasan
```
Link: https://[USERNAME].github.io/ifp-monitoring-dashboard/Monitoring.html
```

---

## ✅ **Checklist Sebelum Share**

```
□ Spreadsheet sudah public (Share → Anyone)
□ API_URL di Monitoring.html benar
□ Apps Script sudah di-deploy & authorize
□ Test dashboard lokal dulu (http://localhost:8000)
□ Data muncul dengan benar
□ Search & refresh berfungsi
□ Siap share ke atasan ✅
```

---

## 🆘 **Troubleshoot**

**URL tidak bisa diakses atasan?**
- Cek: Spreadsheet public?
- Cek: Apps Script URL authorized?
- Cek: Network/firewall tidak block port 8000 (jika opsi 4)

**Data tidak muncul di URL public?**
- Test dulu di console (F12)
- Pastikan API_URL benar
- Cek CORS settings

---

**Pilih opsi di atas dan let me know kalau ada yang perlu bantuan!** 👍
