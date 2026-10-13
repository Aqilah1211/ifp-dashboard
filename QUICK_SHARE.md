# 🚀 QUICK SHARE - 5 Menit Siap Dibagikan

## ⚡ **Opsi Tercepat: GitHub Pages (RECOMMENDED)**

### STEP 1: Buat GitHub Account
Jika belum punya, daftar di https://github.com/signup

### STEP 2: Push File via Terminal
```powershell
cd "C:\Users\kikid\Documents\Project IFP 2026 Batch 2\Aplikasi Report"

git init
git config user.email "your@email.com"
git config user.name "Your Name"
git add Monitoring.html
git commit -m "IFP Dashboard"
git remote add origin https://github.com/[USERNAME]/ifp-dashboard.git
git branch -M main
git push -u origin main
```

### STEP 3: Enable Pages
```
Buka GitHub → Settings → Pages
Branch: main | Folder: root
Tunggu 1 menit...
```

### STEP 4: Share ke Atasan
```
Link: https://[USERNAME].github.io/ifp-dashboard/Monitoring.html

Contoh: https://john-doe.github.io/ifp-dashboard/Monitoring.html
```

---

## 🎯 **Alternatif: Network Lokal (Instant)**

Jika atasan di kantor yang sama:

```powershell
# Terminal di folder aplikasi
python -m http.server 8000

# Cek IP address
ipconfig
# Cari IPv4 Address (contoh: 192.168.1.100)

# Share ke atasan
# Link: http://192.168.1.100:8000/Monitoring.html
```

---

## 📋 **Pre-Check (Pastikan Ini OK)**

```
✅ Spreadsheet public (Share → Anyone)
✅ Sheet bernama "MASTER"
✅ Kolom: C=NPSN, D=Nama, G=Status, H=Kendala
✅ Apps Script sudah deployed & authorized
✅ API_URL di Monitoring.html benar
✅ Test lokal dulu (http://localhost:8000)
```

---

**Pilih opsi & let me know kalau butuh bantuan!** 👍

Untuk detail lebih, baca: [SHARING_GUIDE.md](SHARING_GUIDE.md)
