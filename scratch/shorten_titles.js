const fs = require('fs');
const path = require('path');

const detailsDir = path.join(__dirname, '..', 'public', 'data', 'packages', 'packages_json');

const titleMap = {
  "vietnam-discover.json": "Vietnam Discovery",
  "uttarakhand-divine.json": "Divine Uttarakhand Journey",
  "thailand-explorer.json": "Thailand Explorer",
  "sri-lanka-wonders.json": "Wonders of Sri Lanka",
  "singapore-highlights.json": "Singapore Highlights",
  "shimla-package.json": "Shimla Getaway",
  "rishikesh-spiritual.json": "Rishikesh Spiritual & Adventure",
  "rajasthan-heritage.json": "Rajasthan Royal Retreat",
  "ooty-package.json": "Ooty Blissful Holiday",
  "nepal-pashupatinath.json": "Pashupatinath Darshan Tour",
  "nepal-manang-mustang.json": "Manang & Mustang Adventure",
  "nepal-complete.json": "Complete Nepal Exploration",
  "maldives-getaway.json": "Maldives Paradise Escape",
  "malaysia-explorer.json": "Malaysia Explorer",
  "ladakh-package.json": "Ladakh Himalayan Odyssey",
  "kerala-backwaters.json": "Kerala Magic Escape",
  "kashmir-escape.json": "Kashmir Magical Escape",
  "himachal-package.json": "Himachal Delight",
  "haridwar-spiritual.json": "Haridwar & Rishikesh Spiritual",
  "goa-package.json": "Goa Getaway",
  "golden-triangle.json": "Golden Triangle Tour",
  "europe-grand.json": "Grand Europe Tour",
  "dubai-luxury.json": "Dubai Delight",
  "darjeeling-scenic.json": "Darjeeling Delight",
  "bali-bliss.json": "Bali Bliss",
  "australia-adventure.json": "Australia Adventure"
};

Object.entries(titleMap).forEach(([filename, newTitle]) => {
  const filePath = path.join(detailsDir, filename);
  if (fs.existsSync(filePath)) {
    try {
      const rawData = fs.readFileSync(filePath, 'utf8');
      const data = JSON.parse(rawData);
      data.title = newTitle;
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
      console.log(`Updated title in ${filename} to: "${newTitle}"`);
    } catch (err) {
      console.error(`Error updating ${filename}:`, err);
    }
  } else {
    console.warn(`File not found: ${filePath}`);
  }
});
