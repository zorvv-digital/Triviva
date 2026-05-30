# Travel Packages Data & Media Editing Guide

This guide explains how to add, modify, and manage travel packages, itineraries, images, and custom icons in the **Triviva** project without changing any frontend source code.

---

## 1. Package File-system Architecture

Packages are fully folder-dependent. Adding or managing a travel package is done entirely within the public assets directories.

All packages are defined as independent JSON files under:
📂 `public/data/packages/packages_json/[package-id].json`

When you add a new JSON file to this directory and run the project, the build tools automatically scan the folder to map media assets and compile a consolidated index file (`public/data/packages/packages.json`) which feeds the search filters and card listing grids.

---

## 2. Package Details & Listing Schema

Each package JSON file defines both its listing card metadata (filters, pricing, title) and its detailed itinerary schedules:

```json
{
  "title": "Magical Maldives",                  // Title displayed on cards & headers
  "location": "Male, Maldives",                 // Destination location subtitle
  "duration": "5 Days / 4 Nights",              // Travel duration subtitle
  "price": 95000,                               // Price integer (no currency symbols)
  "rating": 4.9,                                // Customer rating (e.g. 4.5 to 5.0)
  "description": "Short description text...",   // Used in cards and detail summary headers
  "region": "international",                   // Options: "domestic", "international"
  "categories": ["Beach", "Luxury", "Romantic"], // Travel styles used in listing page filters
  "priority": 1,                                // Sorting order (lower numbers appear first)
  "bestTimeToVisit": ["October", "November", "December"], // Best months to visit (for trending/seasonal suggestions)
  "highlights": [                               // Highlight bullets (displays as checkboxes on cards)
    "Private pool villa",
    "Sunset dolphin cruise"
  ],
  "included": [                                 // Array of items included (strings or object icons)
    { "icon": "hotel", "text": "5-Star Villa stays" },
    { "icon": "plane", "text": "Domestic return flights" },
    { "icon": "coffee", "text": "All breakfasts" },
    "Standard airport transfers"                 // Simple string formats are also backward compatible
  ],
  "itinerary": [                                // Daily chronological travel itinerary list
    {
      "day": "Days 1–2",
      "title": "Welcome to Paradise",
      "description": "Arrive at the airport, check-in, and relax on the beach."
    },
    {
      "day": "Days 3–4",
      "title": "Island Hopping",
      "description": "Sail across the atolls on a private catamaran tour."
    }
  ],
  "gallery": []                                 // Populated automatically by the scanner
}
```

---

## 3. Managing Package Images
Package images are managed inside separate subdirectories under:
📂 `public/data/packages/packages_image/[package-id]/`

### Steps to upload images:
1. Create a folder named after your package ID (e.g., `new-package-id`).
2. Paste all JPEG/PNG/WebP images for the package inside this folder.
3. **Alphabetical rule**: Name your files so they sort alphabetically.
   - The **first image** alphabetically (e.g., `01_main.jpg`) will be used as the package cover card.
   - All **other images** (e.g., `02_beach.jpg`, `03_pool.jpg`) will be automatically mapped to the page gallery.

---

## 4. Custom Inclusions Icons list
When defining `"included"` list items as objects, you can use any of the pre-imported Lucide icons by specifying their keys:

| Icon Key | Lucide Component | Best Use Cases |
| :--- | :--- | :--- |
| `plane` | `Plane` | Flights, aviation, air travel |
| `hotel` | `Hotel` | Stays, resorts, luxury hotels |
| `home` | `Home` | Villas, homestays, apartments |
| `tent` | `Tent` | Camping, hiking camps, glamping |
| `utensils` | `Utensils` | Meals, dinner buffets, lunches |
| `coffee` | `Coffee` | Breakfast, cafes, snacks |
| `wine` | `Wine` | Wine tastings, drinks, bar tours |
| `car` | `Car` | Private transfers, car rentals, drives |
| `bus` | `Bus` | Shuttles, coaches, public transfers |
| `train` | `Train` | Rail tickets, bullet trains, subways |
| `ship` | `Ship` | Cruises, boat tours, ferry tickets |
| `tram` | `Tram` | Cable cars, city tram rides |
| `camera` | `Camera` | Photography, sightseeing spots |
| `map` | `Map` | Guided city tours, route plans |
| `compass` | `Compass` | Expeditions, hiking trails, exploring |
| `binoculars` | `Binoculars` | Wildlife safari, whale watching |
| `ticket` | `Ticket` | Admissions, show passes, event tickets |
| `activity` | `Activity` | Adventure sports, active tracking |
| `footprints` | `Footprints` | Walking tours, heritage hikes |
| `mountain` | `Mountain` | Mountain views, climbing, trekking |
| `sun` | `Sun` | Sunny spots, beach days, summer |
| `palmtree` | `Palmtree` | Tropical destinations, beach stays |
| `waves` | `Waves` | Surfing, water sports, boat cruises |
| `phone` | `Phone` | 24/7 hotline support, sim cards |
| `languages` | `Languages` | Multi-language translators, guides |
| `guide` | `UserCheck` | Professional guides, local experts |
| `payment` | `CreditCard` | Booking deposits, card entries |
| `shield` | `ShieldCheck` | Travel insurance, medical protection |
| `wifi` | `Wifi` | Free internet, hotspot routers |
| `check` | `Check` | Default simple tick mark |

---

## 5. Syncing Data (Image Scanner)
Every time you add new package image folders or add/edit files inside them, run the scanner script locally to update your JSON files automatically:

Command:
```bash
npm run dev
# or
npm run build
# or manual run
node scripts/scan_images.cjs
```
This script will scan the folders, compute alphabetical covers, write details inside `public/data/packages/packages_json/*.json`, and compile the consolidated listing index file at `public/data/packages/packages.json` immediately.
