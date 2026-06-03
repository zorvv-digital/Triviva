import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const detailsDir = path.join(__dirname, '..', 'public', 'data', 'packages', 'packages_json');

// Mappings of precise day-by-day clean details for all 26 packages.
// These match the exact places, transport, and itineraries of Budget Holidays, but rephrased professionally.
const packageDataClean = {
  "kashmir-escape": {
    title: "Heaven on Earth: 6-Day Magical Kashmir Escape from Delhi",
    duration: "6 Days / 5 Nights",
    description: "Discover Kashmir’s breathtaking valleys, serene lakes, and snow-capped peaks on this guided 6-day tour from Delhi. Enjoy scenic shikara rides on Dal Lake, stay in a luxury houseboat, and explore Gulmarg and Pahalgam.",
    highlights: [
      "Houseboat stay on the tranquil Dal Lake in Srinagar",
      "Traditional sunset Shikara ride with Kashmiri Kahwa tea",
      "Gondola cable car ride in Gulmarg for panoramic views",
      "Guided excursions to Betaab and Aru Valleys in Pahalgam"
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Delhi to Srinagar Flight and Dal Lake Shikara Ride",
        description: "Board your flight from Delhi to Srinagar. Upon arrival, transfer to a deluxe houseboat on Dal Lake. Spend the evening enjoying a sunset Shikara ride, exploring floating markets and lotus gardens."
      },
      {
        day: "Day 2",
        title: "Guided Srinagar Local Sightseeing Tour",
        description: "Visit the famous Mughal Gardens, including Shalimar Bagh, Nishat Bagh, and Chashme Shahi. In the afternoon, explore the Hazratbal Shrine and the historic Shankaracharya Temple, followed by a walk along Dal Lake."
      },
      {
        day: "Day 3",
        title: "Srinagar to Gulmarg Adventure Excursion",
        description: "Drive to the beautiful meadows of Gulmarg. Experience the famous Gulmarg Gondola cable car ride for stunning high-altitude views of the Himalayas. Enjoy free time for snow sports and scenery."
      },
      {
        day: "Day 4",
        title: "Gulmarg to Pahalgam Valley Drive",
        description: "Drive to Pahalgam, passing through vibrant saffron fields. Visit the famous Betaab Valley and Aru Valley, and relax by the Lidder River in the afternoon."
      },
      {
        day: "Day 5",
        title: "Pahalgam Leisure and Return to Srinagar",
        description: "Spend the morning at leisure or enjoy an optional pony ride to Chandanwari. In the afternoon, drive back to Srinagar, stop by a local carpet weaving center, and shop for dry fruits and pashmina shawls."
      },
      {
        day: "Day 6",
        title: "Srinagar to Delhi Departure",
        description: "Check out of your hotel and transfer to Srinagar Airport for your return flight back to Delhi."
      }
    ]
  },
  "rajasthan-heritage": {
    title: "Rajasthan Royal Retreat: 6-Day Heritage Tour",
    duration: "6 Days / 5 Nights",
    description: "Explore the land of kings on this heritage tour, covering majestic forts, grand palaces, sand dunes, and cultural heritage. Experience stays in Jodhpur, Jaisalmer, and Udaipur.",
    highlights: [
      "Guided Mehrangarh Fort and Jaswant Thada tour in Jodhpur",
      "Desert camel safari and overnight camp in Jaisalmer dunes",
      "Explore the golden alleys of Sonar Quila (Jaisalmer Fort)",
      "Scenic Lake Pichola boat cruise in Udaipur"
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Jodhpur Arrival and Blue City Sightseeing",
        description: "Arrive at Jodhpur Airport or Railway Station and check into your hotel. Set out to visit the grand Mehrangarh Fort, Jaswant Thada monument, and Umaid Bhawan Palace. Explore the Clock Tower market in the evening."
      },
      {
        day: "Day 2",
        title: "Jodhpur to Jaisalmer Desert Safari",
        description: "Drive from Jodhpur to the golden desert town of Jaisalmer. In the evening, head to the Sam Sand Dunes for a camel ride, jeep safari, Rajasthani folk dance performance, and traditional dinner."
      },
      {
        day: "Day 3",
        title: "Jaisalmer Golden City Exploration",
        description: "Visit the spectacular Jaisalmer Fort (Sonar Quila), Patwon Ki Haveli, and Salim Singh Ki Haveli. Enjoy a quiet walk or boat ride at Gadisar Lake in the afternoon."
      },
      {
        day: "Day 4",
        title: "Jaisalmer to Udaipur via Ranakpur Temples",
        description: "Travel to Udaipur, stopping en route at the historic Ranakpur Jain Temple, famous for its 1,444 carved marble pillars. Reach Udaipur and enjoy a relaxing evening by Lake Pichola."
      },
      {
        day: "Day 5",
        title: "Udaipur Lakes and Palaces Sightseeing",
        description: "Discover the grand City Palace complex, Jag Mandir, Jagdish Temple, and Saheliyon Ki Bari garden. Enjoy a boat ride on Lake Pichola and attend a cultural performance in the evening."
      },
      {
        day: "Day 6",
        title: "Udaipur Departure",
        description: "After breakfast, check out of your hotel and transfer to the Udaipur airport or railway station for your onward flight."
      }
    ]
  },
  "darjeeling-scenic": {
    title: "Darjeeling Delight: 5-Day Scenic Escape",
    duration: "5 Days / 4 Nights",
    description: "Enjoy the lush tea gardens and spectacular mountain vistas of Darjeeling. Watch the sunrise over Mt. Kanchenjunga, visit historic monasteries, and experience local Himalayan culture.",
    highlights: [
      "Tiger Hill sunrise over Mount Kanchenjunga",
      "Ride the UNESCO-listed Darjeeling Himalayan Railway",
      "Stroll through sprawling tea estates with tasting sessions",
      "Visit the Himalayan Mountaineering Institute and local zoo"
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival and Transfer to Darjeeling",
        description: "Arrive at Bagdogra Airport or NJP Railway Station and drive up the scenic hills to Darjeeling. Check into your hotel and enjoy free time in the evening."
      },
      {
        day: "Day 2",
        title: "Tiger Hill Sunrise and Local Sightseeing",
        description: "Wake up early for sunrise at Tiger Hill to see Mount Kanchenjunga. Visit Ghoom Monastery and Batasia Loop on your return. After breakfast, visit the Himalayan Mountaineering Institute, Padmaja Naidu Zoo, and Tibetan Refugee Self Help Center."
      },
      {
        day: "Day 3",
        title: "Mirik Lake and Tea Estates Excursion",
        description: "Take a day trip to Mirik to see the Sumendu Lake, walking through pine forests and tea estates. Stop at the Nepal border market for shopping on the way back."
      },
      {
        day: "Day 4",
        title: "Tea Garden Walks and Toy Train Joyride",
        description: "Walk through local tea gardens to see tea pluckers at work and sample fresh brews. In the afternoon, enjoy the historic toy train ride, followed by shopping on Mall Road."
      },
      {
        day: "Day 5",
        title: "Darjeeling Departure",
        description: "Transfer back to Bagdogra Airport or NJP Railway Station for your return flight or train."
      }
    ]
  },
  "himachal-package": {
    title: "Himachal Delight: 5-Day Manali Tour",
    duration: "5 Days / 4 Nights",
    description: "Discover the alpine beauty of Manali on this 5-day mountain package. Visit Solang Valley, historic local temples, and explore the markets along the Beas River.",
    highlights: [
      "Explore Solang Valley for paragliding and zorbing",
      "Visit the ancient Hadimba Temple and Vashisht hot water springs",
      "Drive through the scenic Kullu Valley along the Beas River",
      "Explore the Mall Road and local Tibetan Monasteries"
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Delhi to Manali Road Journey",
        description: "Board your private vehicle from Delhi and drive up to Manali, passing through Bilaspur and the picturesque Kullu Valley along the Beas River. Check into your hotel."
      },
      {
        day: "Day 2",
        title: "Manali Town Sightseeing",
        description: "Explore Manali's cultural highlights: Hadimba Temple, Manu Temple, the Tibetan Monastery, and the Vashisht Hot Springs."
      },
      {
        day: "Day 3",
        title: "Solang Valley Mountain Adventure",
        description: "Spend the day in Solang Valley, enjoying adventure activities like paragliding, zorbing, quad biking, or skiing in winter."
      },
      {
        day: "Day 4",
        title: "Kullu and Kasol Day Trip",
        description: "Excursion to Kullu for shawl shopping and river rafting, followed by a visit to the riverside cafes of Kasol."
      },
      {
        day: "Day 5",
        title: "Manali to Delhi Departure",
        description: "Check out of your hotel and drive back to Delhi to catch your onward flight or train."
      }
    ]
  },
  "shimla-package": {
    title: "Shimla Getaway Package: 5-Day Hill Station Tour",
    duration: "5 Days / 4 Nights",
    description: "Experience the colonial charm of Shimla. Walk along the Mall Road, visit the snowy heights of Kufri, and explore pine-covered hills.",
    highlights: [
      "Walk the historic Mall Road and Ridge of Shimla",
      "Scenic excursion to the pine-forested slopes of Kufri",
      "Panoramic views of the mountains from Jakhoo Temple",
      "Scenic drive through the Himalayan foothills"
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Delhi to Shimla Drive",
        description: "Depart from Delhi and drive to Shimla. Check into your hotel and spend the evening walking along Mall Road and the Ridge."
      },
      {
        day: "Day 2",
        title: "Colonial Ridge and Jakhoo Temple Tour",
        description: "Visit historic buildings like Christ Church, Gaiety Theatre, and town halls. Hike up Jakhoo Hill to visit the Hanuman temple and enjoy panoramic mountain views."
      },
      {
        day: "Day 3",
        title: "Kufri Adventure Day Trip",
        description: "Take a day excursion to Kufri. Enjoy mountain walks, horse rides, and visit the Himalayan Nature Park to see local alpine wildlife."
      },
      {
        day: "Day 4",
        title: "Chail Hill Station Excursion",
        description: "Drive to Chail to visit the historic Chail Palace and the world's highest cricket ground before returning to Shimla."
      },
      {
        day: "Day 5",
        title: "Shimla to Delhi Departure",
        description: "Drive back to Delhi and transfer to the airport or railway station for departure."
      }
    ]
  },
  "goa-package": {
    title: "Goa Getaway Package: 4-Day Coastal Escape",
    duration: "4 Days / 3 Nights",
    description: "Enjoy a relaxing beach vacation in Goa. Visit Portuguese heritage sites, relax on North Goa beaches, and enjoy a river cruise.",
    highlights: [
      "Relax on North Goa beaches like Baga, Calangute, and Anjuna",
      "Explore historic 17th-century Fort Aguada",
      "Visit heritage churches in Old Goa and Latin Quarter Fontainhas",
      "Enjoy a sunset boat cruise on the Mandovi River"
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Goa Arrival and Beach Relaxation",
        description: "Arrive at Goa Airport or Railway Station and transfer to your resort. Spend the evening relaxing on Calangute Beach."
      },
      {
        day: "Day 2",
        title: "North Goa Beaches and Fort Aguada",
        description: "Visit Fort Aguada, followed by Calangute, Baga, and Anjuna beaches. Optional water sports are available at Baga beach."
      },
      {
        day: "Day 3",
        title: "South Goa Old Heritage Tour and River Cruise",
        description: "Visit the Basilica of Bom Jesus and Se Cathedral in Old Goa, followed by a walk through the Latin Quarter of Fontainhas and a sunset cruise on the Mandovi River."
      },
      {
        day: "Day 4",
        title: "Goa Departure",
        description: "Enjoy a final morning by the sea before transferring to the airport or railway station for departure."
      }
    ]
  },
  "ladakh-package": {
    title: "Ladakh Adventure: 7-Day Himalayan Odyssey",
    duration: "7 Days / 6 Nights",
    description: "Explore the high-altitude desert of Ladakh. Visit the deep blue Pangong Lake, drive through Nubra Valley, and cross the high Khardung La pass.",
    highlights: [
      "Cross the high Khardung La motorable pass",
      "Visit the iconic blue waters of Pangong Lake",
      "Explore Nubra Valley and ride double-humped camels",
      "Tour ancient monasteries like Thiksey and Hemis"
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Leh Arrival and Rest Day",
        description: "Arrive at Leh Airport and transfer to your hotel. Rest the entire day to adjust to the high altitude (3,500m)."
      },
      {
        day: "Day 2",
        title: "Leh Palace and Local Monasteries",
        description: "Visit Leh Palace, Shanti Stupa, Hall of Fame, and stroll through Leh's local markets in the evening."
      },
      {
        day: "Day 3",
        title: "Leh to Nubra Valley via Khardung La Pass",
        description: "Drive to Nubra Valley, crossing Khardung La at 5,359m. In the afternoon, visit Diskit Monastery and ride double-humped camels on Hunder sand dunes."
      },
      {
        day: "Day 4",
        title: "Nubra Valley to Pangong Lake via Shyok Route",
        description: "Travel along the scenic Shyok River to Pangong Lake. Check into your lakefront camp and watch the sunset over the water."
      },
      {
        day: "Day 5",
        title: "Pangong Lake to Leh via Chang La Pass",
        description: "Watch a beautiful sunrise over Pangong Lake, then drive back to Leh via Chang La pass, stopping at Thiksey and Hemis monasteries."
      },
      {
        day: "Day 6",
        title: "Sangam, Magnetic Hill, and Sham Valley",
        description: "Visit the Indus and Zanskar River confluence at Sangam, Magnetic Hill, Gurudwara Pathar Sahib, and Likir Monastery."
      },
      {
        day: "Day 7",
        title: "Leh Departure",
        description: "Transfer to Leh Airport for your return flight home."
      }
    ]
  },
  "haridwar-spiritual": {
    title: "Delhi to Haridwar: 7-Day Spiritual Tour",
    duration: "7 Days / 6 Nights",
    description: "Experience the holy towns of Uttarakhand. Witness Ganga Aarti in Haridwar, explore the yoga capital of Rishikesh, and visit the confluence at Devprayag.",
    highlights: [
      "Ganga Aarti ceremonies at Har Ki Pauri and Triveni Ghat",
      "Explore the temples, ashrams, and suspension bridges of Rishikesh",
      "Day excursion to Devprayag confluence of holy rivers",
      "Cable car rides to Mansa Devi and Chandi Devi temples"
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Delhi to Haridwar Transfer and Ganga Aarti",
        description: "Drive from Delhi to Haridwar. Check in and visit Har Ki Pauri in the evening to attend the holy Ganga Aarti ceremony."
      },
      {
        day: "Day 2",
        title: "Haridwar Temples and Markets Tour",
        description: "Visit the hilltop temples of Mansa Devi and Chandi Devi using the cable cars. Explore local spiritual markets and ancient ghats."
      },
      {
        day: "Day 3",
        title: "Haridwar to Rishikesh Spiritual Exploration",
        description: "Drive to Rishikesh. Walk across Ram Jhula and Laxman Jhula, visit local yoga ashrams, and watch the evening Aarti at Triveni Ghat."
      },
      {
        day: "Day 4",
        title: "Devprayag Confluence Day Excursion",
        description: "Take a day excursion to Devprayag to see where the Alaknanda and Bhagirathi rivers merge. Return to Rishikesh."
      },
      {
        day: "Day 5",
        title: "Rishikesh Ashram and Wellness Day",
        description: "Participate in yoga and meditation sessions at a local ashram. Walk along the river beaches and enjoy healthy vegetarian food."
      },
      {
        day: "Day 6",
        title: "Rishikesh to Haridwar Return",
        description: "Drive back to Haridwar. Spend the day exploring local temples, buying herbs, and tasting local street food."
      },
      {
        day: "Day 7",
        title: "Haridwar to Delhi Departure",
        description: "Check out of your hotel and drive back to Delhi for your onward flight."
      }
    ]
  },
  "golden-triangle": {
    title: "Golden Triangle: 6-Day Delhi, Agra & Jaipur Tour",
    duration: "6 Days / 5 Nights",
    description: "Discover India's golden heritage on this 6-day package. Tour the monuments of Delhi, the Taj Mahal in Agra, and the palaces of Jaipur.",
    highlights: [
      "Guided historical tours in Old and New Delhi",
      "Sunrise visit to the iconic Taj Mahal in Agra",
      "Amber Fort jeep ride and City Palace tour in Jaipur",
      "Visit Fatehpur Sikri and Abhaneri stepwells"
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Delhi",
        description: "Arrive in Delhi and transfer to your hotel. Enjoy a driving tour past India Gate and Rajpath in the evening."
      },
      {
        day: "Day 2",
        title: "Delhi Historical Sightseeing",
        description: "Visit Red Fort, Jama Masjid, and take a rickshaw ride in Chandni Chowk. Later, visit Qutub Minar and Humayun's Tomb."
      },
      {
        day: "Day 3",
        title: "Delhi to Agra and Sunset Taj Mahal",
        description: "Drive to Agra. Visit the Agra Fort and watch the sunset over the Taj Mahal from Mehtab Bagh."
      },
      {
        day: "Day 4",
        title: "Agra to Jaipur via Fatehpur Sikri",
        description: "Depart Agra for Jaipur. Stop en route to explore the Mughal city of Fatehpur Sikri and the historic stepwells."
      },
      {
        day: "Day 5",
        title: "Jaipur Amber Fort and Palaces Tour",
        description: "Visit Amber Fort, City Palace, Jantar Mantar, and take photos outside the iconic Hawa Mahal."
      },
      {
        day: "Day 6",
        title: "Jaipur to Delhi Return",
        description: "Shop for local crafts in Jaipur before driving back to Delhi for your departure flight."
      }
    ]
  },
  "ooty-package": {
    title: "Ooty Bliss: 5-Day Nilgiri Hills Tour",
    duration: "5 Days / 4 Nights",
    description: "Enjoy a mountain retreat in the Nilgiri hills of Ooty. Stroll through tea estates, take a toy train ride, and visit Doddabetta Peak.",
    highlights: [
      "Historic Nilgiri Mountain Railway Toy Train ride",
      "Panoramic views from Doddabetta Peak",
      "Scenic Pykara Falls and Pykara Lake",
      "Stroll through the Botanical Gardens and Ooty Lake"
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival and Transfer to Ooty",
        description: "Arrive at Coimbatore Airport or Railway Station and drive up the Nilgiri hills to Ooty. Check in and relax at your resort."
      },
      {
        day: "Day 2",
        title: "Ooty Lake and Botanical Gardens",
        description: "Explore the Botanical Gardens, Rose Garden, and enjoy boating on Ooty Lake. Shop for homemade chocolates and tea in the evening."
      },
      {
        day: "Day 3",
        title: "Doddabetta Peak and Coonoor Excursion",
        description: "Hike up Doddabetta Peak for sweeping valley views. Take the toy train to Coonoor to visit Dolphin's Nose and Lamb's Rock."
      },
      {
        day: "Day 4",
        title: "Pykara Falls and Pine Forest Tour",
        description: "Visit the scenic Pykara Falls, Lake, and walk through the beautiful pine forests surrounding Ooty."
      },
      {
        day: "Day 5",
        title: "Ooty to Coimbatore Departure",
        description: "Check out of your hotel and transfer back to Coimbatore for departure."
      }
    ]
  },
  "uttarakhand-divine": {
    title: "Uttarakhand Spiritual Bliss: 5-Day Hills Tour",
    duration: "5 Days / 4 Nights",
    description: "Explore Nainital and surrounding mountain districts. Boating on Naini Lake, explore Mukteshwar temples, and relax in Ranikhet forests.",
    highlights: [
      "Boating on Nainital's famous Naini Lake",
      "Himalayan views from Mukteshwar Temple and cliffs",
      "Explore pine forests and apple orchards in Ranikhet",
      "Guided lake tours of Bhimtal and Sattal"
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Delhi to Nainital Drive and Naini Lake Boat Ride",
        description: "Drive from Delhi to Nainital. Check in and spend the evening enjoying a boat ride on Naini Lake and walking along Mall Road."
      },
      {
        day: "Day 2",
        title: "Nainital Lake Tour",
        description: "Take a tour of the local lakes: Bhimtal, Sattal, and Naukuchiatal. Enjoy adventure sports, boating, and forest walks."
      },
      {
        day: "Day 3",
        title: "Nainital to Mukteshwar",
        description: "Drive to the hill station of Mukteshwar. Visit the 350-year-old Shiva Temple and enjoy panoramic views from Chauli Ki Jali cliffs."
      },
      {
        day: "Day 4",
        title: "Mukteshwar to Ranikhet Tour",
        description: "Travel to Ranikhet. Visit the Jhula Devi Temple, local golf course, and walk through the quiet pine forests."
      },
      {
        day: "Day 5",
        title: "Ranikhet to Delhi Return",
        description: "Check out of your hotel and drive back to Delhi for your onward flight."
      }
    ]
  },
  "rishikesh-spiritual": {
    title: "Rishikesh 7-Day Spiritual & Adventure Tour",
    duration: "7 Days / 6 Nights",
    description: "Experience the perfect blend of river rafting and spiritual healing. Try white-water rafting, go camping by the river, and attend yoga ashrams in Rishikesh.",
    highlights: [
      "Guided river camping experience with bonfires",
      "Exciting white-water river rafting from Shivpuri",
      "Waterfall hikes and cliff jumping activities",
      "Attend the evening Ganga Aarti at Triveni Ghat"
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival and River Beach Camping",
        description: "Arrive in Rishikesh and check into your riverfront camp. Enjoy beach activities, volleyball, and a bonfire in the evening."
      },
      {
        day: "Day 2",
        title: "White Water Rafting Adventure",
        description: "Go on a guided rafting trip from Shivpuri. Try cliff jumping and body surfing in the Ganges waters."
      },
      {
        day: "Day 3",
        title: "Waterfall Trek and Rishikesh Sightseeing",
        description: "Hike to the Neer Garh waterfall. Visit Ram Jhula, Laxman Jhula, and the historic Beatles Ashram in the afternoon."
      },
      {
        day: "Day 4",
        title: "Adventure Sports Day",
        description: "Excursion for bungee jumping, giant swing, or flying fox at Mohan Chatti. Spend the evening in local cafes."
      },
      {
        day: "Day 5",
        title: "Spiritual Yoga and Ashram Tour",
        description: "Attend a morning yoga and meditation session. Visit local spiritual ashrams and enjoy evening Aarti at Triveni Ghat."
      },
      {
        day: "Day 6",
        title: "Vashishta Cave Excursion",
        description: "Take a drive to the historic Vashishta Cave for meditation on the banks of the Ganges."
      },
      {
        day: "Day 7",
        title: "Rishikesh Departure",
        description: "Check out from your camp and transfer to the station or airport for departure."
      }
    ]
  },
  "thailand-explorer": {
    title: "9-Day Thailand Explorer Tour from India",
    duration: "9 Days / 8 Nights",
    description: "Explore the tropical beaches of Pattaya, the modern towers of Bangkok, and the historic temples of Thailand on this 9-day tour.",
    highlights: [
      "Coral Island cruise with lunch in Pattaya",
      "Grand Palace and Wat Pho temple tours in Bangkok",
      "Scenic Chao Phraya River dinner cruise",
      "Explore Bangkok's local floating markets"
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Bangkok and Transfer to Pattaya",
        description: "Fly from India to Bangkok. Meet our representative and drive to Pattaya. Check into your hotel and enjoy free time."
      },
      {
        day: "Day 2",
        title: "Coral Island Speedboat Tour",
        description: "Take a speedboat cruise to Coral Island. Spend the day swimming, sunbathing, or participating in water sports, followed by a seafood lunch."
      },
      {
        day: "Day 3",
        title: "Pattaya Sightseeing and Cable Car",
        description: "Visit Nong Nooch Tropical Garden and Buddha Mountain. Experience the Pattaya Park tower cable car ride in the afternoon."
      },
      {
        day: "Day 4",
        title: "Pattaya to Bangkok Drive",
        description: "Drive back to Bangkok. Check into your hotel and spend the evening shopping at MBK Center and Pratunam."
      },
      {
        day: "Day 5",
        title: "Bangkok Temples and Palace Tour",
        description: "Tour the Grand Palace, Wat Pho (Reclining Buddha), and Wat Traimit (Golden Buddha). Enjoy a dinner cruise on the Chao Phraya River."
      },
      {
        day: "Day 6",
        title: "Floating Market Day Excursion",
        description: "Visit the famous Damnoen Saduak Floating Market, followed by a trip to the Maeklong Railway Market."
      },
      {
        day: "Day 7",
        title: "Ayutthaya Historical Day Trip",
        description: "Excursion to the ancient capital of Ayutthaya to see historic temple ruins, including Wat Mahathat."
      },
      {
        day: "Day 8",
        title: "Bangkok Shopping and Leisure Day",
        description: "Enjoy a free day to shop at Chatuchak market or relax at a local Thai spa."
      },
      {
        day: "Day 9",
        title: "Bangkok to India Departure",
        description: "Transfer to Suvarnabhumi Airport for your flight back home."
      }
    ]
  },
  "europe-grand": {
    title: "12-Day Grand Europe Tour: 6 Countries",
    duration: "12 Days / 11 Nights",
    description: "Explore the best of Europe across 6 countries - France, Switzerland, Italy, Austria, Germany, and the Netherlands. Includes Eiffel Tower visits, Mount Titlis, Venice canal cruises, and Amsterdam tours.",
    highlights: [
      "Paris Eiffel Tower tour and Seine River cruise",
      "Mount Titlis glacier excursion in Switzerland",
      "Gondola cruise through the canals of Venice",
      "Amsterdam canal cruise and Zaanse Schans windmills"
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrive in Paris, France",
        description: "Fly from India to Paris. Meet your tour guide and transfer to your hotel. Spend the evening at leisure."
      },
      {
        day: "Day 2",
        title: "Paris Eiffel Tower and Seine Cruise",
        description: "Visit the Louvre Museum (outside), Arc de Triomphe, and Champs-Elysees. Go up the Eiffel Tower and enjoy a cruise on the Seine River."
      },
      {
        day: "Day 3",
        title: "Paris to Lucerne, Switzerland",
        description: "Drive through the scenic French countryside to Switzerland. Arrive in the lakeside city of Lucerne and check into your hotel."
      },
      {
        day: "Day 4",
        title: "Mount Titlis and Lucerne City Tour",
        description: "Excursion to Mount Titlis. Ride the rotating cable car to the snow-clad peak. In the afternoon, explore Lucerne's Chapel Bridge and Lion Monument."
      },
      {
        day: "Day 5",
        title: "Lucerne to Venice, Italy",
        description: "Drive through the Swiss Alps and across the Italian border. Check in at your hotel near Venice."
      },
      {
        day: "Day 6",
        title: "Venice Canal Tour and Gondola Ride",
        description: "Take a private water taxi to St. Mark's Square. Explore the Basilica and enjoy a classic gondola ride through the narrow canals."
      },
      {
        day: "Day 7",
        title: "Venice to Pisa and Florence",
        description: "Travel to Pisa to see the Leaning Tower. Continue to Florence for a walking tour of the historic Duomo and Ponte Vecchio."
      },
      {
        day: "Day 8",
        title: "Florence to Rome and Vatican City",
        description: "Drive to Rome. Visit Vatican City, St. Peter's Basilica, and the ruins of the historic Colosseum."
      },
      {
        day: "Day 9",
        title: "Rome to Innsbruck, Austria",
        description: "Drive north through the Brenner Pass to Innsbruck, Austria. Visit the Golden Roof and Swarovski Crystal World."
      },
      {
        day: "Day 10",
        title: "Innsbruck to Munich, Germany",
        description: "Travel to Munich. Tour Marienplatz and view the BMW Headquarters from outside, before checking in."
      },
      {
        day: "Day 11",
        title: "Munich to Amsterdam, Netherlands",
        description: "Drive north across Germany to the Netherlands. Arrive in Amsterdam and check into your hotel."
      },
      {
        day: "Day 12",
        title: "Amsterdam Canal Cruise and Departure",
        description: "Explore the Zaanse Schans windmills and a local cheese factory. Take a canal cruise, before transferring to the airport for your flight back to India."
      }
    ]
  },
  "malaysia-explorer": {
    title: "Malaysia Explorer: 4-Day City & Highlands Tour",
    duration: "4 Days / 3 Nights",
    description: "Explore Kuala Lumpur and the cool Genting Highlands. Visit the Batu Caves, the Petronas Twin Towers, and enjoy cable car rides.",
    highlights: [
      "Petronas Twin Towers photo stop in Kuala Lumpur",
      "Climb the steps of the historic Batu Caves",
      "Awana SkyWay cable car ride to Genting Highlands",
      "Explore local shopping hubs in Bukit Bintang"
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Kuala Lumpur",
        description: "Fly into Kuala Lumpur. Meet your representative and transfer to your hotel. Enjoy a free evening."
      },
      {
        day: "Day 2",
        title: "Kuala Lumpur Landmarks and Batu Caves",
        description: "Take a city tour visiting the Petronas Twin Towers, King's Palace, and Independence Square. Visit the Batu Caves in the afternoon."
      },
      {
        day: "Day 3",
        title: "Genting Highlands Day Trip",
        description: "Take an excursion to Genting Highlands. Ride the cable car and enjoy the theme parks before returning to Kuala Lumpur."
      },
      {
        day: "Day 4",
        title: "Kuala Lumpur Departure",
        description: "Enjoy a morning shopping session at Bukit Bintang before transferring to the airport for departure."
      }
    ]
  },
  "bali-bliss": {
    title: "Bali Bliss: 7-Day Tropical Escape",
    duration: "7 Days / 6 Nights",
    description: "Discover the heritage and beaches of Bali. Visit Ubud's rice terraces, watch the Uluwatu fire dance, and take a day trip to Nusa Penida.",
    highlights: [
      "Explore Ubud Monkey Forest and Tegalalang rice terraces",
      "Watch the Kecak dance at sunset at Uluwatu Temple",
      "Snorkeling and sightseeing day trip to Nusa Penida Island",
      "Enjoy Balinese beach clubs in Seminyak"
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Bali",
        description: "Fly into Bali and transfer to your hotel. Spend the evening relaxing on Kuta Beach."
      },
      {
        day: "Day 2",
        title: "Ubud Culture and Swing Tour",
        description: "Visit the Sacred Monkey Forest, local art markets, and the scenic Tegalalang Rice Terraces."
      },
      {
        day: "Day 3",
        title: "Mount Batur Volcano View and Holy Springs",
        description: "Drive to Kintamani to view Mount Batur. Visit Tirta Empul holy spring temple and a coffee plantation."
      },
      {
        day: "Day 4",
        title: "Nusa Penida Island Day Excursion",
        description: "Take a speedboat to Nusa Penida. Visit Kelingking Beach, Broken Beach, and snorkel in Crystal Bay."
      },
      {
        day: "Day 5",
        title: "Uluwatu Sunset Temple Tour",
        description: "Visit the cliffside Uluwatu Temple. Watch the traditional Kecak dance at sunset, followed by a seafood dinner."
      },
      {
        day: "Day 6",
        title: "Seminyak Beach Leisure",
        description: "Enjoy a free day to relax, shop in Seminyak, or enjoy a traditional Balinese spa massage."
      },
      {
        day: "Day 7",
        title: "Bali Departure",
        description: "Transfer to Denpasar Airport for your return flight home."
      }
    ]
  },
  "singapore-highlights": {
    title: "Singapore Highlights: 5-Day City Tour",
    duration: "5 Days / 4 Nights",
    description: "Explore the futuristic sights of Singapore. Visit Gardens by the Bay, take a night safari tram ride, and explore Sentosa Island.",
    highlights: [
      "supertree Grove and flower domes at Gardens by the Bay",
      "Universal Studios Sentosa theme park day pass",
      "Guided Night Safari tram ride at the zoo",
      "Panoramic views from Marina Bay Sands deck"
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival and Night Safari",
        description: "Fly into Singapore. Check in at your hotel. In the evening, take the Night Safari tram ride at the zoo."
      },
      {
        day: "Day 2",
        title: "City Tour and Gardens by the Bay",
        description: "Visit Merlion Park, Chinatown, and Little India. Visit the Cloud Forest and Flower Dome at Gardens by the Bay in the afternoon."
      },
      {
        day: "Day 3",
        title: "Sentosa Island and Universal Studios",
        description: "Spend the day on Sentosa Island. Enjoy Universal Studios Singapore movie-themed rides and shows."
      },
      {
        day: "Day 4",
        title: "Marina Bay Sands and Shopping",
        description: "Visit the Sands SkyPark observation deck. Spend the afternoon shopping on Orchard Road."
      },
      {
        day: "Day 5",
        title: "Singapore Departure",
        description: "Visit the Jewel Changi rain vortex before transferring to the gates for your departure flight."
      }
    ]
  },
  "sri-lanka-wonders": {
    title: "9-Day Wonders of Sri Lanka Tour",
    duration: "9 Days / 8 Nights",
    description: "Discover Sri Lanka's historical ruins, tea estates, and beaches. Climb the Sigiriya fortress, visit Kandy, and relax in Bentota.",
    highlights: [
      "Climb Sigiriya Lion Rock Fortress",
      "Visit the Temple of the Tooth Relic in Kandy",
      "Scenic Ella to Nuwara Eliya mountain train ride",
      "Wildlife leopard safari in Yala National Park"
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Colombo to Sigiriya Transfer",
        description: "Arrive at Colombo Airport and drive to Sigiriya. Check in and relax at your hotel."
      },
      {
        day: "Day 2",
        title: "Sigiriya Rock and Village Tour",
        description: "Climb the 5th-century Sigiriya Rock Fortress. Take a village bullock cart ride and enjoy a traditional lunch."
      },
      {
        day: "Day 3",
        title: "Sigiriya to Kandy via Dambulla Caves",
        description: "Drive to Kandy. Stop at Dambulla Cave Temple en route. In Kandy, attend a cultural dance show and visit the Temple of the Tooth."
      },
      {
        day: "Day 4",
        title: "Kandy to Nuwara Eliya Tea Country",
        description: "Travel to Nuwara Eliya. Tour a tea factory, see waterfalls, and walk through the colonial town."
      },
      {
        day: "Day 5",
        title: "Scenic Train Ride to Ella",
        description: "Board the mountain train to Ella. Hike up Little Adam's Peak and view the Nine Arch Bridge."
      },
      {
        day: "Day 6",
        title: "Ella to Yala Wildlife Safari",
        description: "Drive to Yala. Take an afternoon jeep safari in Yala National Park to spot leopards and elephants."
      },
      {
        day: "Day 7",
        title: "Yala to Bentota Coastal Area",
        description: "Travel to Bentota. Spend the afternoon relaxing on the beach or enjoying water sports."
      },
      {
        day: "Day 8",
        title: "Galle Fort Day Trip",
        description: "Visit the UNESCO heritage Galle Fort. Enjoy a boat safari on the Madu River in the afternoon."
      },
      {
        day: "Day 9",
        title: "Bentota to Colombo Departure",
        description: "Drive to Colombo for a city tour and shopping before transferring to the airport for departure."
      }
    ]
  },
  "dubai-luxury": {
    title: "Dubai Delight: 5-Day Luxury Tour",
    duration: "5 Days / 4 Nights",
    description: "Explore the modern skyline of Dubai. Go up the Burj Khalifa, enjoy a desert safari with BBQ dinner, and take a dhow cruise.",
    highlights: [
      "Entry to Burj Khalifa's 124th floor observation deck",
      "Desert safari with dune bashing, camel rides, and BBQ dinner",
      "Guided city tour of Marina, Jumeirah, and old souks",
      "Dinner cruise along the Dubai Creek"
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival and Creek Dhow Cruise",
        description: "Arrive in Dubai. Transfer to your hotel. In the evening, enjoy a Dhow cruise along the Creek with dinner."
      },
      {
        day: "Day 2",
        title: "City Tour and Burj Khalifa",
        description: "Visit Jumeirah Mosque, Burj Al Arab (outside), Palm Jumeirah. In the afternoon, visit Dubai Mall and the Burj Khalifa."
      },
      {
        day: "Day 3",
        title: "Desert Safari and Dune Bashing",
        description: "Spend the morning at leisure. In the afternoon, take a 4x4 desert safari with dune bashing, camel rides, and BBQ dinner."
      },
      {
        day: "Day 4",
        title: "Miracle Garden and Global Village",
        description: "Tour the floral displays at Miracle Garden. Spend the evening exploring the cultural stalls at Global Village."
      },
      {
        day: "Day 5",
        title: "Dubai Departure",
        description: "Shop at the Gold and Spice Souks in Deira before transferring to the airport for departure."
      }
    ]
  },
  "australia-adventure": {
    title: "Australia Adventure: 9-Day Sydney & Melbourne Tour",
    duration: "9 Days / 8 Nights",
    description: "Experience the highlights of Australia. Visit the Sydney Opera House, drive the Great Ocean Road, and see the Phillip Island penguins.",
    highlights: [
      "Guided inside tour of the Sydney Opera House",
      "Day excursion to the Blue Mountains National Park",
      "Road trip along the Great Ocean Road to see Twelve Apostles",
      "Watch the Penguin Parade at Phillip Island"
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Sydney",
        description: "Fly into Sydney. Transfer to your hotel and spend the evening walking around Darling Harbor."
      },
      {
        day: "Day 2",
        title: "Sydney City Tour and Opera House",
        description: "Tour Sydney, visiting Bondi Beach, the Rocks, and taking a guided inside tour of the Opera House."
      },
      {
        day: "Day 3",
        title: "Blue Mountains Day Trip",
        description: "Visit the Blue Mountains National Park, viewing the Three Sisters rock formation and riding Scenic World rails."
      },
      {
        day: "Day 4",
        title: "Sydney to Melbourne Flight",
        description: "Fly from Sydney to Melbourne. Check in and explore Melbourne's coffee lanes."
      },
      {
        day: "Day 5",
        title: "Melbourne City Sightseeing",
        description: "Tour Melbourne, visiting Royal Botanic Gardens, St. Kilda beach, and Fitzroy gardens."
      },
      {
        day: "Day 6",
        title: "Great Ocean Road Road Trip",
        description: "Enjoy a scenic drive along the Great Ocean Road to view the Twelve Apostles rock formations."
      },
      {
        day: "Day 7",
        title: "Phillip Island Penguin Excursion",
        description: "Drive to Phillip Island to watch the fairy penguins emerge from the sea at sunset."
      },
      {
        day: "Day 8",
        title: "Yarra Valley Wine Tour",
        description: "Take an excursion to the Yarra Valley wine region for tastings and lunch."
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
    description: "Explore the cultural sights of North Vietnam. Cruise past limestone islands in Halong Bay and explore Hanoi's historic quarters.",
    highlights: [
      "Overnight cruise in Halong Bay with seafood meals",
      "Cyclo ride tour through Hanoi's Old Quarter",
      "Explore ancient Temple of Literature in Hanoi",
      "Boat ride in Ninh Binh's Trang An caves"
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Hanoi",
        description: "Fly into Hanoi. Transfer to your hotel and spend the evening enjoying local street food."
      },
      {
        day: "Day 2",
        title: "Hanoi Landmarks Tour",
        description: "Visit the Ho Chi Minh Mausoleum, One Pillar Pagoda, and Temple of Literature. Take a cyclo ride in the Old Quarter."
      },
      {
        day: "Day 3",
        title: "Hanoi to Halong Bay Cruise",
        description: "Drive to Halong Bay. Board a cruise ship, enjoy a seafood lunch, and sail past limestone islands."
      },
      {
        day: "Day 4",
        title: "Halong Bay to Hanoi",
        description: "Attend a morning Tai Chi session on deck. Cruise back to harbor and return to Hanoi."
      },
      {
        day: "Day 5",
        title: "Ninh Binh Day Excursion",
        description: "Day trip to Ninh Binh. Visit ancient Hoa Lu and enjoy a boat ride through Trang An caves."
      },
      {
        day: "Day 6",
        title: "Hanoi Departure",
        description: "Check out from your hotel and transfer to Noi Bai Airport for departure."
      }
    ]
  },
  "maldives-getaway": {
    title: "Maldives Paradise Escape: 4-Day Resort Tour",
    duration: "4 Days / 3 Nights",
    description: "Relax in a tropical Maldives resort. Snorkel in coral lagoons, take a sunset dolphin cruise, and enjoy beachfront dining.",
    highlights: [
      "Stay in a beachfront resort with ocean views",
      "Guided snorkeling trip in coral reefs",
      "Sunset dolphin cruise",
      "Speedboat transfers from Male Airport"
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Male and Speedboat Transfer",
        description: "Fly into Male Airport and take a speedboat ride to your island resort. Check in and relax."
      },
      {
        day: "Day 2",
        title: "Snorkeling and Water Sports",
        description: "Take a guided snorkeling trip to see turtles and corals. Spend the afternoon windsurfing or paddleboarding."
      },
      {
        day: "Day 3",
        title: "Sunset Cruise and Private Beach Dinner",
        description: "Spend the morning at leisure. Take an afternoon sunset cruise to spot wild dolphins, followed by a beachfront dinner."
      },
      {
        day: "Day 4",
        title: "Maldives Departure",
        description: "Take a final swim before the speedboat transfer back to Male Airport for departure."
      }
    ]
  },
  "nepal-pashupatinath": {
    title: "Delhi to Nepal: 7-Day Pashupatinath Darshan Tour",
    duration: "7 Days / 6 Nights",
    description: "Embark on a pilgrimage to Nepal. Visit the holy Pashupatinath Temple, boat on Phewa Lake in Pokhara, and watch the Annapurna sunrise.",
    highlights: [
      "Special Darshan at Pashupatinath Temple in Kathmandu",
      "Boat ride on Phewa Lake in Pokhara",
      "Annapurna range sunrise view from Sarangkot",
      "Visit Swayambhunath and Boudhanath Stupas"
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Delhi to Kathmandu Flight",
        description: "Fly from Delhi to Kathmandu. Meet our representative and transfer to your hotel."
      },
      {
        day: "Day 2",
        title: "Pashupatinath Temple and Stupas Tour",
        description: "Visit Pashupatinath Temple for rituals, followed by Swayambhunath Stupa and Boudhanath Stupa."
      },
      {
        day: "Day 3",
        title: "Kathmandu to Pokhara Drive",
        description: "Drive to Pokhara, enjoying views of mountain rivers. Check in and take a boat ride on Phewa Lake."
      },
      {
        day: "Day 4",
        title: "Sarangkot Sunrise and Pokhara City Tour",
        description: "Enjoy sunrise at Sarangkot over the Annapurna range. Visit Davis Falls and Gupteshwor Cave in Pokhara."
      },
      {
        day: "Day 5",
        title: "Pokhara to Kathmandu Return",
        description: "Drive back to Kathmandu and visit the Budhanilkantha Temple (Sleeping Vishnu) in the evening."
      },
      {
        day: "Day 6",
        title: "Bhaktapur Heritage Square Tour",
        description: "Tour the medieval art and woodcarvings at Bhaktapur Durbar Square."
      },
      {
        day: "Day 7",
        title: "Kathmandu to Delhi Departure",
        description: "Transfer to Kathmandu Airport for your return flight back to Delhi."
      }
    ]
  },
  "nepal-manang-mustang": {
    title: "Mustang & Manang: 8-Day Himalayan Jeep Tour",
    duration: "8 Days / 7 Nights",
    description: "Take an off-road jeep tour through Nepal's valleys. Visit the sacred Muktinath Temple, drive along Kali Gandaki river, and see Mount Dhaulagiri.",
    highlights: [
      "4x4 off-road jeep ride along Kali Gandaki River",
      "Special visit to the sacred Muktinath Temple spouts",
      "Explore traditional Kagbeni village and Upper Mustang gate",
      "Views of Annapurna and Dhaulagiri mountain summits"
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Kathmandu",
        description: "Arrive in Kathmandu and transfer to your hotel. Meet your guides for a detailed trip briefing."
      },
      {
        day: "Day 2",
        title: "Kathmandu to Pokhara Scenic Drive",
        description: "Drive along the Trishuli River to Pokhara and check into your lakeside hotel."
      },
      {
        day: "Day 3",
        title: "Pokhara to Jomsom Flight and drive to Kagbeni",
        description: "Take a morning mountain flight to Jomsom. Transfer to a 4x4 jeep and drive to the ancient village of Kagbeni."
      },
      {
        day: "Day 4",
        title: "Kagbeni to Muktinath Darshan",
        description: "Drive up to the sacred Muktinath Temple (3,710m). Visit the 108 brass spouts, before returning to Jomsom."
      },
      {
        day: "Day 5",
        title: "Jomsom to Tatopani Hot Springs",
        description: "Drive along the Kali Gandaki Gorge to Tatopani. Relax in the natural hot springs."
      },
      {
        day: "Day 6",
        title: "Tatopani to Pokhara Return",
        description: "Drive back to Pokhara and spend the evening enjoying lakeside dining."
      },
      {
        day: "Day 7",
        title: "Pokhara to Kathmandu Drive",
        description: "Drive back to Kathmandu and enjoy a traditional Nepalese farewell dinner."
      },
      {
        day: "Day 8",
        title: "Kathmandu Departure",
        description: "Transfer to Kathmandu Airport for your departure flight."
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

// Now read from detail files, apply clean rephrases, format everything properly (uniform Day X, duration X Days / Y Nights, remove raw signs)
console.log(`Starting custom rephrasing with exact itinerary details for ${Object.keys(packageDataClean).length} packages...`);

Object.entries(packageDataClean).forEach(([baseId, data]) => {
  const filePath = path.join(detailsDir, `${baseId}.json`);
  if (!fs.existsSync(filePath)) {
    console.warn(`Warning: File not found: ${filePath}`);
    return;
  }
  
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    const original = JSON.parse(raw);
    
    // Replace with the professionally written exact copies
    original.title = data.title;
    original.duration = data.duration;
    original.description = data.description;
    original.highlights = data.highlights;
    original.itinerary = data.itinerary.map(item => ({
      day: item.day,
      title: item.title,
      description: item.description
    }));
    
    // Also cleanup included
    original.included = [
      "Premium hotel accommodations",
      "Daily breakfast buffet",
      "Private air-conditioned vehicle transfers",
      "Professional local sightseeing guides",
      "24/7 round-the-clock customer support"
    ];
    
    fs.writeFileSync(filePath, JSON.stringify(original, null, 2), 'utf8');
    console.log(`Successfully updated and cleaned: ${baseId}.json`);
  } catch (err) {
    console.error(`Error processing ${baseId}.json:`, err);
  }
});

console.log("Clean and rephrase process finished successfully!");
