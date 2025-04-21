import axios from 'axios';
// Remove unused API_CONFIG import
// const wikiApi and rateLimiter are removed since they're not used

const cache = new Map();
const CACHE_DURATION = 1000 * 60 * 60;

export const fetchEraDetails = async (searchTerm) => {
  const cached = cache.get(searchTerm);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  try {
    const wikiResponse = await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${searchTerm}`);
    
    const result = {
      success: true,
      data: {
        title: wikiResponse.data.title,
        extract: wikiResponse.data.extract,
        thumbnail: wikiResponse.data.thumbnail
      }
    };

    cache.set(searchTerm, {
      data: result,
      timestamp: Date.now()
    });

    return result;
  } catch (error) {
    console.error('Error fetching from Wikipedia:', error);
    return {
      success: false,
      data: {
        title: searchTerm.replace(/_/g, ' '),
        extract: `Historical information about ${searchTerm.replace(/_/g, ' ')}`,
        thumbnail: {
          source: `https://source.unsplash.com/800x400/?${searchTerm.replace(/_/g,'+')}`
        }
      }
    };
  }
};

export const searchTerms = {
  1: {
    wiki: "Ancient_Egypt",
    events: ["Great_Pyramid_of_Giza", "Tutankhamun", "Battle_of_Kadesh"],
    figures: ["Ramesses_II", "Hatshepsut", "Cleopatra_VII"],
    artifacts: ["Great_Sphinx_of_Giza", "Rosetta_Stone", "Death_mask_of_Tutankhamun"]
  },
  2: {
    wiki: "Ancient_Rome",
    events: ["Roman_Empire", "Battle_of_Actium", "Siege_of_Jerusalem_(70_CE)"],
    figures: ["Julius_Caesar", "Augustus", "Constantine_the_Great"],
    artifacts: ["Colosseum", "Pantheon,_Rome", "Arch_of_Constantine"]
  },
  3: {
    wiki: "Middle_Ages",
    events: ["Crusades", "Black_Death", "Hundred_Years_War"],
    figures: ["Charlemagne", "Eleanor_of_Aquitaine", "Joan_of_Arc"],
    artifacts: ["Bayeux_Tapestry", "Book_of_Kells", "Holy_Lance"]
  },
  4: {
    wiki: "Renaissance",
    events: ["Fall_of_Constantinople", "Protestant_Reformation", "Age_of_Discovery"],
    figures: ["Leonardo_da_Vinci", "Michelangelo", "Raphael"],
    artifacts: ["Mona_Lisa", "Sistine_Chapel_ceiling", "David_(Michelangelo)"]
  },
  5: {
    wiki: "Space_exploration",
    events: ["Apollo_11", "International_Space_Station", "Mars_rover"],
    figures: ["Neil_Armstrong", "Yuri_Gagarin", "Elon_Musk"],
    artifacts: ["Saturn_V", "Hubble_Space_Telescope", "Voyager_1"]
  },
  6: {
    wiki: "Islamic_Golden_Age",
    events: ["House_of_Wisdom", "Battle_of_Tours", "First_Crusade"],
    figures: ["Al-Khwarizmi", "Avicenna", "Saladin"],
    artifacts: ["Astrolabe", "Arabic_numerals", "The_Canon_of_Medicine"]
  },
  7: {
    wiki: "Age_of_Discovery",
    events: ["Discovery_of_America", "Circumnavigation_of_the_Earth", "Spanish_Armada"],
    figures: ["Christopher_Columbus", "Vasco_da_Gama", "Ferdinand_Magellan"],
    artifacts: ["Caravel", "Astrolabe", "Portolan_charts"]
  },
  8: {
    wiki: "Industrial_Revolution",
    events: ["Steam_engine", "First_railway", "Electric_light"],
    figures: ["James_Watt", "Thomas_Edison", "Nikola_Tesla"],
    artifacts: ["Steam_locomotive", "Cotton_gin", "Telegraph"]
  },
  9: {
    wiki: "Information_Age",
    events: ["ARPANET", "World_Wide_Web", "Smartphone_revolution"],
    figures: ["Tim_Berners-Lee", "Steve_Jobs", "Bill_Gates"],
    artifacts: ["Personal_computer", "Internet", "GPS"]
  },
  10: {
    wiki: "Space_Age",
    events: ["Moon_landing", "Space_Shuttle_program", "Mars_exploration"],
    figures: ["Neil_Armstrong", "Yuri_Gagarin", "Elon_Musk"],
    artifacts: ["Apollo_spacecraft", "Hubble_Space_Telescope", "Mars_Rover"]
  },
  11: {
    wiki: "Industrial_Revolution",
    events: ["Steam_engine", "Factory_system", "Railroad_transport"],
    figures: ["James_Watt", "Richard_Arkwright", "George_Stephenson"],
    artifacts: ["Steam_locomotive", "Power_loom", "Spinning_jenny"]
  },
  12: {
    wiki: "Age_of_Enlightenment",
    events: ["French_Revolution", "American_Revolution", "Scientific_Revolution"],
    figures: ["Voltaire", "John_Locke", "Immanuel_Kant"],
    artifacts: ["Encyclopedia", "Printing_press", "Scientific_instruments"]
  },
  13: {
    wiki: "Scientific_Revolution",
    events: ["Copernican_Revolution", "Invention_of_telescope", "Principia_Mathematica"],
    figures: ["Galileo_Galilei", "Isaac_Newton", "Johannes_Kepler"],
    artifacts: ["Telescope", "Microscope", "Orrery"]
  },
  14: {
    wiki: "Digital_Revolution",
    events: ["Personal_computer", "Internet", "World_Wide_Web"],
    figures: ["Bill_Gates", "Steve_Jobs", "Tim_Berners-Lee"],
    artifacts: ["Microprocessor", "Computer_mouse", "Ethernet"]
  },
  15: {
    wiki: "Quantum_computing",
    events: ["Quantum_supremacy", "Quantum_entanglement", "Quantum_teleportation"],
    figures: ["Richard_Feynman", "Peter_Shor", "David_Deutsch"],
    artifacts: ["Quantum_computer", "Ion_trap", "Quantum_sensor"]
  },
  16: {
    wiki: "Ming_dynasty",
    events: ["Forbidden_City", "Zheng_He_voyages", "Great_Wall_of_Ming"],
    figures: ["Yongle_Emperor", "Zheng_He", "Wan_Li_Emperor"],
    artifacts: ["Ming_vase", "Ming_sword", "Porcelain"]
  },
  17: {
    wiki: "Achaemenid_Empire",
    events: ["Battle_of_Marathon", "Building_of_Persepolis", "Greco-Persian_Wars"],
    figures: ["Cyrus_the_Great", "Darius_I", "Xerxes_I"],
    artifacts: ["Cyrus_Cylinder", "Behistun_Inscription", "Persian_jewelry"]
  },
  18: {
    wiki: "Maya_civilization",
    events: ["Building_of_Chichen_Itza", "Development_of_Maya_calendar", "Classic_Maya_collapse"],
    figures: ["Pacal_the_Great", "Lady_of_Tikal", "Bird_Jaguar_IV"],
    artifacts: ["Maya_codices", "Maya_stelae", "Jade_mask"]
  },
  19: {
    wiki: "Asteroid_mining",
    events: ["Space_mining_technology", "Resource_extraction", "Space_colonization"],
    figures: ["Space_entrepreneurs", "Mining_engineers", "Astronauts"],
    artifacts: ["Mining_robots", "Space_refineries", "Resource_processors"]
  },
  20: {
    wiki: "Artificial_intelligence",
    events: ["AI_singularity", "Neural_networks", "Machine_consciousness"],
    figures: ["AI_researchers", "Robot_engineers", "Neural_architects"],
    artifacts: ["AI_cores", "Quantum_neural_nets", "Consciousness_engines"]
  }
};
