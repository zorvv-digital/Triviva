"""
Orphan file/folder cleanup utilities for the Triviva admin server.
All functions return a list of error strings (empty = fully successful).
"""

import json
import os
import shutil


def _read_json(path):
    try:
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return None


def sync_packages(data_dir, new_data, old_packages_path):
    """
    After saving packages.json, sync the modular packages_json/ files and
    packages_image/ folders so they match the new list exactly.

    Handles renames: if an ID changed but the title+location match an old
    entry, the detail file and image folder are renamed rather than deleted.
    """
    pkg_details_dir = os.path.join(data_dir, "packages", "packages_json")
    pkg_images_dir  = os.path.join(data_dir, "packages", "packages_image")
    errors = []

    new_ids = {p["id"] for p in new_data if p.get("id")}

    # Read previous package list to detect renames (caller passes path before overwrite)
    old_data = _read_json(old_packages_path) or []
    old_ids  = {p["id"] for p in old_data if p.get("id")}

    removed_ids = old_ids - new_ids
    added_ids   = new_ids - old_ids

    # Build title→old_id map for rename detection
    old_by_title = {p.get("title", ""): p["id"] for p in old_data if p.get("id")}
    new_by_id    = {p["id"]: p for p in new_data if p.get("id")}

    rename_map = {}   # old_id -> new_id
    for new_id in added_ids:
        title   = new_by_id.get(new_id, {}).get("title", "")
        old_id  = old_by_title.get(title)
        if old_id and old_id in removed_ids:
            rename_map[old_id] = new_id

    # ── Renames ──────────────────────────────────────────────────────────────
    for old_id, new_id in rename_map.items():
        old_detail = os.path.join(pkg_details_dir, f"{old_id}.json")
        new_detail = os.path.join(pkg_details_dir, f"{new_id}.json")
        if os.path.exists(old_detail) and not os.path.exists(new_detail):
            try:
                os.rename(old_detail, new_detail)
            except Exception as e:
                errors.append(f"Could not rename detail file '{old_id}' → '{new_id}': {e}")

        old_folder = os.path.join(pkg_images_dir, old_id)
        new_folder = os.path.join(pkg_images_dir, new_id)
        if os.path.exists(old_folder) and not os.path.exists(new_folder):
            try:
                os.rename(old_folder, new_folder)
            except Exception as e:
                errors.append(f"Could not rename image folder '{old_id}' → '{new_id}': {e}")

    truly_deleted = removed_ids - set(rename_map.keys())

    # ── Delete detail JSON files for truly deleted packages ───────────────────
    if os.path.exists(pkg_details_dir):
        for filename in os.listdir(pkg_details_dir):
            if not filename.endswith(".json"):
                continue
            pkg_id = filename[:-5]
            if pkg_id not in truly_deleted:
                continue
            path = os.path.join(pkg_details_dir, filename)
            try:
                os.remove(path)
                # Verify deletion actually happened (Windows file-lock check)
                if os.path.exists(path):
                    errors.append(
                        f"Failed to delete '{filename}' — file still exists. "
                        "It may be open in another program."
                    )
            except Exception as e:
                errors.append(f"Could not delete detail file '{filename}': {e}")

    # ── Delete image folders for truly deleted packages ───────────────────────
    if os.path.exists(pkg_images_dir):
        protected = {"uploads", "testimonials"}
        for folder in os.listdir(pkg_images_dir):
            if folder not in truly_deleted or folder in protected:
                continue
            folder_path = os.path.join(pkg_images_dir, folder)
            if not os.path.isdir(folder_path):
                continue
            try:
                shutil.rmtree(folder_path)
                if os.path.exists(folder_path):
                    errors.append(
                        f"Failed to delete image folder '{folder}' — "
                        "a file inside may be open in another program."
                    )
            except Exception as e:
                errors.append(f"Could not delete image folder '{folder}': {e}")

    return errors


def sync_perfect_destinations(data_dir, new_data):
    """Keep per-destination split files in sync with perfect_destinations.json."""
    dest_dir = os.path.join(data_dir, "perfect_destinations")
    os.makedirs(dest_dir, exist_ok=True)
    errors = []
    active_ids = set()

    for item in new_data:
        item_id = item.get("id")
        if not item_id:
            continue
        active_ids.add(item_id)
        split_path = os.path.join(dest_dir, f"{item_id}.json")
        existing   = _read_json(split_path) or {}
        existing.update({
            "location": item.get("name", ""),
            "rating":   item.get("rating", 5.0),
            "duration": item.get("details", ""),
            "image":    item.get("image", ""),
        })
        try:
            with open(split_path, "w", encoding="utf-8") as f:
                json.dump(existing, f, indent=2, ensure_ascii=False)
        except Exception as e:
            errors.append(f"Could not write '{item_id}.json': {e}")

    for filename in os.listdir(dest_dir):
        if filename.endswith(".json") and filename != "perfect_destinations.json":
            if filename[:-5] not in active_ids:
                try:
                    os.remove(os.path.join(dest_dir, filename))
                except Exception as e:
                    errors.append(f"Could not delete '{filename}': {e}")

    return errors


def sync_gallery(data_dir, new_data):
    """Remove gallery image files no longer referenced in gallery.json."""
    gallery_dir   = os.path.join(data_dir, "gallery")
    active_images = {
        os.path.basename(img.get("image", ""))
        for img in new_data.get("images", [])
    }
    errors = []

    if not os.path.exists(gallery_dir):
        return errors

    for filename in os.listdir(gallery_dir):
        if not filename.lower().endswith((".png", ".jpg", ".jpeg", ".webp", ".gif")):
            continue
        if filename not in active_images:
            try:
                os.remove(os.path.join(gallery_dir, filename))
            except Exception as e:
                errors.append(f"Could not delete gallery image '{filename}': {e}")

    return errors


def sync_vehicles(data_dir, new_data):
    """Remove vehicle images no longer referenced in vehicles.json."""
    vehicles_img_dir = os.path.join(data_dir, "vehicles", "vehicles_image")
    active_images    = {os.path.basename(v.get("image", "")) for v in new_data}
    errors = []

    if not os.path.exists(vehicles_img_dir):
        return errors

    for filename in os.listdir(vehicles_img_dir):
        if not filename.lower().endswith((".png", ".jpg", ".jpeg", ".webp", ".gif")):
            continue
        if filename not in active_images:
            try:
                os.remove(os.path.join(vehicles_img_dir, filename))
            except Exception as e:
                errors.append(f"Could not delete vehicle image '{filename}': {e}")

    return errors
