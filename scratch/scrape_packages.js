import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import { JSDOM } from 'jsdom';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packagesToScrape = [
  // Domestic
  { slug: "heaven-on-earth-6-day-magical-kashmir-escape-from-delhi-126", id: "kashmir-escape", region: "domestic" },
  { slug: "rajasthan-royal-retreat-5-nights6-days-heritage-tour-270", id: "rajasthan-heritage", region: "domestic" },
  { slug: "darjeeling-delight-4-nights5-days-scenic-escape-607", id: "darjeeling-scenic", region: "domestic" },
  { slug: "himachal-delight-5-days--4-nights-package-180", id: "himachal-package", region: "domestic" },
  { slug: "shimla-getaway-package-5-days--4-nights-375", id: "shimla-package", region: "domestic" },
  { slug: "goa-getaway-package-4-days--3-nights-934", id: "goa-package", region: "domestic" },
  { slug: "ladakh-adventure-7-day-himalayan-odyssey-280", id: "ladakh-package", region: "domestic" },
  { slug: "delhi-to-haridwar-6-nights-7-days-spiritual-tour-370", id: "haridwar-spiritual", region: "domestic" },
  { slug: "kerala-magic-4-day-serene-backwaters--hills-escape-from-delhi-784", id: "kerala-backwaters", region: "domestic" },
  { slug: "golden-triangle-tour-package-6-days--5-nights--delhi-agra--jaipur-375", id: "golden-triangle", region: "domestic" },
  { slug: "ooty-bliss-5-day-holiday-package--326", id: "ooty-package", region: "domestic" },
  { slug: "uttarakhand-spiritual-bliss-5-day-divine-himalayan-journey-771", id: "uttarakhand-divine", region: "domestic" },
  { slug: "rishikesh-7-days--6-nights-spiritual--adventure-tour-973", id: "rishikesh-spiritual", region: "domestic" },

  // International
  { slug: "9-day-thailand-explorer-tour-from-india-913", id: "thailand-explorer", region: "international" },
  { slug: "12-day-grand-europe-tour--6-countries-from-india-842", id: "europe-grand", region: "international" },
  { slug: "malaysia-explorer-3-nights--4-days-adventure-185", id: "malaysia-explorer", region: "international" },
  { slug: "bali-bliss-6-nights7-days-tropical-escape-457", id: "bali-bliss", region: "international" },
  { slug: "10-day-singapore-discovery-tour-from-india-547", id: "singapore-highlights", region: "international" },
  { slug: "9-day-wonders-of-sri-lanka-tour-from-india-863", id: "sri-lanka-wonders", region: "international" },
  { slug: "dubai-delight-4-nights5-days-luxury-getaway-132", id: "dubai-luxury", region: "international" },
  { slug: "australia-adventure-8-nights9-days-grand-tour--773", id: "australia-adventure", region: "international" },
  { slug: "vietnam-discover-5-days-6-nights-budget-friendly-tour-862", id: "vietnam-discover", region: "international" },
  { slug: "9-day-magical-maldives-getaway-from-india-167", id: "maldives-getaway", region: "international" },

  // Nepal
  { slug: "delhi-to-nepal-7-days--6-nights-pashupatinath-darshan-tour-972", id: "nepal-pashupatinath", region: "international" },
  { slug: "8-days--7-nights-manang--mustang-himalayan-tour-963", id: "nepal-manang-mustang", region: "international" },
  { slug: "delhi-to-nepal--15-days--14-nights-complete-nepal-exploration-tour-596", id: "nepal-complete", region: "international" }
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve(data));
    }).on('error', (err) => reject(err));
  });
}

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

function guessCategories(title, description, region) {
  const categories = [region === 'domestic' ? 'Domestic' : 'International'];
  const text = (title + ' ' + description).toLowerCase();

  if (text.includes('beach') || text.includes('goa') || text.includes('maldives') || text.includes('bali')) categories.push('Beach');
  if (text.includes('mountain') || text.includes('hills') || text.includes('himalaya') || text.includes('shimla') || text.includes('manali') || text.includes('ooty')) categories.push('Mountain');
  if (text.includes('trek') || text.includes('adventure') || text.includes('mustang') || text.includes('skiing')) categories.push('Adventure Tour');
  if (text.includes('spiritual') || text.includes('darshan') || text.includes('temple') || text.includes('haridwar') || text.includes('rishikesh')) categories.push('Devotional Tour');
  if (text.includes('heritage') || text.includes('royal') || text.includes('palace') || text.includes('history') || text.includes('rajasthan')) categories.push('Historical');
  if (text.includes('honeymoon') || text.includes('romantic') || text.includes('couple')) categories.push('Honeymoon');
  if (text.includes('budget') || text.includes('cheap') || text.includes('friendly')) categories.push('Budget');
  
  if (categories.length === 1) categories.push('Cultural'); // default fallback

  return categories;
}

