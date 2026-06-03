"""
Triviva Admin Server — modular HTTP backend.
Delegates cleanup to cleanup.py and publish to git_ops.py.
"""

import http.server
import json
import os
import socketserver
import urllib.parse
from datetime import datetime

from cleanup import (
    sync_gallery,
    sync_packages,
    sync_perfect_destinations,
    sync_vehicles,
)
from git_ops import generate_commit_message, git_publish

PORT        = 8090
PROJECT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR    = os.path.join(PROJECT_DIR, "public", "data")
BACKUP_DIR  = os.path.join(DATA_DIR, "backups")

os.makedirs(BACKUP_DIR, exist_ok=True)

EDITABLE_FILES = {
    "offer.json":                {"path": os.path.join(DATA_DIR, "offer.json"),                                     "label": "Exit-Intent Offers & Slashed Rates"},
    "contact.json":              {"path": os.path.join(DATA_DIR, "contact.json"),                                   "label": "Contact Info & Working Hours"},
    "testimonials.json":         {"path": os.path.join(DATA_DIR, "testimonials.json"),                              "label": "Customer Testimonials"},
    "packages.json":             {"path": os.path.join(DATA_DIR, "packages", "packages.json"),                      "label": "Travel Packages Catalog"},
    "last_trips.json":           {"path": os.path.join(DATA_DIR, "stories", "last_trips.json"),                     "label": "Curator Memory Stories"},
    "vehicles.json":             {"path": os.path.join(DATA_DIR, "vehicles", "vehicles.json"),                      "label": "Fleet & Vehicles List"},
    "perfect_destinations.json": {"path": os.path.join(DATA_DIR, "perfect_destinations", "perfect_destinations.json"), "label": "Perfect Destinations Grid"},
    "gallery.json":              {"path": os.path.join(DATA_DIR, "gallery", "gallery.json"),                        "label": "Gallery Media Catalog"},
}


