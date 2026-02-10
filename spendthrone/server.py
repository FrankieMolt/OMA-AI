#!/usr/bin/env python3
"""
SpendThrone Static Server
Run on your Linux PC to serve the static site locally
"""

import http.server
import socketserver
import os
from pathlib import Path

PORT = 8000
DIRECTORY = Path(__file__).parent / "out"

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(DIRECTORY), **kwargs)
    
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()

if __name__ == "__main__":
    os.chdir(DIRECTORY)
    
    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        print(f"🧟‍♂️ SPENDTHRONE SERVER RUNNING!")
        print(f"👑 Local: http://localhost:{PORT}")
        print(f"🌐 Network: http://0.0.0.0:{PORT}")
        print(f"📁 Serving: {DIRECTORY}")
        print(f"\n💡 For remote access, run: ngrok http {PORT}")
        print(f"🛑 Press Ctrl+C to stop\n")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n🛑 Server stopped")