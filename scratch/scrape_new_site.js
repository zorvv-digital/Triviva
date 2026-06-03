import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { JSDOM } from 'jsdom';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const urlMapping = {
  "kerala-backwaters": "https://www.budgetholidaysindia.com/packages/book-kerala-tour-and-holiday-packages.html",
  "goa-package": "https://www.budgetholidaysindia.com/packages/goa-tour-packages.html",
  "himachal-package": "https://www.budgetholidaysindia.com/packages/himachal-pradesh-tour-packages.html",
  "kashmir-escape": "https://www.budgetholidaysindia.com/packages/kashmir-tour-packages.html",
  "golden-triangle": "https://www.budgetholidaysindia.com/packages/delhi-agra-tour-package.html",
  "ooty-package": "https://www.budgetholidaysindia.com/packages/ooty-tour-packages.html",
  
  "maldives-luxury": "https://www.budgetholidaysindia.com/packages/lowest-maldives-packages.html",
  "dubai-luxury": "https://www.budgetholidaysindia.com/packages/dubai-tour-package.html",
  "thailand-explorer": "https://www.budgetholidaysindia.com/packages/thailand-tour-package.html",
  "malaysia-explorer": "https://www.budgetholidaysindia.com/packages/malaysia-tour-packages.html",
  "bali-bliss": "https://www.budgetholidaysindia.com/packages/bali-tour-package.html",
  "vietnam-discover": "https://www.budgetholidaysindia.com/packages/vietnam-tour-package.html"
};

async function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve(data));
    }).on('error', (err) => reject(err));
  });
}

async function scrapeAll() {
  const results = {};
  for (const [id, url] of Object.entries(urlMapping)) {
    console.log(`Fetching ${id} from ${url}...`);
    try {
      const html = await fetchUrl(url);
      const dom = new JSDOM(html);
      const doc = dom.window.document;
      
      const title = doc.querySelector('.content-column h1')?.textContent.trim() || "";
      
      // Grab all paragraphs in content-column
      const paragraphs = [];
      doc.querySelectorAll('.content-column p').forEach(p => {
        const text = p.textContent.trim();
        if (text) paragraphs.push(text);
      });
      const description = paragraphs.join('\n\n');
      
      // Image source
      const imgEl = doc.querySelector('.content-column .image img');
      const imgUrl = imgEl ? imgEl.getAttribute('src') : "";
      
      // Facilities
      const facilities = [];
      doc.querySelectorAll('.content-column .facility-box-two').forEach(f => {
        const text = f.textContent.trim().replace(/\s+/g, ' ');
        if (text) facilities.push(text);
      });
      
      // Gallery
      const gallery = [];
      doc.querySelectorAll('.content-column .gallery-box img').forEach(img => {
        const src = img.getAttribute('src');
        if (src) gallery.push(src);
      });
      
      results[id] = {
        title,
        description,
        imgUrl,
        facilities,
        gallery,
        url
      };
      
      console.log(`Successfully scraped ${id}. Title: "${title}"`);
    } catch (err) {
      console.error(`Error scraping ${id}:`, err);
    }
  }
  
  const outputPath = path.join(__dirname, 'scraped_new_site.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), 'utf8');
  console.log(`Saved results to ${outputPath}`);
}

scrapeAll().catch(console.error);