class AdminAPIHandler(http.server.BaseHTTPRequestHandler):
    # Tracks which data files were modified since last publish (class-level, shared)
    modified_files: set = set()

    # ── Shared helpers ────────────────────────────────────────────────────────

    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin",  "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def _send_json(self, code, payload):
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.end_headers()
        self.wfile.write(body)

    def _send_error(self, code, message):
        self._send_json(code, {"success": False, "error": message})

    def _read_body(self):
        length = int(self.headers.get("Content-Length", 0))
        return self.rfile.read(length).decode("utf-8") if length else ""

    def _backup(self, file_id, file_path):
        """Create a timestamped backup before overwriting a file."""
        if not os.path.exists(file_path):
            return
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        base = file_id.rsplit(".", 1)[0]
        backup_path = os.path.join(BACKUP_DIR, f"{base}_{timestamp}.json")
        try:
            with open(file_path, "r", encoding="utf-8") as src, \
                 open(backup_path, "w", encoding="utf-8") as dst:
                dst.write(src.read())
        except Exception:
            pass  # Backup failure is non-fatal; proceed with save

    # ── GET ───────────────────────────────────────────────────────────────────

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path   = parsed.path
        query  = urllib.parse.parse_qs(parsed.query)

        if path == "/api/files":
            self._handle_list_files()
        elif path == "/api/file":
            self._handle_get_file(query)
        elif path == "/api/package-detail":
            self._handle_get_package_detail(query)
        elif path == "/api/modified":
            self._send_json(200, {"modified": list(self.modified_files)})
        elif path in ("/", "/admin", "/index.html"):
            self._serve_admin_html()
        else:
            self._serve_static(path)

    def _handle_list_files(self):
        self._send_json(200, [{"id": k, "label": v["label"]} for k, v in EDITABLE_FILES.items()])

    def _handle_get_file(self, query):
        file_id = query.get("name", [None])[0]
        if file_id not in EDITABLE_FILES:
            self._send_error(400, "Invalid or missing 'name' parameter.")
            return
        file_path = EDITABLE_FILES[file_id]["path"]
        if os.path.exists(file_path):
            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read()
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.end_headers()
            self.wfile.write(content.encode("utf-8"))
        else:
            # Return sensible empty defaults so the form doesn't break
            default = "[]" if file_id in ("testimonials.json", "last_trips.json", "perfect_destinations.json") else "{}"
            self._send_json(200, json.loads(default))

    def _handle_get_package_detail(self, query):
        pkg_id = query.get("id", [None])[0]
        if not pkg_id:
            self._send_error(400, "Missing 'id' parameter.")
            return
        clean_id  = os.path.basename(pkg_id).replace("..", "")
        detail_path = os.path.join(DATA_DIR, "packages", "packages_json", f"{clean_id}.json")
        if os.path.exists(detail_path):
            with open(detail_path, "r", encoding="utf-8") as f:
                self.send_response(200)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.end_headers()
                self.wfile.write(f.read().encode("utf-8"))
        else:
            self._send_json(200, {
                "included":  ["Tour Guide", "Hotel Booking", "Car Rental"],
                "itinerary": [{"day": "Day 1", "title": "Arrival", "description": "Arrive and check in."}],
                "gallery":   [],
                "lat": 0, "lng": 0
            })

    def _serve_admin_html(self):
        index_path = os.path.join(PROJECT_DIR, "admin", "index.html")
        if not os.path.exists(index_path):
            self._send_error(404, "Admin dashboard file not found.")
            return
        self.send_response(200)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.end_headers()
        with open(index_path, "r", encoding="utf-8") as f:
            self.wfile.write(f.read().encode("utf-8"))

    def _serve_static(self, path):
        if path.startswith("/admin/"):
            local_path = os.path.join(PROJECT_DIR, "admin", path[7:])
        else:
            local_path = os.path.join(PROJECT_DIR, "public", path.lstrip("/"))

        safe_path = os.path.normpath(local_path)
        if not safe_path.startswith(PROJECT_DIR):
            self._send_error(403, "Access denied.")
            return
        if not os.path.isfile(safe_path):
            self._send_error(404, "File not found.")
            return

        mime_map = {
            ".html": "text/html; charset=utf-8",
            ".css":  "text/css; charset=utf-8",
            ".js":   "application/javascript; charset=utf-8",
            ".json": "application/json; charset=utf-8",
            ".png":  "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
            ".webp": "image/webp", ".gif": "image/gif", ".svg": "image/svg+xml",
            ".ico":  "image/x-icon",
        }
        ext = os.path.splitext(safe_path)[1].lower()
        self.send_response(200)
        self.send_header("Content-Type", mime_map.get(ext, "application/octet-stream"))
        self.end_headers()
        with open(safe_path, "rb") as f:
            self.wfile.write(f.read())

    # ── POST ──────────────────────────────────────────────────────────────────

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        path   = parsed.path
        query  = urllib.parse.parse_qs(parsed.query)

        if path == "/api/file":
            self._handle_save_file(query)
        elif path == "/api/package-detail":
            self._handle_save_package_detail(query)
        elif path == "/api/upload":
            self._handle_upload(query)
        elif path == "/api/publish":
            self._handle_publish()
        else:
            self._send_error(404, "Endpoint not found.")

    def _handle_save_file(self, query):
        file_id = query.get("name", [None])[0]
        if file_id not in EDITABLE_FILES:
            self._send_error(400, "Invalid 'name' parameter.")
            return

        file_info = EDITABLE_FILES[file_id]
        file_path = file_info["path"]

        try:
            json_data = json.loads(self._read_body())
        except json.JSONDecodeError:
            self._send_error(400, "The data submitted is not valid JSON.")
            return

        # Read old packages.json BEFORE overwriting (needed for rename detection)
        old_packages_path = file_path if file_id == "packages.json" else None

        self._backup(file_id, file_path)

        # Ensure parent directory exists
        os.makedirs(os.path.dirname(file_path), exist_ok=True)

        try:
            with open(file_path, "w", encoding="utf-8") as f:
                json.dump(json_data, f, indent=2, ensure_ascii=False)
        except Exception as e:
            self._send_error(500, f"Could not write file: {e}")
            return

        # Run post-save sync for files that have modular counterparts
        cleanup_errors = []
        if file_id == "packages.json" and isinstance(json_data, list):
            cleanup_errors = sync_packages(DATA_DIR, json_data, old_packages_path)
        elif file_id == "perfect_destinations.json" and isinstance(json_data, list):
            cleanup_errors = sync_perfect_destinations(DATA_DIR, json_data)
        elif file_id == "gallery.json" and isinstance(json_data, dict):
            cleanup_errors = sync_gallery(DATA_DIR, json_data)
        elif file_id == "vehicles.json" and isinstance(json_data, list):
            cleanup_errors = sync_vehicles(DATA_DIR, json_data)

        # Track this file as modified (for commit message generation)
        AdminAPIHandler.modified_files.add(file_id)

        response = {"success": True, "message": "Saved successfully."}
        if cleanup_errors:
            # Return partial success — file was saved but some cleanup failed
            response["warnings"] = cleanup_errors
        self._send_json(200, response)

    def _handle_save_package_detail(self, query):
        pkg_id = query.get("id", [None])[0]
        if not pkg_id:
            self._send_error(400, "Missing 'id' parameter.")
            return

        clean_id    = os.path.basename(pkg_id).replace("..", "")
        detail_path = os.path.join(DATA_DIR, "packages", "packages_json", f"{clean_id}.json")

        try:
            json_data = json.loads(self._read_body())
        except json.JSONDecodeError:
            self._send_error(400, "The data submitted is not valid JSON.")
            return

        if os.path.exists(detail_path):
            timestamp   = datetime.now().strftime("%Y%m%d_%H%M%S")
            backup_path = os.path.join(BACKUP_DIR, f"{clean_id}_detail_{timestamp}.json")
            try:
                with open(detail_path, "r", encoding="utf-8") as src, \
                     open(backup_path, "w", encoding="utf-8") as dst:
                    dst.write(src.read())
            except Exception:
                pass

        os.makedirs(os.path.dirname(detail_path), exist_ok=True)
        try:
            with open(detail_path, "w", encoding="utf-8") as f:
                json.dump(json_data, f, indent=2, ensure_ascii=False)
        except Exception as e:
            self._send_error(500, f"Could not write package detail file: {e}")
            return

        AdminAPIHandler.modified_files.add("packages.json")
        self._send_json(200, {"success": True, "message": "Package details saved."})

    def _handle_upload(self, query):
        package_id = query.get("packageId", [None])[0]
        target     = query.get("target",    [None])[0]

        content_length = int(self.headers.get("Content-Length", 0))
        filename, file_body = self._parse_multipart(content_length)

        if not filename or not file_body:
            self._send_error(400, "Could not parse the uploaded image file.")
            return

        clean_name = os.path.basename(filename).replace(" ", "_")

        if package_id:
            clean_pkg = os.path.basename(package_id).replace("..", "")
            upload_dir = os.path.join(DATA_DIR, "packages", "packages_image", clean_pkg)
            web_url    = f"/data/packages/packages_image/{clean_pkg}/{clean_name}"
        elif target == "vehicles":
            upload_dir = os.path.join(DATA_DIR, "vehicles", "vehicles_image")
            web_url    = f"/data/vehicles/vehicles_image/{clean_name}"
        elif target == "stories":
            upload_dir = os.path.join(DATA_DIR, "stories")
            web_url    = f"/data/stories/{clean_name}"
        elif target == "gallery":
            upload_dir = os.path.join(DATA_DIR, "gallery")
            web_url    = f"/data/gallery/{clean_name}"
        elif target == "testimonials":
            upload_dir = os.path.join(DATA_DIR, "packages", "packages_image", "testimonials")
            web_url    = f"/data/packages/packages_image/testimonials/{clean_name}"
        else:
            upload_dir = os.path.join(DATA_DIR, "packages", "packages_image", "uploads")
            web_url    = f"/data/packages/packages_image/uploads/{clean_name}"

        os.makedirs(upload_dir, exist_ok=True)
        file_path = os.path.join(upload_dir, clean_name)

        try:
            with open(file_path, "wb") as f:
                f.write(file_body)
        except Exception as e:
            self._send_error(500, f"Could not save uploaded file: {e}")
            return

        self._send_json(200, {"success": True, "url": web_url})

    def _handle_publish(self):
        """Git add → commit (rule-based message) → push."""
        try:
            body = json.loads(self._read_body() or "{}")
        except Exception:
            body = {}

        # Use custom message if provided, otherwise auto-generate from modified files
        custom_msg  = (body.get("message") or "").strip()
        modified    = set(AdminAPIHandler.modified_files)
        commit_msg  = custom_msg or generate_commit_message(modified)

        success, detail = git_publish(PROJECT_DIR, commit_msg)

        if success:
            AdminAPIHandler.modified_files.clear()
            self._send_json(200, {
                "success":       True,
                "message":       "Changes published to GitHub successfully.",
                "commitMessage": commit_msg,
            })
        else:
            self._send_json(500, {
                "success": False,
                "error":   detail,
            })

    # ── Multipart parser ──────────────────────────────────────────────────────

    def _parse_multipart(self, content_length):
        try:
            content_type = self.headers.get("Content-Type", "")
            boundary     = content_type.split("boundary=")[1].encode()
            body         = self.rfile.read(content_length)

            for part in body.split(b"--" + boundary):
                if b"filename=" not in part:
                    continue
                headers_raw, file_body = part.split(b"\r\n\r\n", 1)
                file_body = file_body.rsplit(b"\r\n", 1)[0]
                filename  = ""
                for line in headers_raw.decode("utf-8", errors="replace").split("\r\n"):
                    if "filename=" in line:
                        filename = line.split("filename=")[1].strip('"')
                        break
                return filename, file_body
        except Exception as e:
            print(f"[upload] Multipart parse error: {e}")
        return None, None

    def log_message(self, fmt, *args):
        # Suppress default access logs to keep the console clean
        pass


class ThreadingHTTPServer(socketserver.ThreadingMixIn, http.server.HTTPServer):
    daemon_threads = True


if __name__ == "__main__":
    httpd = ThreadingHTTPServer(("", PORT), AdminAPIHandler)
    print(f"✓ Triviva Admin Server  →  http://localhost:{PORT}")
    print("  Press Ctrl+C to stop.\n")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down...")
        httpd.server_close()
