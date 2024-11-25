import http.server
import socketserver
import emoji
# This is an test for a simple local server 


PORT = 4800

Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print("serving at port", PORT)
    httpd.serve_forever()
