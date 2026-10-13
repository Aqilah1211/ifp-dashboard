// Google Apps Script: Web App to return sheet data as JSON with optional change detection
// Cara pakai: deploy web app (Anyone, even anonymous) dan gunakan URLnya di `API_URL` di Monitoring.html

const SPREADSHEET_ID = '1E4UBDg9M0RKTvtJCXUOg4IWQmvl1mdmIqeN9CyRw5qs';
const SHEET_NAME = 'IFP PENDING';

function doGet(e) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(SHEET_NAME);
  const values = sheet.getDataRange().getValues(); // array of arrays

  const payload = { rows: values };

  // Hitung hash sederhana (MD5 dari JSON string)
  const json = JSON.stringify(values);
  const digest = Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, json);
  const hash = digest.map(b => (b < 0 ? b + 256 : b).toString(16).padStart(2, '0')).join('');
  payload.hash = hash;

  // Jika client mengirim ?hash=..., kita bisa langsung kembalikan changed:false untuk menghemat bandwidth
  if (e && e.parameter && e.parameter.hash && e.parameter.hash === hash) {
    payload.changed = false;
    // Untuk mengurangi ukuran response, Anda bisa mengosongkan rows ketika tidak berubah
    payload.rows = [];
  } else {
    payload.changed = true;
  }

  const output = ContentService.createTextOutput(JSON.stringify(payload));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

/*
Opsional: fungsi untuk mengembalikan data sebagai CSV (jika diperlukan)
function doGetCsv(e) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(SHEET_NAME);
  const values = sheet.getDataRange().getValues();
  const csv = values.map(r => r.map(c => '"' + String(c).replace(/"/g, '""') + '"').join(',')).join('\n');
  const output = ContentService.createTextOutput(csv);
  output.setMimeType(ContentService.MimeType.CSV);
  return output;
}
*/