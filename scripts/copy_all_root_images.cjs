const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const packagesImageDir = path.join(rootDir, 'public', 'data', 'packages', 'packages_image');

const mappings = [
  // New Packages
  { src: path.join(rootDir, "mysore.png"), destDir: "ooty-mysore-escape", destFile: "01_mysore.png" },
  { src: path.join(rootDir, "munar.png"), destDir: "munnar-wonderla-escape", destFile: "01_munnar.png" },
  { src: path.join(rootDir, "kanyakumari.png"), destDir: "trivandrum-kanyakumari-weekend", destFile: "01_kanyakumari.png" },
  { src: path.join(rootDir, "kodaikanal.png"), destDir: "kodaikanal-munnar-wonderla", destFile: "01_kodaikanal.png" },
  { src: path.join(rootDir, "kodaikanal2.png"), destDir: "kodaikanal-hogenekkel-wonderla-mysore", destFile: "01_kodaikanal2.png" },
  { src: path.join(rootDir, "banglore.png"), destDir: "mysore-bangalore-hogenekkel", destFile: "01_banglore.png" },
  { src: path.join(rootDir, "charminar.png"), destDir: "coorg-hyderabad-hogenekkal", destFile: "01_charminar.png" },
  
  // Existing Packages
  { src: path.join(rootDir, "mysore.png"), destDir: "chikmagalur-mysore-coorg", destFile: "01_mysore.png" },
  { src: path.join(rootDir, "munar.png"), destDir: "munnar-chinnar-marayoor", destFile: "01_munnar.png" },
  { src: path.join(rootDir, "kanyakumari.png"), destDir: "trivandrum-kanyakumari-thenmala", destFile: "01_kanyakumari.png" },
  { src: path.join(rootDir, "kodaikanal.png"), destDir: "kodaikanal-package", destFile: "01_kodaikanal.png" },
  { src: path.join(rootDir, "charminar.png"), destDir: "hyderabad-package", destFile: "01_charminar.png" },
  { src: path.join(rootDir, "holy land.png"), destDir: "holy-land", destFile: "01_holyland.png" },
  { src: path.join(rootDir, "singapore.png"), destDir: "singapore-explorer", destFile: "01_singapore.png" }
];

mappings.forEach((m) => {
  if (!fs.existsSync(m.src)) {
    console.warn(`Source file not found: ${m.src}`);
    return;
  }

  const targetDir = path.join(packagesImageDir, m.destDir);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Clear existing files in targetDir to avoid duplicates/stale covers
  const existingFiles = fs.readdirSync(targetDir);
  existingFiles.forEach((f) => {
    try {
      fs.unlinkSync(path.join(targetDir, f));
      console.log(`Deleted file in target: ${m.destDir}/${f}`);
    } catch (err) {
      console.error(`Error deleting file: ${m.destDir}/${f}`, err);
    }
  });

  // Copy new file
  const targetPath = path.join(targetDir, m.destFile);
  fs.copyFileSync(m.src, targetPath);
  console.log(`Copied ${path.basename(m.src)} to ${m.destDir}/${m.destFile}`);
});

console.log("Image copy operation complete!");
