const fs = require('fs');
const path = require('path');

const deprecatedPackagesJsonPath = path.join(__dirname, '..', 'src', 'data', 'packages.json');
const packagesDir = path.join(__dirname, '..', 'public', 'data', 'packages', 'packages_image');
const detailsDir = path.join(__dirname, '..', 'public', 'data', 'packages', 'packages_json');
const publicIndexJsonPath = path.join(__dirname, '..', 'public', 'data', 'packages', 'packages.json');

// Ensure directories exist
if (!fs.existsSync(packagesDir)) {
  fs.mkdirSync(packagesDir, { recursive: true });
}
if (!fs.existsSync(detailsDir)) {
  fs.mkdirSync(detailsDir, { recursive: true });
}

// 1. One-time Migration from deprecated src/data/packages.json
if (fs.existsSync(deprecatedPackagesJsonPath)) {
  console.log(`Found deprecated index file at ${deprecatedPackagesJsonPath}. Performing one-time migration...`);
  try {
    const rawData = fs.readFileSync(deprecatedPackagesJsonPath, 'utf8');
    const oldPackages = JSON.parse(rawData);

    oldPackages.forEach((oldPkg) => {
      const baseId = oldPkg.id.replace("-2", "");
      const detailJsonPath = path.join(detailsDir, `${baseId}.json`);

      let detailData = { included: [], itinerary: [], gallery: [] };
      if (fs.existsSync(detailJsonPath)) {
        const detailRaw = fs.readFileSync(detailJsonPath, 'utf8');
        detailData = JSON.parse(detailRaw);
      }

      // Migrate critical listing metadata if not already present
      if (detailData.region === undefined) detailData.region = oldPkg.region || "international";
      if (detailData.categories === undefined) detailData.categories = oldPkg.categories || [];
      if (detailData.priority === undefined) detailData.priority = oldPkg.priority !== undefined ? oldPkg.priority : 999;

      fs.writeFileSync(detailJsonPath, JSON.stringify(detailData, null, 2), 'utf8');
      console.log(`Migrated metadata (region, categories, priority) to details JSON: ${baseId}.json`);
    });

    // Delete the deprecated index file after migration
    fs.unlinkSync(deprecatedPackagesJsonPath);
    console.log(`Successfully migrated and deleted deprecated index file at: ${deprecatedPackagesJsonPath}`);
  } catch (error) {
    console.error("Migration failed:", error);
  }
}

// 2. Scan details directory to discover all packages
const detailFiles = fs.readdirSync(detailsDir)
  .filter(file => file.endsWith('.json') && file !== 'packages.json');

console.log(`Found ${detailFiles.length} package details files to scan.`);

const packagesList = [];

