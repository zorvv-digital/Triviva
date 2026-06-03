import https from 'https';
import { JSDOM } from 'jsdom';

const url = 'https://www.budgetholidaysindia.com/international-tour-packages.html';

https.get(url, (res) => {
  let html = '';
  res.on('data', chunk => html += chunk);
  res.on('end', () => {
    const dom = new JSDOM(html);
    const doc = dom.window.document;
    
    console.log("=== International Tour Packages Links ===");
    const links = [];
    doc.querySelectorAll('a').forEach(a => {
      const href = a.getAttribute('href');
      const text = a.textContent.trim().replace(/\s+/g, ' ');
      if (href && (href.includes('package') || href.includes('tour') || href.includes('html'))) {
        links.push({ href, text });
      }
    });
    
    links.forEach((l, i) => {
      console.log(`${i}: href="${l.href}" text="${l.text}"`);
    });
  });
});
