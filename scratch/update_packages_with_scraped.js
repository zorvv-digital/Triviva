import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const scrapedData = JSON.parse(fs.readFileSync(path.join(__dirname, 'scraped_new_site.json'), 'utf8'));

const detailsDir = path.join(__dirname, '..', 'public', 'data', 'packages', 'packages_json');
const imagesDir = path.join(__dirname, '..', 'public', 'data', 'packages', 'packages_image');

// Custom detailed itineraries and highlights matching the scraped descriptions
const customDetails = {
  "kerala-backwaters": {
    duration: "6 Days / 5 Nights",
    highlights: [
      "Cruise the tranquil Vembanad Lake and Alleppey's backwaters on a private houseboat",
      "Unwind on the pristine sandy beaches of Kovalam and Varkala",
      "Explore the misty hill stations and tea plantations of Munnar and Wayanad",
      "Discover Fort Kochi's colonial heritage and captivitating Kathakali performances",
      "Rejuvenate with traditional Ayurvedic treatments in serene settings",
      "Spot exotic wildlife and birds on a safari in Periyar National Park"
    ],
    itinerary: [
      { day: "Day 1", title: "Cochin to Munnar Tea Gardens", description: "Arrive in Cochin and drive to the misty hills of Munnar. Tour sprawling tea plantations, visit the local tea museum, and relax in your resort." },
      { day: "Day 2", title: "Munnar to Wayanad Hills Exploration", description: "Drive to Wayanad. Trek through lush green valleys, witness stunning waterfalls, and enjoy panoramic views of the Western Ghats." },
      { day: "Day 3", title: "Wayanad to Periyar National Park", description: "Travel to Thekkady (Periyar). Go on a guided wildlife and birdwatching safari in Periyar National Park and explore the spice gardens." },
      { day: "Day 4", title: "Periyar to Alleppey Houseboat Cruise", description: "Board a traditional houseboat in Alleppey. Cruise the scenic Vembanad Lake and backwaters, enjoying traditional meals cooked onboard." },
      { day: "Day 5", title: "Alleppey to Kovalam & Varkala Beaches", description: "Drive to the coastal town of Kovalam and Varkala. Unwind on the cliffside sandy beaches and witness a beautiful sunset." },
      { day: "Day 6", title: "Fort Kochi Heritage & Departure", description: "Travel back to Cochin. Visit Fort Kochi's historic Chinese Fishing Nets, colonial buildings, and attend a Kathakali performance before your departure flight." }
    ]
  },
  "goa-package": {
    duration: "4 Days / 3 Nights",
    highlights: [
      "Soak up the sun on the famous beaches of Baga and Calangute",
      "Explore the Portuguese-era churches and heritage sites of Old Goa",
      "Enjoy thrilling water sports and vibrant nightlife at Anjuna Beach",
      "Relax in the tranquil, laid-back atmosphere of Palolem Beach in South Goa",
      "Savor authentic Indo-Portuguese cuisine and local Goan delicacies",
      "Take a scenic sunset boat cruise along the historic Mandovi River"
    ],
    itinerary: [
      { day: "Day 1", title: "Arrival in Goa and Mandovi River Sunset Cruise", description: "Arrive in Goa, meet our representative, and transfer to your hotel. In the evening, enjoy a scenic boat cruise on the Mandovi River with traditional Goan music and dances." },
      { day: "Day 2", title: "North Goa Beaches & Anjuna Nightlife", description: "Visit the popular beaches of Baga, Calangute, and Vagator. Participate in optional water sports at Calangute and experience the famous nightlife at Anjuna Beach." },
      { day: "Day 3", title: "Old Goa Heritage & Portuguese Churches", description: "Explore the UNESCO World Heritage monuments of Old Goa, including the Basilica of Bom Jesus and Se Cathedral, showcasing magnificent Portuguese architecture." },
      { day: "Day 4", title: "South Goa Palolem Beach & Departure", description: "Drive to the beautiful, crescent-shaped Palolem Beach in South Goa for a relaxing morning. Later, transfer to the airport or railway station for your return journey." }
    ]
  },
  "himachal-package": {
    duration: "6 Days / 5 Nights",
    highlights: [
      "Trek through the stunning valleys and alpine landscapes of Manali and Kullu",
      "Explore the rich colonial and cultural heritage of Shimla's ancient temples",
      "Visit Dharamshala and McLeod Ganj, the peaceful home of the Dalai Lama",
      "Discover the serene beauty of Dalhousie and the 'Mini Switzerland' of Khajjiar",
      "Experience paragliding, zorbing, and skiing in Solang Valley",
      "Unwind amidst the lush apple orchards and scenic vistas of Kasauli"
    ],
    itinerary: [
      { day: "Day 1", title: "Shimla Heritage & Ancient Temples", description: "Arrive in Shimla, the former summer capital. Walk the historic Mall Road and visit Jakhoo Temple for panoramic mountain views." },
      { day: "Day 2", title: "Shimla to Manali via Kullu Valley", description: "Enjoy a scenic drive to Manali, passing through the beautiful Kullu Valley along the Beas River, stopping for local shawl shopping." },
      { day: "Day 3", title: "Solang Valley Adventure Sports", description: "Excursion to Solang Valley. Enjoy thrilling adventure activities such as paragliding, zorbing, and quad biking, or skiing in winter." },
      { day: "Day 4", title: "Manali to Dharamshala & McLeod Ganj", description: "Drive to Dharamshala, the seat of the Tibetan government-in-exile. Visit the Tsuglagkhang Complex (Dalai Lama Temple) in McLeod Ganj." },
      { day: "Day 5", title: "Dharamshala to Dalhousie & Khajjiar", description: "Travel to Dalhousie and take an excursion to Khajjiar, known as the 'Mini Switzerland of India', surrounded by dense pine forests." },
      { day: "Day 6", title: "Kasauli Orchards & Departure", description: "Drive through Kasauli's peaceful apple orchards. Transfer to the nearest airport or station for your onward flight." }
    ]
  },
  "kashmir-escape": {
    duration: "6 Days / 5 Nights",
    highlights: [
      "Stay in a deluxe houseboat and take a Shikara ride on Srinagar's Dal Lake",
      "Witness the spectacular blooming Tulip Gardens in Srinagar (in spring)",
      "Explore the historic Mughal Gardens including Shalimar and Nishat Bagh",
      "Discover Gulmarg's scenic meadows and ski slopes via Gondola ride",
      "Visit the picturesque Betaab Valley and Lidder River in Pahalgam",
      "Embrace the alpine glaciers and tranquil streams of Sonmarg"
    ],
    itinerary: [
      { day: "Day 1", title: "Srinagar Houseboat Stay & Shikara Ride", description: "Arrive in Srinagar and check into a deluxe houseboat on Dal Lake. Enjoy a sunset Shikara ride, exploring floating gardens and markets." },
      { day: "Day 2", title: "Mughal Gardens & Tulip Gardens Tour", description: "Visit the historic Mughal Gardens (Shalimar, Nishat, and Chashme Shahi). If traveling in spring, tour the famous Indira Gandhi Memorial Tulip Garden." },
      { day: "Day 3", title: "Gulmarg Skiing & Gondola Cable Car Ride", description: "Drive to Gulmarg, a haven for skiers and nature lovers. Ride the Gondola cable car up to Apharwat Peak for breathtaking views of the Himalayas." },
      { day: "Day 4", title: "Pahalgam Valley & Lidder River Excursion", description: "Drive to Pahalgam, the Valley of Shepherds. Walk along the Lidder River, visit Betaab Valley, and explore local pine forests." },
      { day: "Day 5", title: "Sonmarg Alpine Scenery Trip", description: "Take a day trip to Sonmarg, the Meadow of Gold. Trek or ride a pony to the Thajiwas Glacier and enjoy alpine streams." },
      { day: "Day 6", title: "Srinagar Departure", description: "Check out from Srinagar and transfer to the airport for your onward flight." }
    ]
  },
  "golden-triangle": {
    duration: "5 Days / 4 Nights",
    highlights: [
      "Explore Delhi's historic Red Fort, Qutub Minar, and India Gate",
      "Experience the vibrant markets of Chandni Chowk and the Lotus Temple",
      "Witness the sunset over the Taj Mahal, a breathtaking monument of love",
      "Tour the imposing Agra Fort and the ancient Mughal capital of Fatehpur Sikri",
      "Immerse yourself in rich Mughal history, architecture, and gastronomy",
      "Visit UNESCO World Heritage sites with professional local guides"
    ],
    itinerary: [
      { day: "Day 1", title: "Delhi Arrival & Old Delhi Heritage Tour", description: "Arrive in Delhi and check in. Discover Old Delhi, including the Red Fort and a rickshaw ride through the markets of Chandni Chowk." },
      { day: "Day 2", title: "New Delhi Sightseeing & Lotus Temple", description: "Visit New Delhi's landmark sights: Qutub Minar, India Gate, Humayun's Tomb, and the lotus-shaped Baha'i Temple." },
      { day: "Day 3", title: "Delhi to Agra & Taj Mahal Sunset", description: "Drive to Agra. In the afternoon, visit the magnificent Taj Mahal, witnessing the white marble change colors in the sunset glow." },
      { day: "Day 4", title: "Agra Fort & Fatehpur Sikri Excursion", description: "Tour the massive red sandstone Agra Fort, then drive to the ghost city of Fatehpur Sikri, the former Mughal capital." },
      { day: "Day 5", title: "Agra to Delhi Departure", description: "Transfer back to Delhi airport or railway station for your onward journey." }
    ]
  },
  "ooty-package": {
    duration: "5 Days / 4 Nights",
    highlights: [
      "Stroll through lush tea plantations and visit the Ooty Tea Museum",
      "Ride the UNESCO-listed Nilgiri Mountain Railway Toy Train",
      "Discover the diverse flora of the historic Ooty Botanical Gardens",
      "Enjoy a relaxing, scenic boat ride on Ooty Lake",
      "Experience the old-world British colonial charm of Ooty's buildings",
      "Watch the sunrise and enjoy sweeping views from Doddabetta Peak"
    ],
    itinerary: [
      { day: "Day 1", title: "Arrival and Ooty Lake Boating", description: "Arrive in Ooty, transfer to your hotel, and check in. In the afternoon, enjoy a relaxing boat ride on the scenic Ooty Lake." },
      { day: "Day 2", title: "Nilgiri Mountain Railway & Coonoor Tour", description: "Ride the historic toy train to Coonoor. Visit Sim's Park, Lamb's Rock, and Dolphin's Nose for beautiful valley views." },
      { day: "Day 3", title: "Tea Gardens & Ooty Tea Museum Visit", description: "Explore local tea gardens. Visit the Ooty Tea Museum to learn about tea processing and enjoy fresh tea tastings." },
      { day: "Day 4", title: "Ooty Botanical Gardens & Doddabetta Peak", description: "Visit the lush Botanical Gardens. In the afternoon, drive up to Doddabetta Peak, the highest point in South India, for stunning views." },
      { day: "Day 5", title: "Ooty Departure", description: "Enjoy a final breakfast and transfer back to the Coimbatore airport or railway station." }
    ]
  },
  "maldives-luxury": {
    duration: "4 Days / 3 Nights",
    highlights: [
      "Enjoy an affordable 3-night, 4-day tropical adventure in the Maldives",
      "Stay in a 3-star hotel with all-inclusive meals included",
      "Go snorkeling among vibrant coral reefs and colorful marine life",
      "Explore local Maldivian islands and experience their unique culture",
      "Receive free underwater photography to capture your memories",
      "Participate in exciting sunset fishing in crystal-clear waters"
    ],
    itinerary: [
      { day: "Day 1", title: "Maldives Arrival & Speedboat Transfer", description: "Fly into Malé. Meet our coordinator and take a scenic speedboat transfer to your hotel. Spend the evening relaxing on the beach." },
      { day: "Day 2", title: "Snorkeling Safari & Underwater Photo Session", description: "Embark on a snorkeling excursion. Swim with colorful fish and sea turtles, with a professional guide taking free underwater photos of you." },
      { day: "Day 3", title: "Local Island Cultural Tour & Sunset Fishing", description: "Tour a local island to experience Maldivian lifestyle. In the evening, try traditional line fishing during a spectacular sunset." },
      { day: "Day 4", title: "Beachside Leisure & Speedboat Departure", description: "Enjoy free time on the white sand beaches. Take a speedboat back to Malé airport for your departure flight." }
    ]
  },
  "dubai-luxury": {
    duration: "5 Days / 4 Nights",
    highlights: [
      "Marvel at Dubai's futuristic skyline, including Burj Khalifa & Burj Al Arab",
      "Stay in premium hotels with world-class amenities and skyline views",
      "Explore the Gold Souk and Spice Souk in Old Dubai",
      "Go on a desert safari with dune thrashing, camel rides, and BBQ dinner",
      "Shop at the massive Dubai Mall and watch the Dubai Fountain show",
      "Experience a sunset yacht cruise along the stunning coastline"
    ],
    itinerary: [
      { day: "Day 1", title: "Arrival, Dubai Mall & Burj Khalifa", description: "Arrive in Dubai. Transfer to your hotel. Visit the Dubai Mall for shopping and go up to the Burj Khalifa observation deck." },
      { day: "Day 2", title: "Old Dubai Tour & Yacht Cruise", description: "Explore the Gold and Spice Souks. In the evening, enjoy a premium yacht cruise along the Dubai Marina coastline." },
      { day: "Day 3", title: "Adrenaline Desert Safari & Arabian BBQ", description: "Spend the morning at leisure. In the afternoon, take a 4x4 desert safari with dune bashing, camel rides, sandboarding, and a BBQ dinner under the stars." },
      { day: "Day 4", title: "Emirati Culture or Hot Air Balloon Flight", description: "Learn about traditional Emirati culture. Optional hot air balloon ride over the desert or leisure shopping." },
      { day: "Day 5", title: "Dubai Departure", description: "Transfer to the Dubai airport for your return flight home." }
    ]
  },
  "thailand-explorer": {
    duration: "7 Days / 6 Nights",
    highlights: [
      "Tour Bangkok's Grand Palace, Wat Arun, and local street markets",
      "Explore Pattaya's Sanctuary of Truth and lively Walking Street",
      "Visit Chiang Mai's Elephant Nature Park and join a Thai cooking class",
      "Unwind on the pristine, powder-white sand beaches of Krabi and Phuket",
      "Embark on island-hopping tours for snorkeling in vibrant coral reefs",
      "Experience white water river rafting and jungle trekking in Chiang Mai"
    ],
    itinerary: [
      { day: "Day 1", title: "Bangkok Arrival, Grand Palace & Wat Arun", description: "Arrive in Bangkok. Tour the Grand Palace, Wat Arun (Temple of Dawn), and experience local street markets." },
      { day: "Day 2", title: "Bangkok to Pattaya, Sanctuary of Truth", description: "Drive to Pattaya. Visit the stunning wooden Sanctuary of Truth temple. In the evening, explore Pattaya's Walking Street." },
      { day: "Day 3", title: "Pattaya to Chiang Mai & Cooking Class", description: "Fly to Chiang Mai. Explore the old town and join a traditional Thai cooking class in the evening." },
      { day: "Day 4", title: "Elephant Nature Park & Jungle Trekking", description: "Visit the ethical Elephant Nature Park to interact with rescued elephants, followed by a jungle trek." },
      { day: "Day 5", title: "Chiang Mai to Phuket / Krabi Beaches", description: "Fly to Phuket or Krabi. Check into your beach resort and relax on the white sands." },
      { day: "Day 6", title: "Krabi/Phuket Island Hopping & Snorkeling", description: "Take a speedboat island-hopping tour. Snorkel in crystal-clear waters and relax in hidden coves." },
      { day: "Day 7", title: "Thailand Departure", description: "Enjoy a free morning before transferring to the airport for your return flight." }
    ]
  },
  "malaysia-explorer": {
    duration: "7 Days / 6 Nights",
    highlights: [
      "Visit Kuala Lumpur's Petronas Twin Towers, Batu Caves, and KLCC Park",
      "Discover Penang's UNESCO-listed George Town and colonial architecture",
      "Savor Penang's famous street food and explore the street art lanes",
      "Relax on the pristine beaches and snorkel in the waters of Langkawi",
      "Explore Borneo's rainforests and encounter unique wildlife",
      "Immerse yourself in the cultures of Borneo's indigenous communities"
    ],
    itinerary: [
      { day: "Day 1", title: "Arrival in Kuala Lumpur & KLCC Park", description: "Fly into Kuala Lumpur. Visit the Petronas Twin Towers and stroll through the KLCC Park." },
      { day: "Day 2", title: "Batu Caves Tour & Travel to Penang", description: "Climb the colorful steps of Batu Caves. In the afternoon, travel to Penang and check in." },
      { day: "Day 3", title: "Penang George Town Street Art & Food Tour", description: "Take a walking tour of the UNESCO George Town, photographing street art and tasting Penang street food." },
      { day: "Day 4", title: "Penang to Langkawi Island Beach Resort", description: "Travel to Langkawi Island. Check into your beachfront resort and watch the sunset." },
      { day: "Day 5", title: "Langkawi Snorkeling & Beach Leisure", description: "Go on a boat trip for snorkeling and water activities around Langkawi's marine park." },
      { day: "Day 6", title: "Langkawi to Borneo Rainforest Safari", description: "Fly to Borneo. Head into the rainforest to spot wildlife such as orangutans and hornbills." },
      { day: "Day 7", title: "Indigenous Community Visit & Departure", description: "Visit an indigenous community village. Later, transfer to the airport for departure." }
    ]
  },
  "bali-bliss": {
    duration: "5 Days / 4 Nights",
    highlights: [
      "Experience the tropical magic of Bali's beaches and culture",
      "Visit the art galleries, rice terraces, and monkey forest of Ubud",
      "Watch the Kecak fire dance against a sunset at Uluwatu Cliff Temple",
      "Explore the beautiful sea temple of Tanah Lot at sunset",
      "Stay in luxurious hotels and beach resorts with premium amenities",
      "Enjoy relaxation and beach activities at Seminyak or Kuta beach"
    ],
    itinerary: [
      { day: "Day 1", title: "Arrival in Bali & Sunset Beach Dinner", description: "Arrive in Denpasar, Bali. Transfer to your resort and enjoy a sunset dinner on the beach." },
      { day: "Day 2", title: "Ubud Culture, Monkey Forest & Rice Terraces", description: "Explore Ubud. Visit the Sacred Monkey Forest, Royal Palace, and walk through the Tegalalang Rice Terraces." },
      { day: "Day 3", title: "Tanah Lot & Uluwatu Cliff Sunset Temple Tour", description: "Visit Tanah Lot temple on a rock in the sea. In the afternoon, head to Uluwatu Temple for the Kecak fire dance." },
      { day: "Day 4", title: "Seminyak Beach Leisure", description: "Enjoy a free day to relax on Seminyak beach, visit beach clubs, or try a Balinese spa massage." },
      { day: "Day 5", title: "Bali Departure", description: "Transfer to Denpasar Airport for your return flight home." }
    ]
  },
  "vietnam-discover": {
    duration: "6 Days / 5 Nights",
    highlights: [
      "Tour Hanoi's historic Old Quarter and Ho Chi Minh Mausoleum",
      "Cruise Halong Bay amidst towering limestone karsts and emerald waters",
      "Go kayaking, cave exploring, and sightseeing in Halong Bay",
      "Discover the lantern-lit streets and architecture of ancient Hoi An",
      "Visit Ho Chi Minh City's War Remnants Museum and Cu Chi Tunnels",
      "Explore the floating markets and rural landscapes of the Mekong Delta"
    ],
    itinerary: [
      { day: "Day 1", title: "Hanoi Arrival & Old Quarter Tour", description: "Arrive in Hanoi. Explore the Old Quarter and Hoan Kiem Lake, and enjoy local Vietnamese coffee." },
      { day: "Day 2", title: "Hanoi to Halong Bay Overnight Cruise", description: "Drive to Halong Bay. Board a luxury cruise ship. Kayak around limestone karsts and visit caves." },
      { day: "Day 3", title: "Halong Bay to Hoi An Ancient Town", description: "Fly to Da Nang and transfer to Hoi An. Tour the lantern-lit ancient streets and historic buildings." },
      { day: "Day 4", title: "Hoi An to Ho Chi Minh City Sightseeing", description: "Fly to Ho Chi Minh City. Visit the War Remnants Museum and the historic Post Office." },
      { day: "Day 5", title: "Cu Chi Tunnels & Mekong Delta Tour", description: "Excursion to the Cu Chi Tunnels. Later, take a boat trip through the Mekong Delta floating markets." },
      { day: "Day 6", title: "Ho Chi Minh City Departure", description: "Check out and transfer to the airport for your onward flight." }
    ]
  }
};

