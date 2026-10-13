# 📤 Deploy ke GitHub Pages - Step by Step

## 🎯 Target: Share Web App via GitHub Pages

**Hasil akhir yang akan didapat:**
```
Link: https://[username-anda].github.io/ifp-dashboard/Monitoring.html

Contoh:
https://john-doe.github.io/ifp-dashboard/Monitoring.html
```

---

## ✅ STEP 1: Buat GitHub Account (5 menit - jika belum punya)

1. Buka https://github.com/signup
2. Isi email, password, username
3. Verify email dari inbox
4. Done ✅

**Ingat username Anda untuk STEP 3**

---

## ✅ STEP 2: Buat Repository Baru (2 menit)

1. Buka https://github.com/new
2. Isi form:
   - **Repository name**: `ifp-dashboard`
   - **Description**: IFP Monitoring Dashboard
   - **Visibility**: Public (agar bisa di-access semua orang)
3. **Jangan** checklist "Initialize this repository with a README"
4. Klik **Create repository**
5. Copy URL yang muncul (contoh: `https://github.com/[username]/ifp-dashboard.git`)

---

## ✅ STEP 3: Push File via Git (3 menit)

**Pastikan Git sudah installed:**
```powershell
git --version
```

Jika belum, download dari https://git-scm.com/download/win

**Lalu jalankan di PowerShell:**

```powershell
# 1. Masuk ke folder project
cd "C:\Users\kikid\Documents\Project IFP 2026 Batch 2\Aplikasi Report"

# 2. Inisialisasi git repo
git init

# 3. Set config (ganti dengan data Anda)
git config user.email "email-anda@example.com"
git config user.name "Nama Anda"

# 4. Add file (Monitoring.html adalah file utama)
git add Monitoring.html

# 5. Commit
git commit -m "Initial commit - IFP Dashboard"

# 6. Tambah remote origin (ganti dengan URL dari STEP 2)
git remote add origin https://github.com/[USERNAME]/ifp-dashboard.git

# 7. Rename branch ke main (standard di GitHub)
git branch -M main

# 8. Push ke GitHub
git push -u origin main
```

**Output yang diharapkan:**
```
Enumerating objects: 3, done.
Counting objects: 100% (3/3), done.
Writing objects: 100% (3/3), ...
...
To https://github.com/[USERNAME]/ifp-dashboard.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

✅ File sudah di GitHub!

---

## ✅ STEP 4: Enable GitHub Pages (2 menit)

1. Buka repository Anda di GitHub:
   ```
   https://github.com/[USERNAME]/ifp-dashboard
   ```

2. Klik tab **Settings** (di bagian atas)

3. Di sidebar kiri, klik **Pages**

4. Di bagian "Build and deployment":
   - **Source**: Pilih "Deploy from a branch"
   - **Branch**: Pilih "main" dan folder "/ (root)"
   - Klik **Save**

5. Tunggu ~1-2 menit. Akan muncul pesan:
   ```
   Your site is live at https://[username].github.io/ifp-dashboard/
   ```

✅ Web app sudah live!

---

## ✅ STEP 5: Share ke Atasan (1 menit)

**Link yang dibagikan ke atasan:**
```
https://[USERNAME].github.io/ifp-dashboard/Monitoring.html
```

**Contoh konkret:**
```
Kalau username GitHub Anda: john-doe
Link jadi: https://john-doe.github.io/ifp-dashboard/Monitoring.html
```

---

## 📋 Pre-Check Sebelum Share

```
✅ Spreadsheet sudah public (Share → Anyone)
✅ Sheet bernama "MASTER"
✅ Kolom: C=NPSN, D=Nama, G=Status, H=Kendala
✅ Apps Script sudah deployed & authorized
✅ Test dashboard lokal dulu (http://localhost:8000)
✅ Data muncul dengan benar di dashboard lokal
```

---

## 🔍 Test Link

Setelah push ke GitHub Pages, test akses link:

1. Buka browser
2. Paste link: `https://[USERNAME].github.io/ifp-dashboard/Monitoring.html`
3. Harusnya muncul dashboard ✅

**Jika tidak muncul:**
- Tunggu 2-3 menit (GitHub Pages perlu waktu process)
- Refresh page (Ctrl+F5)
- Cek Setting → Pages status

---

## 🆘 Troubleshoot

### ❌ "404 Not Found"
- **Solusi 1:** Tunggu 2-3 menit, refresh lagi
- **Solusi 2:** Cek setting → Pages → pastikan branch: main, folder: root
- **Solusi 3:** Pastikan file `Monitoring.html` sudah ter-push (lihat di GitHub)

### ❌ "Failed to push"
- **Solusi:** Cek credential GitHub. Biasanya perlu Personal Access Token:
  1. Buka https://github.com/settings/tokens
  2. Click "Generate new token"
  3. Scope: `repo`
  4. Copy token
  5. Saat push, gunakan token sebagai password

### ❌ Data tidak muncul di dashboard
- Cek: Spreadsheet public?
- Cek: Apps Script URL benar di `API_URL`?
- Buka console (F12) → lihat error

---

## 📱 Share ke Atasan via Whatsapp/Email

**Format yang bisa di-share:**

**Email:**
```
Halo Pak,

Dashboard IFP Monitoring sudah ready. Link untuk akses:
https://[USERNAME].github.io/ifp-dashboard/Monitoring.html

Dashboard menampilkan:
- Total sekolah terpasang
- Status instalasi (Terpasang/Belum Pasang)
- Daftar kendala/trouble dari spreadsheet
- Update real-time setiap 30 detik

Akses bisa dari laptop/desktop di mana saja.

Terima kasih
```

**Whatsapp:**
```
Pak, dashboard IFP sudah live di:
https://[USERNAME].github.io/ifp-dashboard/Monitoring.html

Bisa akses dari desktop browser. Dashboard auto-update setiap 30 detik dari spreadsheet.
```

---

## 🔄 Update Setelah Deploy

Jika nanti mau update file `Monitoring.html`:

```powershell
# 1. Edit file Monitoring.html di VSCode
# 2. Lalu di PowerShell:

cd "C:\Users\kikid\Documents\Project IFP 2026 Batch 2\Aplikasi Report"

# 3. Add & commit
git add Monitoring.html
git commit -m "Update dashboard"

# 4. Push
git push origin main
```

GitHub Pages akan auto-update ~1-2 menit kemudian ✅

---

## ✨ Selesai!

Web app Anda sekarang bisa diakses dari mana saja via link GitHub Pages. 

**Tinggal share link ke atasan dan selesai!** 🎉

Pertanyaan? Tanya saja 👍