detailFiles.forEach((file) => {
  const baseId = path.basename(file, '.json');
  const detailJsonPath = path.join(detailsDir, file);
  const packageImageDir = path.join(packagesDir, baseId);

  // Read current detail JSON data
  let detailData = { included: [], itinerary: [], gallery: [] };
  try {
    const detailRaw = fs.readFileSync(detailJsonPath, 'utf8');
    detailData = JSON.parse(detailRaw);
  } catch (err) {
    console.error(`Error reading/parsing detail file ${detailJsonPath}:`, err);
    return;
  }

  // Ensure image directory exists
  if (!fs.existsSync(packageImageDir)) {
    fs.mkdirSync(packageImageDir, { recursive: true });
    console.log(`Created missing image directory: ${packageImageDir}`);
  }

  // Read images from folder
  const imageFiles = fs.readdirSync(packageImageDir)
    .filter(f => /\.(jpe?g|png|webp|gif)$/i.test(f));

  const allDiskPaths = new Set(imageFiles.map(f => `/data/packages/packages_image/${baseId}/${f}`));

  // Check if current image/gallery still exist on disk to preserve curator selection
  let currentImage = detailData.image;
  let currentGallery = Array.isArray(detailData.gallery) ? detailData.gallery : [];

  let verifiedImage = (currentImage && allDiskPaths.has(currentImage)) ? currentImage : null;
  let verifiedGallery = currentGallery.filter(path => allDiskPaths.has(path));

  // Determine which images on disk are not yet in the verified set
  const usedPaths = new Set();
  if (verifiedImage) usedPaths.add(verifiedImage);
  verifiedGallery.forEach(p => usedPaths.add(p));

  const remainingDiskPaths = imageFiles
    .map(f => `/data/packages/packages_image/${baseId}/${f}`)
    .filter(p => !usedPaths.has(p))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

  // If we don't have a verified image, pick the first one from the disk (or remaining)
  if (!verifiedImage) {
    if (remainingDiskPaths.length > 0) {
      verifiedImage = remainingDiskPaths.shift();
    } else {
      verifiedImage = "/placeholder.svg";
    }
  }

  // Append any new/remaining disk paths to the gallery
  verifiedGallery = [...verifiedGallery, ...remainingDiskPaths];

  // Update dynamic fields while preserving custom selections & orderings
  detailData.image = verifiedImage;
  detailData.gallery = verifiedGallery;
  if (typeof detailData.showInHero !== 'boolean') {
    detailData.showInHero = false;
  }

  // Save updated detail file
  fs.writeFileSync(detailJsonPath, JSON.stringify(detailData, null, 2), 'utf8');
  console.log(`Scanned and updated detail file: ${file}`);

  // Push metadata to consolidated list
  packagesList.push({
    id: baseId,
    title: detailData.title || baseId,
    location: detailData.location || "",
    duration: detailData.duration || "",
    price: detailData.price || 0,
    rating: detailData.rating || 0.0,
    image: verifiedImage,
    description: detailData.description || "",
    highlights: detailData.highlights || [],
    region: detailData.region || "international",
    categories: detailData.categories || [],
    priority: detailData.priority !== undefined ? detailData.priority : 999,
    bestTimeToVisit: detailData.bestTimeToVisit || [],
    showInHero: detailData.showInHero
  });
});

// 3. Write compiled index list to public index JSON
fs.writeFileSync(publicIndexJsonPath, JSON.stringify(packagesList, null, 2), 'utf8');
console.log(`Successfully compiled and wrote index file to: ${publicIndexJsonPath} (Count: ${packagesList.length})`);

// 4. Scan gallery directory to generate public/data/gallery/gallery.json
const galleryDestDir = path.join(__dirname, '..', 'public', 'data', 'gallery');
const galleryJsonPath = path.join(galleryDestDir, 'gallery.json');

if (!fs.existsSync(galleryDestDir)) {
  fs.mkdirSync(galleryDestDir, { recursive: true });
  console.log(`Created gallery directory at: ${galleryDestDir}`);

  // Pre-populate with default assets
  const defaults = [
    { src: path.join(__dirname, '..', 'src', 'assets', 'quality', 'santorini.jpg'), name: '01_Santorini, Greece.jpg' },
    { src: path.join(__dirname, '..', 'src', 'assets', 'quality', 'japan.jpg'), name: '02_Kyoto, Japan.jpg' },
    { src: path.join(__dirname, '..', 'src', 'assets', 'quality', 'swiz.webp'), name: '03_Swiss Alps.webp' },
    { src: path.join(__dirname, '..', 'src', 'assets', 'quality', 'breathtaking-bali-nature-picjumbo-com.webp'), name: '04_Bali, Indonesia.webp' },
    { src: path.join(__dirname, '..', 'src', 'assets', 'quality', 'sahara.jpg'), name: '05_Sahara Desert, Morocco.jpg' },
    { src: path.join(__dirname, '..', 'src', 'assets', 'quality', 'maldives.jpg'), name: '06_Maldives.jpg' },
    { src: path.join(__dirname, '..', 'src', 'assets', 'quality', 'peru.jpg'), name: '07_Machu Picchu, Peru.jpg' },
    { src: path.join(__dirname, '..', 'src', 'assets', 'hero-beach.jpg'), name: '08_Tropical Beach Resort.jpg' },
    { src: path.join(__dirname, '..', 'src', 'assets', 'quality', 'swiz.webp'), name: '09_Wanderlust Adventure.webp' }
  ];

  defaults.forEach(def => {
    if (fs.existsSync(def.src)) {
      fs.copyFileSync(def.src, path.join(galleryDestDir, def.name));
      console.log(`Copied default gallery image: ${def.name}`);
    }
  });
}

const galleryFiles = fs.readdirSync(galleryDestDir)
  .filter(f => /\.webp$/i.test(f))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

