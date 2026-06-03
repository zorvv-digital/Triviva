#!/usr/bin/env python3
"""
Triviva Admin Utility — Image Converter.
Recursively converts all JPEG, PNG, etc. files in the public data directory
to WebP with low compression (high quality) and updates all JSON references.
"""

import os
import json
import re
from PIL import Image

PROJECT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(PROJECT_DIR, "public", "data")
BACKUP_DIR = os.path.join(DATA_DIR, "backups")

CONVERTIBLE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".bmp", ".tiff"}

def replace_in_json_file(file_path, old_str, new_str):
    """Replace all instances of old_str with new_str in a JSON file."""
    if not os.path.exists(file_path):
        return False
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
        
        # Check if the string exists before writing
        if old_str in content:
            new_content = content.replace(old_str, new_str)
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(new_content)
            return True
    except Exception as e:
        print(f"  [Error] Failed to update references in {file_path}: {e}")
    return False

def update_all_json_references(old_url, new_url):
    """Find and update references in all editable JSON metadata files."""
    updated_files = []
    
    # List of direct files to scan
    json_files = [
        os.path.join(DATA_DIR, "offer.json"),
        os.path.join(DATA_DIR, "contact.json"),
        os.path.join(DATA_DIR, "testimonials.json"),
        os.path.join(DATA_DIR, "packages", "packages.json"),
        os.path.join(DATA_DIR, "stories", "last_trips.json"),
        os.path.join(DATA_DIR, "vehicles", "vehicles.json"),
        os.path.join(DATA_DIR, "perfect_destinations", "perfect_destinations.json"),
        os.path.join(DATA_DIR, "gallery", "gallery.json"),
    ]
    
    # Scan modular details directories recursively
    for root, _, files in os.walk(DATA_DIR):
        # Skip backup directories to avoid modifying backups
        if "backups" in root:
            continue
        for file in files:
            if file.endswith(".json"):
                full_path = os.path.join(root, file)
                if full_path not in json_files:
                    json_files.append(full_path)
                    
    for json_path in json_files:
        if replace_in_json_file(json_path, old_url, new_url):
            updated_files.append(os.path.relpath(json_path, PROJECT_DIR))
            
    return updated_files

def convert_to_webp(src_path, quality=90):
    """Convert an image to WebP with the specified quality."""
    dest_path = os.path.splitext(src_path)[0] + ".webp"
    try:
        with Image.open(src_path) as img:
            # Keep original format's alpha channel if present
            if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
                img.save(dest_path, "WEBP", quality=quality, lossless=False)
            else:
                # Convert to RGB if it has no alpha transparency
                img.convert("RGB").save(dest_path, "WEBP", quality=quality)
        return dest_path
    except Exception as e:
        print(f"  [Error] Failed to convert {src_path}: {e}")
        return None

def main():
    print("=" * 60)
    print(" Triviva Image WebP Converter Utility")
    print("=" * 60)
    print(f"Scanning directory: {DATA_DIR}\n")
    
    converted_count = 0
    reference_updates = 0
    
    for root, _, files in os.walk(DATA_DIR):
        # Skip the backup directory entirely
        if "backups" in root:
            continue
            
        for file in files:
            ext = os.path.splitext(file)[1].lower()
            if ext not in CONVERTIBLE_EXTENSIONS:
                continue
                
            src_path = os.path.join(root, file)
            print(f"Found: {os.path.relpath(src_path, PROJECT_DIR)}")
            
            # Convert to webp
            dest_path = convert_to_webp(src_path, quality=90)
            if dest_path:
                print(f"  -> Converted to: {os.path.relpath(dest_path, PROJECT_DIR)}")
                
                # Get the URLs as used in JSON configurations
                # Example: D:\Triviva\public\data\packages\packages_image\bali-bliss\pic.png 
                # Web URL: /data/packages/packages_image/bali-bliss/pic.png
                rel_to_public = os.path.relpath(src_path, os.path.join(PROJECT_DIR, "public"))
                old_web_url = "/" + rel_to_public.replace(os.sep, "/")
                new_web_url = "/" + os.path.relpath(dest_path, os.path.join(PROJECT_DIR, "public")).replace(os.sep, "/")
                
                # Update references in all JSON configs
                updated_configs = update_all_json_references(old_web_url, new_web_url)
                if updated_configs:
                    print(f"  -> Updated references in: {', '.join(updated_configs)}")
                    reference_updates += len(updated_configs)
                
                # Delete original
                try:
                    os.remove(src_path)
                    print(f"  -> Deleted original file")
                except Exception as e:
                    print(f"  [Warning] Could not delete original file {src_path}: {e}")
                
                converted_count += 1
                print()
                
    print("=" * 60)
    print(" Conversion Summary")
    print("=" * 60)
    print(f"  Images converted:    {converted_count}")
    print(f"  References updated:  {reference_updates}")
    print("=" * 60)
    print("Done!\n")

if __name__ == "__main__":
    main()
