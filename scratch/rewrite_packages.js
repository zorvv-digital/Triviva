import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const detailsDir = path.join(__dirname, '..', 'public', 'data', 'packages', 'packages_json');

// We define the rewritten copy for each of the 24 remaining files here.
// These are custom written to be professional, descriptive, and avoid any copy-paste/arrow-mark patterns.
const rewrites = {
  "rajasthan-heritage": {
    title: "Rajasthan Royal Retreat: 6-Day Heritage Journey",
    duration: "6 Days / 5 Nights",
    description: "Embark on an enchanting journey through the land of kings. This 6-day heritage tour covers the blue streets of Jodhpur, the golden sands of Jaisalmer, and the scenic lake views of Udaipur, complete with luxury desert camping and palace tours.",
    highlights: [
      "Guided tours of historic forts and palaces in Jodhpur and Udaipur",
      "Desert camping and camel safari at Sam Sand Dunes in Jaisalmer",
      "Visit to the world-renowned Ranakpur Jain Temple with 1,444 pillars",
      "Scenic evening boat cruise on the pristine Lake Pichola"
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Jodhpur and Blue City Exploration",
        description: "Arrive in Jodhpur where our representative will welcome you. Transfer to your hotel for check-in. In the afternoon, visit the imposing Mehrangarh Fort, Jaswant Thada, and Umaid Bhawan Palace, followed by a stroll through the local Clock Tower market."
      },
      {
        day: "Day 2",
        title: "Jodhpur to Jaisalmer Desert Adventure",
        description: "Travel to the golden city of Jaisalmer. Upon arrival, check in at your hotel. In the evening, head to the Sam Sand Dunes for an exciting camel safari, traditional Rajasthani folk dances, and an authentic dinner under the stars."
      },
      {
        day: "Day 3",
        title: "Discovering Jaisalmer's Golden Architecture",
        description: "Explore the historic Jaisalmer Fort (Sonar Quila), followed by visits to the intricately carved Patwon Ki Haveli and Salim Singh Ki Haveli. Spend the evening relaxing near Gadisar Lake and exploring the vibrant local bazaars."
      },
      {
        day: "Day 4",
        title: "Jaisalmer to Udaipur via Ranakpur",
        description: "Drive to Udaipur, making a stop en route at the spectacular Ranakpur Jain Temple, famous for its 1,444 uniquely carved marble pillars. Arrive in Udaipur, check into your hotel, and relax by Lake Pichola."
      },
      {
        day: "Day 5",
        title: "Udaipur Palace and Lake Sightseeing",
        description: "Visit the grand City Palace complex, Jagdish Temple, and the beautiful fountains of Saheliyon Ki Bari. Enjoy a scenic afternoon boat ride on Lake Pichola to visit Jag Mandir Island, followed by a cultural performance in the evening."
      },
      {
        day: "Day 6",
        title: "Udaipur Departure",
        description: "Enjoy a final breakfast at your hotel before checking out. Transfer to the Udaipur airport or railway station for your onward journey."
      }
    ]
  },
  "darjeeling-scenic": {
    title: "Darjeeling Delight: 5-Day Scenic Hill Station Retreat",
    duration: "5 Days / 4 Nights",
    description: "Breathe in the fresh mountain air of Darjeeling on this scenic 5-day escape. Watch the sunrise over Mt. Kanchenjunga, ride the legendary Himalayan Toy Train, and explore lush tea estates.",
    highlights: [
      "Spectacular sunrise view over Mount Kanchenjunga from Tiger Hill",
      "Historic ride on the UNESCO-listed Himalayan Toy Train",
      "Guided tour of the Himalayan Mountaineering Institute and local zoo",
      "Stroll through pristine tea gardens and sample fresh Darjeeling tea"
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival and Transfer to Darjeeling",
        description: "Arrive at Bagdogra Airport or NJP Railway Station and transfer to Darjeeling. Check into your hotel and spend the rest of the day at leisure, exploring the local Mall Road or enjoying the mountain views."
      },
      {
        day: "Day 2",
        title: "Tiger Hill Sunrise and Darjeeling Sightseeing",
        description: "Wake up early for a drive to Tiger Hill to witness the sunrise over Mount Kanchenjunga. On the way back, visit Ghoom Monastery and Batasia Loop. After breakfast, visit the Himalayan Mountaineering Institute, Padmaja Naidu Zoo, and Tibetan Refugee Self Help Center."
      },
      {
        day: "Day 3",
        title: "Mirik Lake Excursion",
        description: "Take a day trip to the picturesque town of Mirik, famous for its serene Sumendu Lake surrounded by pine forests. Enjoy horse riding or boating on the lake, and stop at the Indo-Nepal border market on your return."
      },
      {
        day: "Day 4",
        title: "Tea Garden Tours and Toy Train Ride",
        description: "Visit a prominent Darjeeling tea estate to see how tea is processed and enjoy a tasting session. In the afternoon, experience the iconic toy train joy ride, followed by an evening shopping for local handicrafts."
      },
      {
        day: "Day 5",
        title: "Darjeeling Departure",
        description: "Check out from your hotel and transfer back to Bagdogra Airport or NJP Railway Station for your departure flight or train."
      }
    ]
  },
  "himachal-package": {
    title: "Himachal Delight: 5-Day Manali Alpine Escape",
    duration: "5 Days / 4 Nights",
    description: "Explore the beautiful valleys and snow-capped peaks of Manali on this 5-day mountain tour. Features visits to Solang Valley, historic temples, and scenic nature trails.",
    highlights: [
      "Adventure activities and paragliding in Solang Valley",
      "Visit to the historic Hadimba Temple and Vashisht Hot Springs",
      "Scenic drives through the Kullu Valley and along the Beas River",
      "Leisurely shopping at Manali Mall Road"
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Travel from Delhi to Manali",
        description: "Board your private vehicle from Delhi and enjoy a scenic drive to Manali, passing through Bilaspur and the picturesque Kullu Valley along the Beas River. Check into your hotel upon arrival."
      },
      {
        day: "Day 2",
        title: "Manali Local Sightseeing",
        description: "Explore Manali's cultural highlights, including the ancient wooden Hadimba Temple, Manu Temple, and the Tibetan Monastery. In the afternoon, relax in the therapeutic Vashisht Hot Springs."
      },
      {
        day: "Day 3",
        title: "Solang Valley Adventure Excursion",
        description: "Spend the day in Solang Valley, a hub for outdoor adventure. Try your hand at paragliding, zorbing, or quad biking. During winter months, enjoy snowboarding and skiing in the fresh snow."
      },
      {
        day: "Day 4",
        title: "Kullu Valley and Kasol Day Trip",
        description: "Take an excursion to the beautiful Kullu Valley. Visit local shawl factories and try river rafting. Continue to the scenic village of Kasol situated on the banks of the Parvati River before returning to Manali."
      },
      {
        day: "Day 5",
        title: "Manali to Delhi Return Journey",
        description: "Check out from your hotel and begin the drive back to Delhi, taking home fond memories of your Himalayan escape."
      }
    ]
  },
  "shimla-package": {
    title: "Shimla Getaway: 5-Day Pine Forest & Ridge Tour",
    duration: "5 Days / 4 Nights",
    description: "Escape to Shimla, the former summer capital of British India. Explore the famous Mall Road, visit the snowy slopes of Kufri, and walk through colonial architecture.",
    highlights: [
      "Stroll through colonial-era buildings on the Shimla Ridge and Mall Road",
      "Scenic excursion to the pine-forested slopes of Kufri",
      "Panoramic views of the Himalayas from Jakhoo Hill Temple",
      "Drive through apple orchards and pine valleys"
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Delhi to Shimla Drive",
        description: "Depart from Delhi for a scenic drive up the Himalayan foothills to Shimla. Check into your hotel and spend the evening strolling along the famous Mall Road and Ridge."
      },
      {
        day: "Day 2",
        title: "Shimla Ridge and Jakhoo Temple Tour",
        description: "Visit the historic Christ Church, Gaiety Theatre, and the Town Hall. Hike or take the ropeway to Jakhoo Temple on the highest peak in Shimla to enjoy panoramic mountain views and see the giant Hanuman statue."
      },
      {
        day: "Day 3",
        title: "Kufri Alpine Excursion",
        description: "Take a day trip to Kufri, situated at an altitude of 2,630 meters. Enjoy horse riding, visit the Himalayan Nature Park to see rare high-altitude wildlife, and explore the beautiful pine forests."
      },
      {
        day: "Day 4",
        title: "Chail Day Excursion",
        description: "Drive to the quiet hill station of Chail. Visit the historic Chail Palace and the world's highest cricket ground. Return to Shimla for a relaxing evening."
      },
      {
        day: "Day 5",
        title: "Shimla to Delhi Return",
        description: "Check out of your hotel and drive back down to Delhi, marking the end of your Shimla holiday."
      }
    ]
  },
  "goa-package": {
    title: "Goa Getaway: 4-Day Coastal Escape",
    duration: "4 Days / 3 Nights",
    description: "Soak up the sun on Goa's golden beaches. Enjoy beachside dining, historic Portuguese forts, and water sports in this relaxing 4-day coastal vacation.",
    highlights: [
      "Relax on the popular beaches of Baga, Calangute, and Anjuna",
      "Explore the historic Fort Aguada with its scenic ocean views",
      "Guided tour of Old Goa churches and spice plantations",
      "Sunset river cruise on the Mandovi River"
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Goa and Beach Leisure",
        description: "Arrive at Goa Airport or Railway Station and transfer to your resort. Spend the afternoon relaxing by the pool or taking a leisurely walk along Calangute Beach."
      },
      {
        day: "Day 2",
        title: "North Goa Beaches and Fort Aguada",
        description: "Explore the highlights of North Goa. Visit the 17th-century Portuguese Fort Aguada, followed by beach hops to Baga, Anjuna, and Vagator. Optional water sports are available at Baga beach."
      },
      {
        day: "Day 3",
        title: "South Goa Heritage and River Cruise",
        description: "Discover South Goa's rich heritage. Visit the Basilica of Bom Jesus and Se Cathedral in Old Goa, followed by a walk through the colonial Latin Quarter of Fontainhas. In the evening, enjoy a sunset cruise on the Mandovi River."
      },
      {
        day: "Day 4",
        title: "Goa Departure",
        description: "Enjoy a final morning at the beach before checking out. Transfer to the airport or railway station for your return flight."
      }
    ]
  },
  "ladakh-package": {
    title: "Ladakh Adventure: 7-Day Himalayan Odyssey",
    duration: "7 Days / 6 Nights",
    description: "Journey through the high-altitude deserts of Ladakh. Cross the Khardung La pass, marvel at the blue waters of Pangong Lake, and explore ancient Buddhist monasteries.",
    highlights: [
      "Cross Khardung La, one of the world's highest motorable passes",
      "Marvel at the changing colors of the high-altitude Pangong Lake",
      "Visit historic monasteries including Hemis, Thiksey, and Diskit",
      "Drive through the scenic Nubra Valley and ride double-humped camels"
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Leh and Acclimatization",
        description: "Fly into Leh and transfer to your hotel. It is critical to spend the entire day resting to acclimatize to the high altitude (3,500 meters). Enjoy hot tea and light walks in the evening."
      },
      {
        day: "Day 2",
        title: "Leh Palace and Monasteries",
        description: "Visit the historic Leh Palace, Shanti Stupa, and the Hall of Fame museum. Spend the afternoon exploring the colorful local Leh market."
      },
      {
        day: "Day 3",
        title: "Leh to Nubra Valley via Khardung La Pass",
        description: "Drive to the high-altitude Nubra Valley, crossing the famous Khardung La pass at 5,359 meters. In the afternoon, visit Diskit Monastery and enjoy a camel ride on the sand dunes of Hunder."
      },
      {
        day: "Day 4",
        title: "Nubra Valley to Pangong Lake via Shyok",
        description: "Depart Nubra Valley and travel along the scenic Shyok River to the breathtaking Pangong Lake, situated on the Indo-China border. Check into a lakefront camp and watch the sunset."
      },
      {
        day: "Day 5",
        title: "Pangong Lake to Leh via Chang La Pass",
        description: "Wake up to a stunning sunrise over Pangong Lake. Drive back to Leh, crossing the Chang La pass, and visit the iconic Thiksey and Hemis Monasteries on the way."
      },
      {
        day: "Day 6",
        title: "Sham Valley Sightseeing",
        description: "Explore the Sham Valley, including the confluence of the Indus and Zanskar rivers at Sangam, the mysterious Magnetic Hill, and the Gurudwara Pathar Sahib."
      },
      {
        day: "Day 7",
        title: "Leh Departure",
        description: "Transfer to Leh airport early in the morning for your flight back home."
      }
    ]
  },
  "haridwar-spiritual": {
    title: "Delhi to Haridwar: 7-Day Spiritual Tour",
    duration: "7 Days / 6 Nights",
    description: "Immerse yourself in India's spiritual heartland. Witness the grand Ganga Aarti in Haridwar, explore yoga ashrams in Rishikesh, and visit the holy town of Devprayag.",
    highlights: [
      "Attend the evening Ganga Aarti ceremony at Har Ki Pauri in Haridwar",
      "Cross the suspension bridges of Laxman Jhula and Ram Jhula in Rishikesh",
      "Visit Devprayag, the holy confluence of the Alaknanda and Bhagirathi rivers",
      "Participate in yoga and meditation sessions at local ashrams"
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Delhi to Haridwar Transfer",
        description: "Drive from Delhi to Haridwar. Upon arrival, check into your hotel. In the evening, visit Har Ki Pauri to witness the spectacular Ganga Aarti ceremony on the banks of the holy river."
      },
      {
        day: "Day 2",
        title: "Haridwar Temple Sightseeing",
        description: "Visit Mansa Devi Temple and Chandi Devi Temple, accessible by scenic cable car rides. Explore the local spiritual markets and Daksh Mahadev Temple in Kankhal."
      },
      {
        day: "Day 3",
        title: "Haridwar to Rishikesh Excursion",
        description: "Drive to Rishikesh, the yoga capital of the world. Explore Ram Jhula, Laxman Jhula, and the historic Beatles Ashram, followed by an evening Aarti at Triveni Ghat."
      },
      {
        day: "Day 4",
        title: "Day Trip to Devprayag",
        description: "Take a day excursion to Devprayag, where the Alaknanda and Bhagirathi rivers merge to form the holy River Ganges. Return to Rishikesh for overnight stay."
      },
      {
        day: "Day 5",
        title: "Rishikesh Yoga and Wellness Day",
        description: "Spend the day participating in yoga and meditation classes at a renowned ashram. Walk along the river beaches and enjoy organic local vegetarian meals."
      },
      {
        day: "Day 6",
        title: "Rishikesh to Haridwar Return",
        description: "Drive back to Haridwar. Spend the day at leisure for spiritual shopping, purchasing organic herbs, and exploring local street food."
      },
      {
        day: "Day 7",
        title: "Haridwar to Delhi Departure",
        description: "Check out from your hotel and drive back to Delhi, concluding your spiritual journey."
      }
    ]
  },
  "golden-triangle": {
    title: "Golden Triangle: 6-Day Delhi, Agra & Jaipur Tour",
    duration: "6 Days / 5 Nights",
    description: "Discover India's rich cultural heritage. Explore the historic monuments of Old and New Delhi, admire the stunning Taj Mahal in Agra, and visit the royal palaces of Jaipur.",
    highlights: [
      "Guided tour of historic UNESCO monuments in Old and New Delhi",
      "Witness the sunrise over the magnificent Taj Mahal in Agra",
      "Explore the royal Amber Fort and City Palace in Jaipur",
      "Drive through the ghost city of Fatehpur Sikri"
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Delhi",
        description: "Arrive in Delhi and check into your hotel. Spend the afternoon at leisure, followed by a driving tour past India Gate and the President's House in the evening."
      },
      {
        day: "Day 2",
        title: "Delhi City Sightseeing Tour",
        description: "Explore the heritage of Old Delhi, including the Red Fort, Jama Masjid, and a rickshaw ride through Chandni Chowk. Later, visit Qutub Minar and Humayun's Tomb in New Delhi."
      },
      {
        day: "Day 3",
        title: "Delhi to Agra and Taj Mahal Visit",
        description: "Drive to Agra. In the afternoon, visit the massive Agra Fort and witness a spectacular sunset over the Taj Mahal from the banks of the Yamuna River."
      },
      {
        day: "Day 4",
        title: "Agra to Jaipur via Fatehpur Sikri",
        description: "Depart Agra for Jaipur. En route, stop at the deserted Mughal city of Fatehpur Sikri and the Abhaneri stepwells. Arrive in Jaipur and check into your hotel."
      },
      {
        day: "Day 5",
        title: "Jaipur Palace and Fort Sightseeing",
        description: "Visit the majestic hilltop Amber Fort. In the afternoon, explore the City Palace, Jantar Mantar observatory, and photo stop at the iconic Hawa Mahal (Palace of Winds)."
      },
      {
        day: "Day 6",
        title: "Jaipur to Delhi Return",
        description: "Enjoy a morning shopping session for textiles and jewelry in Jaipur before driving back to Delhi for your departure flight."
      }
    ]
  },
  "ooty-package": {
    title: "Ooty Bliss: 5-Day Nilgiri Hills Retreat",
    duration: "5 Days / 4 Nights",
    description: "Escape to the beautiful tea plantations and pine forests of Ooty. Enjoy a ride on the Nilgiri Mountain Railway, visit Doddabetta Peak, and stroll through botanical gardens.",
    highlights: [
      "Ride the historic Nilgiri Mountain Railway Toy Train",
      "Panoramic views of the valleys from Doddabetta Peak",
      "Relaxing boat ride on Ooty Lake and stroll in botanical gardens",
      "Visit Pykara Falls and Pykara Lake"
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival and Transfer to Ooty",
        description: "Arrive at Coimbatore Airport or Railway Station and enjoy a scenic drive up the Nilgiri hills to Ooty. Check in at your resort and relax."
      },
      {
        day: "Day 2",
        title: "Ooty Botanical Gardens and Lake",
        description: "Explore the Government Botanical Gardens, Rose Garden, and take a boat ride on Ooty Lake. Spend the evening shopping for local homemade chocolates and tea."
      },
      {
        day: "Day 3",
        title: "Doddabetta Peak and Coonoor Excursion",
        description: "Drive up to Doddabetta Peak, the highest point in South India. Later, take the toy train to Coonoor and visit Sim's Park, Dolphin's Nose, and Lamb's Rock."
      },
      {
        day: "Day 4",
        title: "Pykara Falls and Pine Forest Tour",
        description: "Visit the scenic Pykara Falls, Pykara Lake, and the shooting spot pine forests. Enjoy a tranquil walk amidst nature before returning to Ooty."
      },
      {
        day: "Day 5",
        title: "Ooty to Coimbatore Departure",
        description: "Check out from the resort and drive back to Coimbatore for your onward journey."
      }
    ]
  },
  "uttarakhand-divine": {
    title: "Uttarakhand Spiritual Bliss: 5-Day Himalayan Journey",
    duration: "5 Days / 4 Nights",
    description: "Discover the serenity of the Himalayas. Visit the lake city of Nainital and the spiritual heights of Mukteshwar and Ranikhet.",
    highlights: [
      "Boating on the serene Naini Lake in Nainital",
      "Spectacular views of Himalayan peaks from Mukteshwar Temple",
      "Walk through pine forests and apple orchards in Ranikhet",
      "Visit historic temples and local ashrams"
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Delhi to Nainital Drive",
        description: "Depart from Delhi and drive to the lake district of Nainital. Check in at your hotel and spend the evening enjoying a boat ride on Naini Lake and walking along Mall Road."
      },
      {
        day: "Day 2",
        title: "Nainital Local Lake Tour",
        description: "Explore the surrounding lakes of Bhimtal, Sattal, and Naukuchiatal. Enjoy adventure sports, boating, and nature walks in the peaceful oak forests."
      },
      {
        day: "Day 3",
        title: "Nainital to Mukteshwar Hills",
        description: "Drive to Mukteshwar. Visit the 350-year-old Shiva Temple and enjoy panoramic views of the Nanda Devi peak from Chauli Ki Jali cliffs."
      },
      {
        day: "Day 4",
        title: "Mukteshwar to Ranikhet Heritage Tour",
        description: "Travel to Ranikhet. Visit the Jhula Devi Temple, the golf course, and the local army museum. Spend the night in Ranikhet surrounded by pine trees."
      },
      {
        day: "Day 5",
        title: "Ranikhet to Delhi Return",
        description: "Check out and drive back to Delhi, concluding your Himalayan vacation."
      }
    ]
  },
  "rishikesh-spiritual": {
    title: "Rishikesh Adventure & Spiritual Tour: 7-Day Journey",
    duration: "7 Days / 6 Nights",
    description: "Combine spiritual rejuvenation with high-adrenaline sports. Try white-water rafting, experience cliff jumping, hike to waterfalls, and practice yoga in Rishikesh.",
    highlights: [
      "Brave the rapids on a 16-km white-water river rafting trip on the Ganges",
      "Guided camping experience by the river with beach volleyball",
      "Attend the daily evening Ganga Aarti ceremony at Triveni Ghat",
      "Waterfall hikes and bungee jumping excursions"
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival and River Beach Camping",
        description: "Arrive in Rishikesh and check into your riverfront campsite. Spend the day participating in camp activities, playing beach volleyball, and relaxing by a bonfire."
      },
      {
        day: "Day 2",
        title: "White Water Rafting Adventure",
        description: "Embark on an exciting 16-km white-water rafting adventure from Shivpuri to Rishikesh. Try cliff jumping and body surfing in the cold river waters."
      },
      {
        day: "Day 3",
        title: "Waterfall Trekking and Local Sightseeing",
        description: "Hike to the Neer Garh waterfall for a refreshing dip. Later, visit Laxman Jhula, Ram Jhula, and the Beatles Ashram."
      },
      {
        day: "Day 4",
        title: "Bungee Jumping and Flying Fox",
        description: "Visit Mohan Chatti for adventure activities (bungee jumping and flying fox). Spend the evening at leisure in the local cafes."
      },
      {
        day: "Day 5",
        title: "Spiritual Yoga and Meditation Sessions",
        description: "Start the day with a sunrise yoga session. Spend the afternoon exploring spiritual bookshops and attending meditation lectures at local ashrams."
      },
      {
        day: "Day 6",
        title: "Vashishta Cave Exploration",
        description: "Drive to the quiet Vashishta Gufa (cave) on the banks of the Ganges for a peaceful meditation session away from the crowds."
      },
      {
        day: "Day 7",
        title: "Rishikesh Departure",
        description: "Check out from the campsite and transfer to the railway station or airport for your journey home."
      }
    ]
  },
  "thailand-explorer": {
    title: "Thailand Explorer: 5-Day Bangkok & Pattaya Tour",
    duration: "5 Days / 4 Nights",
    description: "Discover the vibrant city life of Bangkok and the tropical beaches of Pattaya. Features temple visits, coral island cruises, and shopping excursions.",
    highlights: [
      "Speedboat cruise to Coral Island with a seafood lunch",
      "Explore the magnificent Grand Palace and Temple of the Reclining Buddha",
      "Enjoy a scenic dinner cruise on the Chao Phraya River",
      "Shopping excursions at Bangkok's famous night markets"
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Bangkok and Transfer to Pattaya",
        description: "Fly into Bangkok, meet our representative, and drive to the coastal town of Pattaya. Check into your hotel and enjoy free time in the evening."
      },
      {
        day: "Day 2",
        title: "Coral Island Speedboat Excursion",
        description: "Take a speedboat ride to Coral Island. Spend the day swimming, sunbathing, or participating in parasailing and sea walking, followed by lunch."
      },
      {
        day: "Day 3",
        title: "Pattaya to Bangkok and River Cruise",
        description: "Drive back to Bangkok. Check into your hotel. In the evening, enjoy a luxury dinner cruise on the Chao Phraya River, admiring the illuminated temples."
      },
      {
        day: "Day 4",
        title: "Bangkok Historical Temples Tour",
        description: "Visit the famous Wat Pho (Temple of the Reclining Buddha) and Wat Traimit (Golden Buddha). Spend the afternoon shopping at Pratunam and MBK Center."
      },
      {
        day: "Day 5",
        title: "Bangkok Departure",
        description: "Check out from your hotel and transfer to the Suvarnabhumi Airport for your return flight."
      }
    ]
  },
  "europe-grand": {
    title: "12-Day Grand Europe Highlights Tour",
    duration: "12 Days / 11 Nights",
    description: "A grand journey through Europe's most famous cities. Experience the charm of Paris, the alpine beauty of Switzerland, the canals of Venice, and the historic ruins of Rome.",
    highlights: [
      "Visit the Eiffel Tower and take a Seine River cruise in Paris",
      "Explore the majestic Swiss Alps and Mount Titlis",
      "Gondola ride through the canals of Venice",
      "Guided tour of the Colosseum and Vatican City in Rome"
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Paris",
        description: "Fly into Paris and transfer to your hotel. Spend the evening at leisure, relaxing after your flight."
      },
      {
        day: "Day 2",
        title: "Eiffel Tower and Seine River Cruise",
        description: "Explore Paris's landmarks. Visit the Eiffel Tower, drive along the Champs-Elysees, and enjoy a romantic cruise on the Seine River."
      },
      {
        day: "Day 3",
        title: "Louvre Museum and Travel to Brussels",
        description: "Visit the Louvre Museum in the morning. In the afternoon, board a high-speed train to Brussels and explore the Grand Place."
      },
      {
        day: "Day 4",
        title: "Brussels to Amsterdam Canal Tour",
        description: "Travel to Amsterdam. Take a guided boat cruise along the iconic canal rings and visit the historic Rijksmuseum."
      },
      {
        day: "Day 5",
        title: "Amsterdam to Frankfurt",
        description: "Drive to Frankfurt, Germany, passing through the scenic Rhine Valley and stopping for a wine tasting session."
      },
      {
        day: "Day 6",
        title: "Frankfurt to Zurich, Switzerland",
        description: "Travel to Switzerland. Check into your hotel in Zurich and explore the Old Town."
      },
      {
        day: "Day 7",
        title: "Mount Titlis and Lucerne Excursion",
        description: "Excursion to Mount Titlis. Ride the rotating cable car to the snow-covered peak, walk on the glacier bridge, and visit the lake city of Lucerne."
      },
      {
        day: "Day 8",
        title: "Zurich to Venice, Italy",
        description: "Drive through the Swiss Alps and across the Italian border to Venice. Check in at your hotel."
      },
      {
        day: "Day 9",
        title: "Venice Canal Tour and Gondola Ride",
        description: "Take a private boat to St. Mark's Square. Explore the Basilica and enjoy a traditional gondola ride through the narrow canals."
      },
      {
        day: "Day 10",
        title: "Venice to Florence Sightseeing",
        description: "Travel to Florence. Enjoy a walking tour of the historic city center, visiting the Duomo and the Ponte Vecchio."
      },
      {
        day: "Day 11",
        title: "Florence to Rome and Vatican Tour",
        description: "Drive to Rome. Visit the Vatican Museums, St. Peter's Basilica, and the historic Colosseum."
      },
      {
        day: "Day 12",
        title: "Rome Departure",
        description: "Transfer to Rome Airport for your flight back home."
      }
    ]
  },
  "malaysia-explorer": {
    title: "Malaysia Explorer: 4-Day City & Highlands Tour",
    duration: "4 Days / 3 Nights",
    description: "Discover Malaysia's contrasting landscapes. Visit the Petronas Twin Towers in Kuala Lumpur, explore the Batu Caves, and escape to the cool Genting Highlands.",
    highlights: [
      "Photo stop at the iconic Petronas Twin Towers in Kuala Lumpur",
      "Climb the colorful steps of the historic Batu Caves",
      "Enjoy the cable car ride and theme parks in Genting Highlands",
      "Shopping at Bukit Bintang night markets"
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Kuala Lumpur",
        description: "Fly into Kuala Lumpur. Transfer to your hotel, check in, and spend the evening exploring the city at your own pace."
      },
      {
        day: "Day 2",
        title: "Kuala Lumpur City Tour and Batu Caves",
        description: "Explore the city, visiting the Petronas Twin Towers, King's Palace, and Independence Square. In the afternoon, visit the Batu Caves Hindu temple."
      },
      {
        day: "Day 3",
        title: "Genting Highlands Day Excursion",
        description: "Take a day trip to Genting Highlands. Ride the Awana SkyWay cable car and enjoy the indoor and outdoor theme parks before returning to Kuala Lumpur."
      },
      {
        day: "Day 4",
        title: "Kuala Lumpur Departure",
        description: "Enjoy a morning shopping session at Bukit Bintang before transferring to the airport for your departure flight."
      }
    ]
  },
  "bali-bliss": {
    title: "Bali Bliss: 7-Day Tropical Island Tour",
    duration: "7 Days / 6 Nights",
    description: "Experience the magic of Bali. Explore the cultural heart of Ubud, witness the sunsets at Uluwatu, and relax on the white sand beaches of Kuta.",
    highlights: [
      "Guided tour of Ubud monkey forest and scenic rice terraces",
      "Watch the traditional Kecak dance at the cliffside Uluwatu Temple",
      "Day cruise to Nusa Penida Island for snorkeling",
      "Relax on Seminyak and Kuta beaches"
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Bali",
        description: "Fly into Bali and transfer to your hotel. Spend the evening relaxing on the beach and enjoying a sunset dinner."
      },
      {
        day: "Day 2",
        title: "Ubud Cultural and Rice Terrace Tour",
        description: "Explore Ubud. Visit the Sacred Monkey Forest, Ubud Royal Palace, and hike through the Tegalalang Rice Terraces."
      },
      {
        day: "Day 3",
        title: "Kintamani Volcano and Holy Spring Tour",
        description: "Drive to Kintamani to view the active Mount Batur volcano. On the way back, visit Tirta Empul holy water temple and a coffee plantation."
      },
      {
        day: "Day 4",
        title: "Nusa Penida Island Day Trip",
        description: "Take a speedboat to Nusa Penida. Visit Kelingking Beach, Broken Beach, and Angel's Billabong, with time for snorkeling."
      },
      {
        day: "Day 5",
        title: "Uluwatu Sunset Temple Tour",
        description: "Visit the cliffside Uluwatu Temple in the afternoon. Watch the traditional fire dance against a sunset backdrop, followed by a seafood dinner."
      },
      {
        day: "Day 6",
        title: "Seminyak Beach Leisure Day",
        description: "Enjoy a free day to relax on the beach, try surfing, or indulge in a traditional Balinese spa massage."
      },
      {
        day: "Day 7",
        title: "Bali Departure",
        description: "Check out from your hotel and transfer to the Denpasar airport for your return flight."
      }
    ]
  },
  "singapore-highlights": {
    title: "Singapore Highlights: 5-Day Modern City Experience",
    duration: "5 Days / 4 Nights",
    description: "Explore the futuristic city-state of Singapore. Visit Gardens by the Bay, take a night safari, and enjoy the rides at Universal Studios Sentosa.",
    highlights: [
      "Visit the iconic Supertree Grove and flower domes at Gardens by the Bay",
      "Day trip to Sentosa Island, including Universal Studios theme park",
      "Night safari tram ride at the Singapore Zoo",
      "Photo stop at the Merlion Park"
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Singapore and Night Safari",
        description: "Fly into Singapore and check in at your hotel. In the evening, embark on the unique Night Safari tram ride at the zoo to see nocturnal animals."
      },
      {
        day: "Day 2",
        title: "City Tour and Gardens by the Bay",
        description: "Take a city tour visiting Merlion Park, Chinatown, and Little India. In the afternoon, visit the Cloud Forest and Flower Dome at Gardens by the Bay."
      },
      {
        day: "Day 3",
        title: "Sentosa Island and Universal Studios",
        description: "Spend the day on Sentosa Island. Enjoy entry to Universal Studios Singapore to experience movie-themed rides and shows."
      },
      {
        day: "Day 4",
        title: "Marina Bay Sands and Shopping Day",
        description: "Visit the Marina Bay Sands SkyPark observation deck. Spend the afternoon shopping on Orchard Road."
      },
      {
        day: "Day 5",
        title: "Singapore Departure",
        description: "Transfer to Jewel Changi Airport to explore the rain vortex before boarding your flight home."
      }
    ]
  },
  "sri-lanka-wonders": {
    title: "9-Day Wonders of Sri Lanka Explorer Tour",
    duration: "9 Days / 8 Nights",
    description: "Discover Sri Lanka's ancient history, tea estates, and wildlife. Visit the Sigiriya rock fortress, the sacred city of Kandy, and the beaches of Bentota.",
    highlights: [
      "Climb the spectacular UNESCO-listed Sigiriya Rock Fortress",
      "Visit the Temple of the Sacred Tooth Relic in Kandy",
      "Scenic train ride through the tea estates of Nuwara Eliya",
      "Wildlife jeep safari and beach relaxation in Bentota"
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Colombo and Transfer to Sigiriya",
        description: "Arrive at Colombo Airport and drive to the cultural triangle city of Sigiriya. Check into your hotel and relax."
      },
      {
        day: "Day 2",
        title: "Climbing Sigiriya Fortress",
        description: "Climb the 5th-century Sigiriya Lion Rock Fortress. In the afternoon, take a village tour to experience traditional Sri Lankan life and food."
      },
      {
        day: "Day 3",
        title: "Sigiriya to Kandy via Dambulla",
        description: "Drive to Kandy. En route, visit the Dambulla Cave Temple complex. In Kandy, attend a cultural dance show and visit the Temple of the Tooth Relic."
      },
      {
        day: "Day 4",
        title: "Kandy to Nuwara Eliya Tea Country",
        description: "Travel to Nuwara Eliya, passing through waterfalls and tea plantations. Visit a tea factory to see the production process."
      },
      {
        day: "Day 5",
        title: "Scenic Train Ride to Ella",
        description: "Take the iconic mountain train ride from Nuwara Eliya to Ella, crossing the famous Nine Arch Bridge. Hike up Little Adam's Peak."
      },
      {
        day: "Day 6",
        title: "Ella to Yala National Park",
        description: "Drive to Yala. Take an afternoon jeep safari in Yala National Park, famous for its high density of leopards."
      },
      {
        day: "Day 7",
        title: "Yala to Bentota Coastal Area",
        description: "Drive to the coastal town of Bentota. Spend the afternoon relaxing on the beach or enjoying water sports."
      },
      {
        day: "Day 8",
        title: "Galle Fort Day Trip",
        description: "Visit the historic Portuguese and Dutch Galle Fort, followed by a boat safari on the Madu River."
      },
      {
        day: "Day 9",
        title: "Bentota to Colombo Departure",
        description: "Drive to Colombo for a brief city tour and shopping session, before transferring to the airport for your flight home."
      }
    ]
  },
  "dubai-luxury": {
    title: "Dubai Highlights: 5-Day Desert & Luxury Tour",
    duration: "5 Days / 4 Nights",
    description: "Experience the glitz and glamour of Dubai. Visit the observation deck of Burj Khalifa, go on a desert jeep safari, and shop at the gold souk.",
    highlights: [
      "Entry ticket to the 124th floor of the Burj Khalifa tower",
      "Desert safari with dune bashing, quad biking, and BBQ dinner",
      "Half-day city tour covering Marina, Palm Jumeirah, and old souks",
      "Scenic Dhow cruise with dinner at Dubai Creek"
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival and Dhow Cruise Dinner",
        description: "Fly into Dubai. Transfer to your hotel. In the evening, enjoy a traditional Dhow cruise along Dubai Creek with a buffet dinner."
      },
      {
        day: "Day 2",
        title: "Dubai City Tour and Burj Khalifa",
        description: "Take a city tour visiting the Jumeirah Mosque, Burj Al Arab (photo stop), and Palm Jumeirah. In the afternoon, visit the Dubai Mall and go up the Burj Khalifa."
      },
      {
        day: "Day 3",
        title: "Desert Safari and Dune Bashing",
        description: "Spend the morning at leisure. In the afternoon, head to the desert for an exciting dune bashing safari, sandboarding, camel rides, and a belly dance show with BBQ dinner."
      },
      {
        day: "Day 4",
        title: "Miracle Garden and Global Village",
        description: "Visit the Dubai Miracle Garden to see floral displays. In the evening, explore the cultural pavilions and shopping stalls of Global Village."
      },
      {
        day: "Day 5",
        title: "Dubai Departure",
        description: "Enjoy a free morning for shopping at the Gold and Spice Souks before transferring to the airport for your flight home."
      }
    ]
  },
  "australia-adventure": {
    title: "Australia Highlights: 9-Day Sydney & Melbourne Tour",
    duration: "9 Days / 8 Nights",
    description: "Explore Australia's top cities. Walk around Sydney Harbor, drive the Great Ocean Road, and see penguins at Phillip Island.",
    highlights: [
      "Guided tour of the iconic Sydney Opera House",
      "Drive along the spectacular Great Ocean Road in Victoria",
      "Watch the Penguin Parade at Phillip Island",
      "Visit the Blue Mountains National Park"
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Sydney",
        description: "Fly into Sydney and transfer to your hotel. Enjoy a relaxing evening walk around Darling Harbor."
      },
      {
        day: "Day 2",
        title: "Sydney Opera House and City Tour",
        description: "Explore Sydney, visiting Bondi Beach, historic rocks, and taking a guided inside tour of the Sydney Opera House."
      },
      {
        day: "Day 3",
        title: "Blue Mountains Day Trip",
        description: "Visit the Blue Mountains National Park. See the Three Sisters rock formation and enjoy rides at Scenic World."
      },
      {
        day: "Day 4",
        title: "Sydney to Melbourne Flight",
        description: "Fly from Sydney to Melbourne. Check into your hotel and explore the city's famous laneways and coffee culture."
      },
      {
        day: "Day 5",
        title: "Melbourne City Sightseeing",
        description: "Take a city tour visiting the Royal Botanic Gardens, St. Kilda beach, and Fitzroy gardens."
      },
      {
        day: "Day 6",
        title: "Great Ocean Road Drive",
        description: "Enjoy a full-day road trip along the Great Ocean Road. See the Twelve Apostles rock stacks and scenic ocean cliffs."
      },
      {
        day: "Day 7",
        title: "Phillip Island Penguin Parade",
        description: "Take an afternoon tour to Phillip Island to watch the fairy penguins emerge from the ocean at sunset."
      },
      {
        day: "Day 8",
        title: "Yarra Valley Wine Tasting",
        description: "Take a day excursion to the Yarra Valley wine region for wine tastings and a gourmet lunch."
      },
      {
        day: "Day 9",
        title: "Melbourne Departure",
        description: "Transfer to Melbourne Airport for your departure flight."
      }
    ]
  },
  "vietnam-discover": {
    title: "Vietnam Discover: 6-Day Hanoi & Halong Bay Tour",
    duration: "6 Days / 5 Nights",
    description: "Experience the highlights of North Vietnam. Cruise through the limestone islands of Halong Bay and explore Hanoi's Old Quarter.",
    highlights: [
      "Overnight luxury cruise through Halong Bay",
      "Explore the historic Old Quarter of Hanoi on a cycloride",
      "Visit the ancient Temple of Literature and Ho Chi Minh Mausoleum",
      "Boat ride in the scenic Ninh Binh valley"
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Hanoi",
        description: "Fly into Hanoi. Transfer to your hotel, check in, and spend the evening enjoying local street food like Pho."
      },
      {
        day: "Day 2",
        title: "Hanoi City Landmarks Tour",
        description: "Visit the Ho Chi Minh Mausoleum, One Pillar Pagoda, and Temple of Literature. In the afternoon, enjoy a cycloride through the Old Quarter."
      },
      {
        day: "Day 3",
        title: "Hanoi to Halong Bay Cruise",
        description: "Drive to Halong Bay and board a luxury cruise ship. Enjoy a seafood lunch while sailing past iconic limestone karsts, and visit a cave."
      },
      {
        day: "Day 4",
        title: "Halong Bay to Hanoi",
        description: "Start the day with a Tai Chi session on the deck. Cruise back to the harbor and drive back to Hanoi for a free evening."
      },
      {
        day: "Day 5",
        title: "Ninh Binh Day Excursion",
        description: "Take a day trip to Ninh Binh. Visit the ancient capital of Hoa Lu and enjoy a rowing boat ride through the caves of Trang An."
      },
      {
        day: "Day 6",
        title: "Hanoi Departure",
        description: "Check out from your hotel and transfer to the Noi Bai Airport for your flight back home."
      }
    ]
  },
  "maldives-getaway": {
    title: "Maldives Beach Paradise: 4-Day Vacation",
    duration: "4 Days / 3 Nights",
    description: "Relax in paradise. Stay at a beach front resort, snorkel in crystal-clear lagoons, and enjoy sunset cruises in the Maldives.",
    highlights: [
      "Stay at a premium beach front resort",
      "Snorkeling sessions in coral reefs with colorful marine life",
      "Sunset dolphin cruise",
      "Private candlelit dinner on the beach"
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival and Speedboat Transfer",
        description: "Fly into Male Airport, meet our representative, and take a speedboat transfer to your tropical resort island. Enjoy welcome drinks and relax."
      },
      {
        day: "Day 2",
        title: "Snorkeling and Water Sports",
        description: "Go on a guided snorkeling safari to discover sea turtles and coral gardens. Spend the afternoon trying paddleboarding or windsurfing."
      },
      {
        day: "Day 3",
        title: "Sunset Cruise and Beach Dinner",
        description: "Spend the morning relaxing. In the afternoon, embark on a sunset cruise to spot wild dolphins, followed by a private beachside dinner."
      },
      {
        day: "Day 4",
        title: "Maldives Departure",
        description: "Enjoy a final swim in the warm Indian Ocean before checking out and taking the speedboat transfer back to Male Airport."
      }
    ]
  },
  "nepal-pashupatinath": {
    title: "Delhi to Nepal: 7-Day Pashupatinath Darshan Tour",
    duration: "7 Days / 6 Nights",
    description: "Embark on a sacred journey to Nepal. Visit the holy Pashupatinath Temple, explore the scenic city of Pokhara, and witness the sunrise over the Himalayas.",
    highlights: [
      "Special Darshan at the holy Pashupatinath Temple in Kathmandu",
      "Boat ride on the tranquil Phewa Lake in Pokhara",
      "Watch the sunrise over Mount Annapurna from Sarangkot",
      "Visit the sacred Budhanilkantha Temple (Sleeping Vishnu)"
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Delhi to Kathmandu Flight",
        description: "Fly from Delhi to Kathmandu. Upon arrival, transfer to your hotel and attend a briefing on your spiritual tour."
      },
      {
        day: "Day 2",
        title: "Pashupatinath Temple and Swayambhunath",
        description: "Visit the sacred Pashupatinath Temple for special rituals. Later, visit the ancient Swayambhunath Stupa (Monkey Temple) and Boudhanath Stupa."
      },
      {
        day: "Day 3",
        title: "Kathmandu to Pokhara Drive",
        description: "Drive to the beautiful lake city of Pokhara. Check in at your hotel and spend the evening enjoying a boat ride on Phewa Lake."
      },
      {
        day: "Day 4",
        title: "Sarangkot Sunrise and Pokhara Tour",
        description: "Drive to Sarangkot early in the morning for sunrise views over the Annapurna range. Return to Pokhara for a city tour, visiting Davis Falls and Gupteshwor Cave."
      },
      {
        day: "Day 5",
        title: "Pokhara to Kathmandu Return",
        description: "Drive back to Kathmandu. Spend the evening visiting Budhanilkantha Temple to see the sleeping statue of Lord Vishnu."
      },
      {
        day: "Day 6",
        title: "Bhaktapur Heritage Tour",
        description: "Explore the ancient Durbar Square of Bhaktapur, showcasing Nepal's medieval art and woodcarving heritage."
      },
      {
        day: "Day 7",
        title: "Kathmandu to Delhi Departure",
        description: "Transfer to Kathmandu Airport for your return flight back to Delhi."
      }
    ]
  },
  "nepal-manang-mustang": {
    title: "Mustang & Manang: 8-Day Himalayan Expedition",
    duration: "8 Days / 7 Nights",
    description: "An adventurous off-road journey through Nepal's hidden valleys. Visit the sacred Muktinath Temple, explore high-altitude lakes, and see dramatic mountain vistas.",
    highlights: [
      "Off-road jeep journey through the deep Kali Gandaki Gorge",
      "Visit the sacred temple of Muktinath with 108 water spouts",
      "Explore the traditional Tibetan-style stone villages of Manang",
      "Dramatic close-up views of Mount Annapurna and Dhaulagiri"
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Kathmandu",
        description: "Arrive in Kathmandu and transfer to your hotel. Meet your expedition guides and verify your trekking and mountain permits."
      },
      {
        day: "Day 2",
        title: "Kathmandu to Pokhara Drive",
        description: "Drive along the Trishuli River to Pokhara, the gateway to the Annapurnas. Check in and prepare your gear."
      },
      {
        day: "Day 3",
        title: "Pokhara to Jomsom Flight and drive to Kagbeni",
        description: "Take a scenic mountain flight to Jomsom. Upon arrival, drive in a 4x4 jeep to the ancient village of Kagbeni, the entry point to Upper Mustang."
      },
      {
        day: "Day 4",
        title: "Kagbeni to Muktinath Darshan",
        description: "Drive up to the sacred temple of Muktinath at 3,710 meters. Perform darshan and visit the 108 brass water spouts before returning to Jomsom."
      },
      {
        day: "Day 5",
        title: "Jomsom to Tatopani Hot Springs",
        description: "Drive down the rugged road along the Kali Gandaki River to Tatopani, famous for its natural hot springs. Relax in the hot waters."
      },
      {
        day: "Day 6",
        title: "Tatopani to Pokhara Return",
        description: "Drive back to Pokhara. Spend the evening relaxing in the lakeside cafes and sharing stories of the mountains."
      },
      {
        day: "Day 7",
        title: "Pokhara to Kathmandu Drive",
        description: "Drive back to Kathmandu and enjoy a farewell dinner with traditional Nepalese food and dance."
      },
      {
        day: "Day 8",
        title: "Kathmandu Departure",
        description: "Transfer to Kathmandu Airport for your flight back home."
      }
    ]
  },
  "nepal-complete": {
    title: "Complete Nepal: 15-Day Culture & Wildlife Tour",
    duration: "15 Days / 14 Nights",
    description: "The ultimate exploration of Nepal. This comprehensive 15-day tour covers Kathmandu's historic sites, Pokhara's lakes, Chitwan's wildlife jungles, and Lumbini's Buddhist temples.",
    highlights: [
      "Guided tour of UNESCO heritage sites in Kathmandu and Bhaktapur",
      "Jungle safari on jeeps and canoes in Chitwan National Park",
      "Visit Lumbini, the sacred birthplace of Lord Buddha",
      "Watch the sunrise over the Himalayas from Nagarkot"
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Kathmandu",
        description: "Fly into Kathmandu. Meet our representative and transfer to your hotel. Rest after your travel."
      },
      {
        day: "Day 2",
        title: "Kathmandu Monasteries and Stupas",
        description: "Visit the sacred Pashupatinath Temple, Boudhanath Stupa, and the hilltop Swayambhunath Stupa."
      },
      {
        day: "Day 3",
        title: "Kathmandu to Nagarkot Hills",
        description: "Drive to the hill station of Nagarkot. Watch a spectacular sunset over the Himalayan peaks."
      },
      {
        day: "Day 4",
        title: "Nagarkot to Kurintar (Manakamana Temple)",
        description: "Drive to Kurintar. Ride the cable car to Manakamana Temple, the wishing goddess temple, before checking in at a resort."
      },
      {
        day: "Day 5",
        title: "Kurintar to Pokhara Valley",
        description: "Travel to Pokhara. Spend the afternoon taking a boat ride on Phewa Lake and visiting Tal Barahi Temple."
      },
      {
        day: "Day 6",
        title: "Sarangkot Sunrise and Pokhara Sightseeing",
        description: "Enjoy sunrise from Sarangkot. Visit Davis Falls, Gupteshwor Cave, and the International Mountain Museum."
      },
      {
        day: "Day 7",
        title: "Pokhara to Lumbini (Birthplace of Buddha)",
        description: "Drive to Lumbini, the birthplace of Lord Buddha. Check into your hotel and rest."
      },
      {
        day: "Day 8",
        title: "Lumbini Sacred Garden Tour",
        description: "Explore the Maya Devi Temple, the Ashoka Pillar, and the beautiful monasteries built by various Buddhist nations."
      },
      {
        day: "Day 9",
        title: "Lumbini to Chitwan Jungles",
        description: "Drive to Chitwan National Park, home of the one-horned rhinoceros. Attend a Tharu cultural dance show in the evening."
      },
      {
        day: "Day 10",
        title: "Chitwan Jungle Safari and Canoeing",
        description: "Take a jeep safari through the deep jungles to spot rhinos, crocodiles, and wild birds. Enjoy a peaceful canoe ride on the Rapti River."
      },
      {
        day: "Day 11",
        title: "Chitwan to Janakpur Heritage Tour",
        description: "Drive to the historic city of Janakpur, famous for its connections to the epic Ramayana."
      },
      {
        day: "Day 12",
        title: "Janaki Temple Sightseeing",
        description: "Visit the grand Janaki Mandir, dedicated to Goddess Sita, showcasing unique Hindu-Rajput architecture."
      },
      {
        day: "Day 13",
        title: "Janakpur to Kathmandu Return",
        description: "Fly or drive back to Kathmandu. Check in at your hotel."
      },
      {
        day: "Day 14",
        title: "Patan and Durbar Square Heritage Tour",
        description: "Visit Patan Durbar Square, Krishna Temple, and the Golden Temple, exploring Nepal's ancient metalwork heritage."
      },
      {
        day: "Day 15",
        title: "Kathmandu Departure",
        description: "Transfer to Kathmandu Airport for your onward flight."
      }
    ]
  }
};

// Now we loop through the rewrites, load the target JSON, replace the specific fields, and save it back
console.log(`Starting clean rewrite process for ${Object.keys(rewrites).length} packages...`);

Object.entries(rewrites).forEach(([baseId, data]) => {
  const filePath = path.join(detailsDir, `${baseId}.json`);
  if (!fs.existsSync(filePath)) {
    console.warn(`Warning: File not found: ${filePath}`);
    return;
  }
  
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    const original = JSON.parse(raw);
    
    // Perform rewrites
    original.title = data.title;
    original.duration = data.duration;
    original.description = data.description;
    original.highlights = data.highlights;
    original.itinerary = data.itinerary;
    
    fs.writeFileSync(filePath, JSON.stringify(original, null, 2), 'utf8');
    console.log(`Successfully rewrote: ${baseId}.json`);
  } catch (err) {
    console.error(`Error rewriting ${baseId}.json:`, err);
  }
});

console.log("Rewrite completed successfully!");