const gridClasses = [
  "col-span-1 md:col-span-2 row-span-2",
  "col-span-1 md:col-span-1 row-span-1",
  "col-span-1 md:col-span-1 row-span-1",
  "col-span-1 md:col-span-2 row-span-1",
  "col-span-1 md:col-span-1 row-span-2",
  "col-span-1 md:col-span-1 row-span-1",
  "col-span-1 md:col-span-2 row-span-2",
  "col-span-1 md:col-span-1 row-span-1",
  "col-span-1 md:col-span-2 row-span-1"
];

// Read existing gallery file first to build a map of custom metadata
let existingImagesMap = new Map();
let enabled = true;
if (fs.existsSync(galleryJsonPath)) {
  try {
    const existing = JSON.parse(fs.readFileSync(galleryJsonPath, 'utf8'));
    if (existing) {
      if (typeof existing.enabled === 'boolean') {
        enabled = existing.enabled;
      }
      if (Array.isArray(existing.images)) {
        existing.images.forEach(img => {
          if (img && img.image) {
            existingImagesMap.set(img.image, img);
          }
        });
      }
    }
  } catch (e) {
    // Ignore parse errors
  }
}

const galleryList = galleryFiles.map((file, idx) => {
  const imgPath = `/data/gallery/${file}`;
  const ext = path.extname(file);
  let nameWithoutExt = path.basename(file, ext);
  nameWithoutExt = nameWithoutExt.replace(/^\d+[\s_-]*/, '');
  const cleanName = nameWithoutExt.replace(/[_-]+/g, ' ').trim();

  // If the image already exists in the JSON, keep its user-edited alt & grid className
  const existingItem = existingImagesMap.get(imgPath);
  return {
    image: imgPath,
    alt: (existingItem && existingItem.alt) ? existingItem.alt : (cleanName || "Travel Destination"),
    className: (existingItem && existingItem.className) ? existingItem.className : gridClasses[idx % gridClasses.length]
  };
});

fs.writeFileSync(galleryJsonPath, JSON.stringify({ enabled, images: galleryList }, null, 2), 'utf8');
console.log(`Successfully compiled and wrote gallery index file to: ${galleryJsonPath} (Count: ${galleryList.length}, Enabled: ${enabled})`);

// 5. Scan perfect_destinations directory to generate public/data/perfect_destinations/perfect_destinations.json
const perfectDestDir = path.join(__dirname, '..', 'public', 'data', 'perfect_destinations');
const perfectDestJsonPath = path.join(perfectDestDir, 'perfect_destinations.json');

if (!fs.existsSync(perfectDestDir)) {
  fs.mkdirSync(perfectDestDir, { recursive: true });
  console.log(`Created perfect destinations directory at: ${perfectDestDir}`);

  // Pre-populate with a few default package JSON copies
  const defaultPackageIds = ['santorini-escape', 'japan-cultural', 'swiss-alpine', 'maldives-luxury'];
  defaultPackageIds.forEach(id => {
    const srcJson = path.join(detailsDir, `${id}.json`);
    const destJson = path.join(perfectDestDir, `${id}.json`);
    if (fs.existsSync(srcJson)) {
      fs.copyFileSync(srcJson, destJson);
      console.log(`Pre-populated perfect destination: ${id}.json`);
    }
  });
}

const perfectFiles = fs.readdirSync(perfectDestDir)
  .filter(f => f.endsWith('.json') && f !== 'perfect_destinations.json');

const perfectList = [];

perfectFiles.forEach(file => {
  const baseId = path.basename(file, '.json');
  const filePath = path.join(perfectDestDir, file);
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    perfectList.push({
      id: baseId,
      name: data.location || data.title || baseId,
      rating: data.rating !== undefined ? data.rating : 5.0,
      details: data.duration || data.description || "",
      image: data.image || "/placeholder.svg"
    });
  } catch (err) {
    console.error(`Error reading perfect destination file ${filePath}:`, err);
  }
});

// Sort by alphabetical name for order consistency
perfectList.sort((a, b) => a.name.localeCompare(b.name));

fs.writeFileSync(perfectDestJsonPath, JSON.stringify(perfectList, null, 2), 'utf8');
console.log(`Successfully compiled and wrote perfect destinations index to: ${perfectDestJsonPath} (Count: ${perfectList.length})`);
