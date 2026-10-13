import urllib.request
import csv
import io

url = 'https://docs.google.com/spreadsheets/d/1UuY3tN0jYFn7FOm_6nuyMza4dXH6uYfwG7Bff7TkOJY/gviz/tq?tqx=out:csv&sheet=1550281623'
try:
    with urllib.request.urlopen(url, timeout=5) as response:
        data = response.read().decode('utf-8')
        reader = csv.reader(io.StringIO(data))
        header = next(reader)
        
        # Ambil sampel 10 data
        count = 0
        print('\n=== SAMPEL DATA SPREADSHEET ===')
        print('Kolom Selesai (index 19) - Format Tanggal:')
        print('-' * 80)
        for row in reader:
            if count >= 10:
                break
            if len(row) > 20 and row[3]:  # NPSN ada
                npsn = row[3]
                nama = row[8] if len(row) > 8 else ""
                selesai = row[19] if len(row) > 19 else ""
                status = row[20] if len(row) > 20 else ""
                
                print(f'NPSN: {npsn}')
                print(f'  Nama: {nama[:40]}')
                print(f'  Selesai: "{selesai}" (length: {len(selesai)})')
                print(f'  Status: {status}')
                print()
                count += 1
except Exception as e:
    print(f'Error: {e}')
