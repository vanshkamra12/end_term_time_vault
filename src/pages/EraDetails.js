import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchEraDetails, searchTerms } from '../services/historyApi';

function EraDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [era, setEra] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        if (!searchTerms[id]) {
          setError('Era not found');
          return;
        }

        const mainData = await fetchEraDetails(searchTerms[id].wiki);
        
       
        const eventsData = await Promise.all(
          (searchTerms[id].events || []).map(async (term) => {
            try {
              const data = await fetchEraDetails(term);
              return {
                title: data.data.title,
                description: data.data.extract
              };
            } catch (e) {
              return {
                title: term.replace(/_/g, ' '),
                description: 'Loading event details...'
              };
            }
          })
        );

        // Fetch figures in parallel with retry logic
        const figuresData = await Promise.all(
          (searchTerms[id].figures || []).map(async (term) => {
            try {
              const data = await fetchEraDetails(term);
              return {
                name: data.data.title,
                description: data.data.extract
              };
            } catch (e) {
              return {
                name: term.replace(/_/g, ' '),
                description: 'Loading figure details...'
              };
            }
          })
        );

        setEra({
          id,
          title: mainData.data.title,
          body: mainData.data.extract,
          period: ['Ancient', 'Medieval', 'Future'][id % 3],
          image: mainData.data.thumbnail?.source || `https://source.unsplash.com/800x400/?${searchTerms[id].wiki.replace(/_/g,'+')}`,
          events: eventsData,
          figures: figuresData,
          artifacts: searchTerms[id].artifacts
        });

      } catch (error) {
        console.error('Error fetching era details:', error);
        setError('Failed to load era details. Please try again.');
      }
    };

    fetchAllData();
  }, [id]);

  if (error) {
    return (
      <div className="era-details">
        <div className="error">
          <h2>Error Loading Era</h2>
          <p>{error}</p>
          <button onClick={() => navigate('/')} className="submit-button">
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  if (!era) {
    return (
      <div className="era-details">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Loading era details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="era-details">
      <h1 className="animated-heading">
        <span>{era.period}</span> <span>Era</span>
      </h1>
      
      {era.image && (
        <div className="era-image" style={{ 
          backgroundImage: `url(${era.image})`,
          height: '300px',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          marginBottom: '20px',
          borderRadius: '8px'
        }}></div>
      )}

      <h2>{era.title}</h2>
      <p>{era.body}</p>
      <p className="era-period">Period: {era.period}</p>

      <h3>Key Events</h3>
      {era.events && era.events.length > 0 ? (
        <ul>
          {era.events.map((event, index) => (
            <li key={index}>
              <strong>{event.title}</strong>: {event.description}
            </li>
          ))}
        </ul>
      ) : (
        <p>No events found for this era.</p>
      )}

      <h3>Notable Figures</h3>
      {era.figures && era.figures.length > 0 ? (
        <ul>
          {era.figures.map((figure, index) => (
            <li key={index}>
              <strong>{figure.name}</strong>: {figure.description}
            </li>
          ))}
        </ul>
      ) : (
        <p>No notable figures found for this era.</p>
      )}

      <h3>Artifacts</h3>
      {era.artifacts && era.artifacts.length > 0 ? (
        <ul>
          {era.artifacts.map((artifact, index) => (
            <li key={index}>{artifact}</li>
          ))}
        </ul>
      ) : (
        <p>No artifacts found for this era.</p>
      )}
    </div>
  );
}

export default EraDetails;