import { useState, useEffect } from 'react';
import axios from 'axios';
import EraCard from '../components/EraCard';
import SearchBar from '../components/SearchBar';
import { useEra } from '../contexts/EraContext';

function extractYear(text) {
  const yearMatch = text.match(/\((\d{1,4}(?:\s*-\s*\d{1,4})?)\s*(BCE|CE)?\)/);
  if (yearMatch) {
    const year = yearMatch[1];
    const era = yearMatch[2] || 'CE';
    if (era === 'BCE') {
      return -parseInt(year);
    }
    return parseInt(year);
  }
  return null;
}

function Home() {
  const [eras, setEras] = useState([]);
  const [error, setError] = useState(null);
  const { filter, periods, setFilter, searchTerm, advancedFilters, filterEras } = useEra();

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        const timelineEntries = [
          {
            id: 1,
            title: "Ancient Mesopotamia: Cradle of Civilization",
            body: "Discover the birthplace of writing in Sumer (3200 BCE), where cuneiform tablets tell tales of the Epic of Gilgamesh and the Code of Hammurabi.",
            period: "Ancient",
            image: "https://www.worldhistory.org/img/c/p/1200x627/1184.jpg"
          },
          {
            id: 2,
            title: "Egyptian Dynasty: Age of Pyramids",
            body: "Witness the construction of the Great Pyramid of Giza (2560 BCE) under Pharaoh Khufu, marking mankind's greatest architectural achievement of the ancient world.",
            period: "Ancient",
            image: "https://www.worldhistory.org/img/c/p/1200x627/3242.jpg"
          },
          {
            id: 3,
            title: "Greek Golden Age",
            body: "Experience the birth of democracy in Athens (508 BCE), where philosophers like Socrates, Plato, and Aristotle laid the foundations of Western thought.",
            period: "Ancient",
            image: "https://www.worldhistory.org/img/c/p/1200x627/1276.jpg"
          },
          {
            id: 4,
            title: "Roman Republic to Empire",
            body: "Follow Julius Caesar's rise to power and the transformation of Rome from Republic to Empire (49-44 BCE), shaping the Mediterranean world.",
            period: "Ancient",
            image: "https://www.worldhistory.org/img/c/p/1200x627/12503.jpg"
          },
          {
            id: 5,
            title: "Byzantine Empire",
            body: "Explore Constantinople's golden age under Justinian I (527-565 CE), featuring the magnificent Hagia Sophia and the preservation of classical knowledge.",
            period: "Medieval",
            image: "https://www.worldhistory.org/img/c/p/1200x627/11061.jpg"
          },
          {
            id: 6,
            title: "Islamic Golden Age",
            body: "Discover the House of Wisdom in Baghdad (8th-14th century), where scholars preserved and advanced mathematics, astronomy, and medicine.",
            period: "Medieval",
            image: "https://www.worldhistory.org/img/c/p/1200x627/12174.jpg"
          },
          {
            id: 7,
            title: "Age of Vikings",
            body: "Journey with Norse explorers as they navigate from Scandinavia to North America (793-1066 CE), trading and raiding across Europe.",
            period: "Medieval",
            image: "https://www.worldhistory.org/img/c/p/1200x627/12859.jpg"
          },
          {
            id: 8,
            title: "Renaissance Florence",
            body: "Witness the flowering of art and humanism under the Medici family (14th-17th century), featuring works by Leonardo and Michelangelo.",
            period: "Medieval",
            image: "https://www.worldhistory.org/img/c/p/1200x627/12331.jpg"
          },
          {
            id: 9,
            title: "Lunar Colonies",
            body: "Experience humanity's first permanent settlement on the Moon (2040), establishing sustainable habitats and resource extraction facilities.",
            period: "Future",
            image: "https://images.nasa.gov/images/as11-40-5873~medium.jpg"
          },
          {
            id: 10,
            title: "Mars Terraforming",
            body: "Watch the transformation of Mars into a habitable world (2070-2170), using advanced climate modification and biological engineering.",
            period: "Future",
            image: "https://images.nasa.gov/images/PIA17944~medium.jpg"
          },
          {
            id: 11,
            title: "Industrial Revolution",
            body: "Experience the transformation of manufacturing and society (1760-1840), with steam power and mechanization revolutionizing the world.",
            period: "Medieval",
            image: "https://www.worldhistory.org/img/c/p/1200x627/14589.jpg"
          },
          {
            id: 12,
            title: "Age of Enlightenment",
            body: "Witness the intellectual revolution (1715-1789) that championed reason, science, and individual rights.",
            period: "Medieval",
            image: "https://www.worldhistory.org/img/c/p/1200x627/13452.jpg"
          },
          {
            id: 13,
            title: "Scientific Revolution",
            body: "Follow the birth of modern science (1543-1687), featuring Copernicus, Galileo, and Newton.",
            period: "Medieval",
            image: "https://www.worldhistory.org/img/c/p/1200x627/12744.jpg"
          },
          {
            id: 14,
            title: "Digital Revolution",
            body: "Explore the transformation from analog to digital technology (1950-2000), reshaping communication and society.",
            period: "Future",
            image: "https://images.nasa.gov/images/computer_history~medium.jpg"
          },
          {
            id: 15,
            title: "Quantum Age",
            body: "Discover the future of computing (2025-2050) with quantum computers revolutionizing technology.",
            period: "Future",
            image: "https://images.nasa.gov/images/quantum_computer~medium.jpg"
          },
          {
            id: 16,
            title: "Ming Dynasty",
            body: "Experience China's golden age (1368-1644), featuring exploration, art, and architectural marvels.",
            period: "Medieval",
            image: "https://www.worldhistory.org/img/c/p/1200x627/10589.jpg"
          },
          {
            id: 17,
            title: "Persian Empire",
            body: "Explore the vast empire of Cyrus and Darius (550-330 BCE), spanning three continents.",
            period: "Ancient",
            image: "https://www.worldhistory.org/img/c/p/1200x627/9872.jpg"
          },
          {
            id: 18,
            title: "Mayan Civilization",
            body: "Discover the advanced mathematics and astronomy of the Maya (2000 BCE - 1500 CE).",
            period: "Ancient",
            image: "https://www.worldhistory.org/img/c/p/1200x627/8756.jpg"
          },
          {
            id: 19,
            title: "Space Mining Era",
            body: "Witness the exploitation of asteroid resources (2060-2090) transforming Earth's economy.",
            period: "Future",
            image: "https://images.nasa.gov/images/asteroid_mining~medium.jpg"
          },
          {
            id: 20,
            title: "AI Renaissance",
            body: "Experience the merger of human and artificial intelligence (2080-2100).",
            period: "Future",
            image: "https://images.nasa.gov/images/ai_future~medium.jpg"
          }
        ].map(era => ({
          ...era,
          year: extractYear(era.body) 
        }));
        setEras(timelineEntries);
        setError(null);
      })
      .catch(error => {
        console.error('Error fetching eras:', error);
        setError('Failed to load eras. Please try again.');
        setEras([]);
      });
  }, []);

  const filteredEras = filterEras(eras).filter(era => {
    const matchesSearch = era.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         era.body.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPeriod = advancedFilters.period === 'All' || 
                         era.period === advancedFilters.period;
    
    return matchesSearch && matchesPeriod;
  });

  console.log('Filter:', filter, 'Filtered Eras:', filteredEras); 

  return (
    <div className="home">
      <h1 className="animated-heading">
        <span>Explore</span> <span>Time</span> <span>Vault</span>
      </h1>
      <SearchBar />
      {error && <p className="error">{error}</p>}
      <div className="filter">
        <label>Filter by Period:</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          {periods.map(period => (
            <option key={period} value={period}>{period}</option>
          ))}
        </select>
      </div>
      <div className="era-grid">
        {filteredEras.length > 0 ? (
          filteredEras.map(era => (
            <EraCard key={era.id} era={era} />
          ))
        ) : (
          <p>No eras found for this period.</p>
        )}
      </div>
    </div>
  );
}

export default Home;