#!/usr/bin/env python3
"""
Simple HTTP Server untuk IFP Monitoring Dashboard
Jalankan: python run_server.py
Atau: python -m http.server 8000

Akses: http://localhost:8000/Monitoring.html
"""

import http.server
import socketserver
import os
import sys
import socket
from pathlib import Path

# Configure stdout for Windows console UTF-8 safety
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

PORT = 8000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """Serve files dengan default ke Monitoring.html"""
    
    def end_headers(self):
        # Prevent caching untuk development
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

def get_local_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return "localhost"

class ThreadedHTTPServer(socketserver.ThreadingMixIn, http.server.HTTPServer):
    daemon_threads = True
    allow_reuse_address = True

def start_server():
    """Start HTTP server di port 8000"""
    script_dir = Path(__file__).parent.absolute()
    os.chdir(script_dir)
    
    handler = MyHTTPRequestHandler
    local_ip = get_local_ip()

    try:
        with ThreadedHTTPServer(("", PORT), handler) as httpd:
            print("==================================================")
            print("[OK] Server IFP Monitoring Dashboard Berjalan!")
            print(f"Direktori: {script_dir}")
            print(f"Komputer Anda      : http://localhost:{PORT}/Monitoring.html")
            print(f"Teman (Satu Wi-Fi) : http://{local_ip}:{PORT}/Monitoring.html")
            print("Tekan Ctrl+C untuk berhenti")
            print("==================================================\n")
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n[OK] Server stopped")
        sys.exit(0)
    except OSError as e:
        if getattr(e, 'errno', None) in (48, 98, 10048):  # Port in use
            print(f"[!] Port {PORT} sudah digunakan.")
        else:
            print(f"[!] Error: {e}")
        sys.exit(1)

if __name__ == '__main__':
    start_server()
