Panduan deploy Google Apps Script (Web App) untuk Monitoring

1) Buka Google Drive dan buat script baru:
   - drive.google.com -> New -> More -> Google Apps Script

2) Salin isi `GAS_Code.gs` (file ini) ke editor Apps Script.
   - Pastikan `SPREADSHEET_ID` dan `SHEET_NAME` sesuai spreadsheet Anda.

3) Save project. Beri nama mis. "IFP Monitoring API".

4) Deploy sebagai Web App:
   - Menu `Deploy` -> `New deployment`.
   - Pilih `Web app`.
   - Description: "IFP Monitoring API".
   - Execute as: `Me` (kode akan berjalan dengan akses Anda ke spreadsheet).
   - Who has access: `Anyone` or `Anyone, even anonymous` (pilih ini jika Anda ingin fetch tanpa OAuth).
   - Klik `Deploy` dan catat URL `https://script.google.com/macros/s/AKfycb.../exec`.

5) Ubah `API_URL` di `Monitoring.html` menjadi URL Web App tersebut.
   - Contoh: const API_URL = 'https://script.google.com/macros/s/AKfy.../exec';

6) Tes:
   - Buka `Monitoring.html` melalui server lokal (disarankan) atau coba dari browser.
   - Jika polling aktif, client akan mengirim `?hash=...` setiap request; server akan mengembalikan `{changed:false}` jika tidak ada perubahan.

Catatan CORS & akses:
- Sebaiknya buka `Monitoring.html` lewat HTTP (mis. `npx http-server` atau Live Server di VSCode) bukan `file://`.
- Jika Anda memilih `Anyone, even anonymous`, web app dapat di-fetch tanpa OAuth.

Opsional: Trigger/Push
- Jika Anda ingin notifikasi push (tanpa polling), Anda bisa membuat trigger atau script yang memanggil webhook eksternal ketika sheet berubah. Itu memerlukan server atau layanan pihak ketiga untuk menerima webhook.

Keamanan
- `Anyone, even anonymous` membuat data sheet dapat diakses publik via endpoint. Pastikan tidak ada data sensitif.

Butuh bantuan deploy atau saya yang ubah `API_URL` di `Monitoring.html` ke URL Web App Anda? Kirim URL deploy, saya bantu ubah file.