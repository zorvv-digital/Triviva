import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imgDir = path.join(__dirname, '..', 'public', 'data', 'packages', 'packages_image', 'kodaikanal-package');
if (!fs.existsSync(imgDir)) {
  fs.mkdirSync(imgDir, { recursive: true });
}

const images = [
  { url: "https://www.budgetholidaysindia.com//package/package_10.jpg", name: "01_main.jpg" },
  { url: "https://www.budgetholidaysindia.com/gallery/OUR-PACKAGES-Gallery-Images-Kodaikanal-One.jpg", name: "02_gallery.jpg" },
  { url: "https://www.budgetholidaysindia.com/gallery/OUR-PACKAGES-Gallery-Images-Kodaikanal-Three.jpg", name: "03_gallery.jpg" },
  { url: "https://www.budgetholidaysindia.com/gallery/OUR-PACKAGES-Gallery-Images-Kodaikanal-Two.jpg", name: "04_gallery.jpg" }
];

async function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(destPath, () => {});
      reject(err);
    });
  });
}

async function run() {
  for (const img of images) {
    const dest = path.join(imgDir, img.name);
    console.log(`Downloading ${img.url} to ${dest}...`);
    try {
      await downloadFile(img.url, dest);
    } catch (err) {
      console.error(`Failed to download ${img.url}:`, err);
    }
  }
  
  // Clean up bali-retreat
  const retreatDir = path.join(__dirname, '..', 'public', 'data', 'packages', 'packages_image', 'bali-retreat');
  if (fs.existsSync(retreatDir)) {
    fs.rmSync(retreatDir, { recursive: true, force: true });
    console.log("Removed bali-retreat directory");
  }
}

run().catch(console.error);
