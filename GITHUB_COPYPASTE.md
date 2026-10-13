# 🚀 COPY-PASTE READY - GitHub Deployment Commands

## ⚡ Super Singkat - Hanya Tinggal Copy-Paste

### 1️⃣ Buka PowerShell & Masuk ke Folder

```powershell
cd "C:\Users\kikid\Documents\Project IFP 2026 Batch 2\Aplikasi Report"
```

### 2️⃣ Jalankan Perintah di Bawah (Ganti [USERNAME] dengan username GitHub Anda)

```powershell
git init
git config user.email "your-email@example.com"
git config user.name "Your Name"
git add Monitoring.html
git commit -m "IFP Dashboard"
git remote add origin https://github.com/[USERNAME]/ifp-dashboard.git
git branch -M main
git push -u origin main
```

### 3️⃣ GitHub Pages Setup (Manual)

1. Buka: https://github.com/[USERNAME]/ifp-dashboard
2. Settings → Pages
3. Branch: **main**, Folder: **/ (root)**
4. Save
5. Tunggu 1-2 menit

### 4️⃣ Link Siap Share

```
https://[USERNAME].github.io/ifp-dashboard/Monitoring.html
```

---

## 📋 Checklist

- [ ] Git sudah installed? (cek: `git --version`)
- [ ] GitHub account sudah buat? (https://github.com/signup)
- [ ] Tahu username GitHub? 
- [ ] Sudah ganti [USERNAME] di command di atas?
- [ ] Command sudah di-run?
- [ ] GitHub Pages sudah di-enable?
- [ ] Link bisa diakses?

---

## ✅ Selesai!

Link sudah bisa di-share ke atasan 🎉

Untuk detail lengkap, baca: [GITHUB_DEPLOY_FINAL.md](GITHUB_DEPLOY_FINAL.md)
