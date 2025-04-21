import { Link } from 'react-router-dom';

function EraCard({ era }) {
  if (!era || !era.id) {
    return null;
  }
  return (
    <div className="era-card">
      <div className="era-card-image" style={{ backgroundImage: `url(${era.image})` }} />
      <div className="era-card-content">
        <h3>{era.title}</h3>
        <p>{era.body}</p>
        <p className="era-period">Period: {era.period}</p>
        <Link to={`/era/${era.id}`} className="era-link">Explore Era</Link>
      </div>
    </div>
  );
}

export default EraCard;