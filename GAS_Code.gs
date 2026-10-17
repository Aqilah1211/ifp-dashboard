// Google Apps Script: Web App to return sheet data with cell background colors & status tagging
// Mendeteksi otomatis:
// 1. Warna MERAH = Hangus ke Turn Over Kantor (tidak termasuk unit yang didapat)
// 2. Warna KUNING = Darurat Instalasi (harus segera selesai hari ini juga)

const SPREADSHEET_ID = '1NjipAIoPF5DD1TEDTNRzVADDmtPLyvVHw2muXPMMeRU';
const SHEET_NAME = ''; // Kosongkan jika ingin menggunakan sheet pertama, atau isi nama sheet misal 'IFP PENDING'

// Helper deteksi warna merah (Turn Over / Hangus oleh kantor)
function isRedColor(hex) {
  if (!hex || hex === '#ffffff' || hex === '#000000') return false;
  hex = hex.toLowerCase().trim();
  const redPalette = [
    '#f4cccc', '#ea9999', '#e06666', '#cc0000', '#990000',
    '#ff0000', '#ea4335', '#fce5cd', '#dd7e6b', '#e6b8af',
    '#ff4d4f', '#cf1322', '#ff7875', '#f5222d', '#a8071a'
  ];
  if (redPalette.includes(hex)) return true;
  if (hex.startsWith('#') && hex.length === 7) {
    const r = parseInt(hex.substr(1, 2), 16);
    const g = parseInt(hex.substr(3, 2), 16);
    const b = parseInt(hex.substr(5, 2), 16);
    // Dominan merah: R tinggi, G dan B rendah
    if (r > 185 && g < 145 && b < 145) return true;
  }
  return false;
}

// Helper deteksi warna kuning (Darurat Instalasi Selesai Hari Ini)
function isYellowColor(hex) {
  if (!hex || hex === '#ffffff' || hex === '#000000') return false;
  hex = hex.toLowerCase().trim();
  const yellowPalette = [
    '#fff2cc', '#ffe599', '#ffd966', '#f1c232', '#bf9000',
    '#ffff00', '#fbbc04', '#fce8b2', '#ffeb3b', '#fff566',
    '#ffec3d', '#d4b106', '#faad14', '#ffe58f', '#fffbe6'
  ];
  if (yellowPalette.includes(hex)) return true;
  if (hex.startsWith('#') && hex.length === 7) {
    const r = parseInt(hex.substr(1, 2), 16);
    const g = parseInt(hex.substr(3, 2), 16);
    const b = parseInt(hex.substr(5, 2), 16);
    // Dominan kuning: R dan G tinggi, B rendah
    if (r > 190 && g > 165 && b < 140) return true;
  }
  return false;
}

function doGet(e) {
  const ss = SPREADSHEET_ID ? SpreadsheetApp.openById(SPREADSHEET_ID) : SpreadsheetApp.getActiveSpreadsheet();
  const sheet = SHEET_NAME ? (ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0]) : ss.getSheets()[0];
  
  const range = sheet.getDataRange();
  const values = range.getValues();
  const backgrounds = range.getBackgrounds();

  // Evaluasi status tag berdasarkan warna background setiap baris
  const tags = [];
  for (let i = 0; i < values.length; i++) {
    if (i === 0) {
      tags.push('header');
      continue;
    }
    let rowTag = 'normal';
    const rowBgs = backgrounds[i] || [];
    for (let c = 0; c < rowBgs.length; c++) {
      const bg = rowBgs[c];
      if (isRedColor(bg)) {
        rowTag = 'turnover'; // Merah: Hangus / Turn Over Kantor
        break;
      } else if (isYellowColor(bg)) {
        rowTag = 'darurat'; // Kuning: Darurat Instalasi Hari Ini
      }
    }
    tags.push(rowTag);
  }

  // Jika client meminta CSV via parameter ?format=csv
  if (e && e.parameter && e.parameter.format === 'csv') {
    // Sisipkan kolom "Status Warna / Kategori" di baris CSV
    const csvRows = values.map((r, i) => {
      const extraTag = i === 0 ? 'Kategori Khusus' : (tags[i] === 'turnover' ? 'HANGUS_TURNOVER' : (tags[i] === 'darurat' ? 'DARURAT_HARI_INI' : ''));
      const combined = [...r, extraTag];
      return combined.map(c => '"' + String(c).replace(/"/g, '""') + '"').join(',');
    });
    const output = ContentService.createTextOutput(csvRows.join('\n'));
    output.setMimeType(ContentService.MimeType.CSV);
    return output;
  }

  const payload = {
    rows: values,
    tags: tags,
    backgrounds: backgrounds
  };

  // MD5 hash untuk anti-cache & change detection
  const json = JSON.stringify(payload);
  const digest = Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, json);
  const hash = digest.map(b => (b < 0 ? b + 256 : b).toString(16).padStart(2, '0')).join('');
  payload.hash = hash;

  if (e && e.parameter && e.parameter.hash && e.parameter.hash === hash) {
    payload.changed = false;
    payload.rows = [];
    payload.tags = [];
    payload.backgrounds = [];
  } else {
    payload.changed = true;
  }

  const output = ContentService.createTextOutput(JSON.stringify(payload));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}