async function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: status code ${response.statusCode}`));
        return;
      }
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

async function updatePackages() {
  for (const [id, data] of Object.entries(scrapedData)) {
    const jsonPath = path.join(detailsDir, `${id}.json`);
    if (!fs.existsSync(jsonPath)) {
      console.warn(`JSON file does not exist: ${jsonPath}`);
      continue;
    }
    
    // Read current JSON
    const currentJson = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    
    // Update fields with scraped info
    currentJson.title = data.title;
    currentJson.description = data.description;
    currentJson.included = data.facilities;
    
    // Apply custom itinerary and highlights matching the new descriptions
    if (customDetails[id]) {
      currentJson.duration = customDetails[id].duration;
      currentJson.highlights = customDetails[id].highlights;
      currentJson.itinerary = customDetails[id].itinerary;
    }
    
    // Save the JSON
    fs.writeFileSync(jsonPath, JSON.stringify(currentJson, null, 2), 'utf8');
    console.log(`Updated JSON: ${jsonPath}`);
    
    // Download images if they exist
    const pkgImageDir = path.join(imagesDir, id);
    if (!fs.existsSync(pkgImageDir)) {
      fs.mkdirSync(pkgImageDir, { recursive: true });
    }
    
    if (data.imgUrl) {
      const mainImgPath = path.join(pkgImageDir, '01_main.jpg');
      console.log(`Downloading main image for ${id} from ${data.imgUrl}...`);
      try {
        await downloadFile(data.imgUrl, mainImgPath);
        console.log(`Saved main image: ${mainImgPath}`);
      } catch (err) {
        console.error(`Error downloading main image for ${id}:`, err.message);
      }
    }
    
    if (data.gallery && data.gallery.length > 0) {
      for (let i = 0; i < data.gallery.length; i++) {
        const galUrl = data.gallery[i];
        const num = String(i + 2).padStart(2, '0');
        const galImgPath = path.join(pkgImageDir, `${num}_gallery.jpg`);
        console.log(`Downloading gallery image ${i+1} for ${id} from ${galUrl}...`);
        try {
          await downloadFile(galUrl, galImgPath);
          console.log(`Saved gallery image: ${galImgPath}`);
        } catch (err) {
          console.error(`Error downloading gallery image ${i+1} for ${id}:`, err.message);
        }
      }
    }
  }
  
  console.log("\nFinished updating all packages and downloading images!");
}

updatePackages().catch(console.error);
