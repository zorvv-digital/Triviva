import https from 'https';
import { JSDOM } from 'jsdom';

const url = 'https://www.budgetholidaysindia.com/packages/book-kerala-tour-and-holiday-packages.html';

https.get(url, (res) => {
  let html = '';
  res.on('data', chunk => html += chunk);
  res.on('end', () => {
    const dom = new JSDOM(html);
    const doc = dom.window.document;
    
    const text = doc.body.textContent || "";
    console.log("=== Text Content ===");
    console.log(text.split('\n').map(line => line.trim()).filter(line => line).join('\n'));
  });
});
