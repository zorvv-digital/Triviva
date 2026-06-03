import https from 'https';
import { JSDOM } from 'jsdom';

const url = 'https://www.budgetholidaysindia.com/packages/kodaikanal-tour-packages.html';

https.get(url, (res) => {
  let html = '';
  res.on('data', chunk => html += chunk);
  res.on('end', () => {
    const dom = new JSDOM(html);
    const doc = dom.window.document;
    
    console.log("=== Title ===");
    console.log(doc.querySelector('.content-column h1')?.textContent.trim());
    
    console.log("=== Description ===");
    const paragraphs = [];
    doc.querySelectorAll('.content-column p').forEach(p => {
      const text = p.textContent.trim();
      if (text) paragraphs.push(text);
    });
    console.log(paragraphs.join('\n\n'));
    
    console.log("=== Image ===");
    console.log(doc.querySelector('.content-column .image img')?.getAttribute('src'));

    console.log("=== Gallery ===");
    doc.querySelectorAll('.content-column .gallery-box img').forEach(img => {
      console.log(img.getAttribute('src'));
    });
  });
});