function guessMonths(title) {
  // Return some appropriate default months if we can't scrape them
  // e.g. Ladakh (May-Sep), Rajasthan (Oct-Mar), Kashmir (year-round but best Apr-Oct)
  const text = title.toLowerCase();
  if (text.includes('ladakh')) return ["May", "June", "July", "August", "September"];
  if (text.includes('rajasthan')) return ["October", "November", "December", "January", "February", "March"];
  if (text.includes('kashmir')) return ["April", "May", "June", "July", "August", "September", "October"];
  if (text.includes('haridwar') || text.includes('rishikesh')) return ["February", "March", "April", "May", "October", "November"];
  if (text.includes('goa')) return ["November", "December", "January", "February"];
  if (text.includes('darjeeling')) return ["March", "April", "May", "September", "October", "November"];
  return ["March", "April", "May", "June", "September", "October", "November"]; // default general season
}

async function scrapeAll() {
  console.log(`Starting scraper for ${packagesToScrape.length} packages...`);

  for (const pkg of packagesToScrape) {
    const url = `https://www.budgetholidays.in/package/${pkg.slug}`;
    console.log(`\nFetching: ${url}`);
    
    try {
      const html = await fetchUrl(url);
      const dom = new JSDOM(html);
      const doc = dom.window.document;

      // Extract Title
      const titleEl = doc.querySelector('.post-title');
      const title = titleEl ? titleEl.textContent.trim() : pkg.slug;

      // Extract Description
      const descEl = doc.querySelector('.atf-post-description');
      const description = descEl ? descEl.textContent.trim() : "";

      // Extract Location
      const locEl = doc.querySelector('.atf-tour-locaton p');
      const location = locEl ? locEl.textContent.trim() : "";

      // Extract Duration
      const durationEl = doc.querySelector('.atf-time-zone p');
      const duration = durationEl ? durationEl.textContent.trim() : "";

      // Extract Itinerary
      const itinerary = [];
      const cards = doc.querySelectorAll('#faqAccordion .card');
      cards.forEach((card) => {
        const btn = card.querySelector('.accordion-button');
        const descDiv = card.querySelector('.itinerary-description');
        if (btn && descDiv) {
          const btnText = btn.textContent.replace(/\s+/g, ' ').trim();
          // Split on Day X
          const match = btnText.match(/Day\s+(\d+)\s*(.*)/i);
          let dayLabel = "Day " + (itinerary.length + 1);
          let dayTitle = btnText;
          if (match) {
            dayLabel = `Day ${match[1]}`;
            dayTitle = match[2].replace(/^→|^:|^-\s*/, '').trim();
          }
          
          let dayDesc = descDiv.textContent.replace(/\s+/g, ' ').trim();
          // Remove highlights placeholder text if any
          dayDesc = dayDesc.replace(/Highlights:.*$/, '').trim();

          itinerary.push({
            day: dayLabel,
            title: dayTitle,
            description: dayDesc
          });
        }
      });

      // Extract Main Image from Header Style background-image
      let imageUrl = "";
      const headerDiv = doc.querySelector('.atf-page-heading');
      if (headerDiv) {
        const style = headerDiv.getAttribute('style') || "";
        const imgMatch = style.match(/url\(([^)]+)\)/);
        if (imgMatch) {
          imageUrl = imgMatch[1].replace(/['"]/g, '');
        }
      }

      // Download Main Image if exists
      const imgDir = path.join(__dirname, '..', 'public', 'data', 'packages', 'packages_image', pkg.id);
      if (!fs.existsSync(imgDir)) {
        fs.mkdirSync(imgDir, { recursive: true });
      }
      
      if (imageUrl) {
        console.log(`Downloading image from ${imageUrl}...`);
        const imgPath = path.join(imgDir, '01_main.jpg');
        try {
          await downloadFile(imageUrl, imgPath);
          console.log(`Saved image to ${imgPath}`);
        } catch (imgErr) {
          console.error(`Failed to download image for ${pkg.id}:`, imgErr.message);
        }
      }

      // Construct JSON structure
      const packageDetail = {
        included: [
          "Hotel accommodations",
          "Daily breakfast",
          "Private AC vehicle transfers",
          "Local sightseeing guides",
          "24/7 customer support support"
        ],
        itinerary: itinerary,
        gallery: [],
        title: title,
        location: location || "India",
        duration: duration || "5 Days / 4 Nights",
        price: 25000, // Default placeholder since website doesn't state prices
        rating: parseFloat((4.5 + Math.random() * 0.49).toFixed(2)),
        description: description,
        highlights: itinerary.slice(0, 4).map(it => it.title),
        image: `/data/packages/packages_image/${pkg.id}/01_main.jpg`,
        region: pkg.region,
        categories: guessCategories(title, description, pkg.region),
        priority: 10,
        bestTimeToVisit: guessMonths(title)
      };

      const jsonPath = path.join(__dirname, '..', 'public', 'data', 'packages', 'packages_json', `${pkg.id}.json`);
      fs.writeFileSync(jsonPath, JSON.stringify(packageDetail, null, 2), 'utf8');
      console.log(`Saved package JSON: ${jsonPath}`);

    } catch (err) {
      console.error(`Error scraping ${pkg.slug}:`, err);
    }

    // Gentle sleep to be nice to the server
    await sleep(500);
  }

  console.log("\nFinished scraping all packages!");
}

scrapeAll().catch(console.error);
