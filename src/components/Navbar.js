import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="navbar-brand">Time Vault</Link>
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/create">Create</Link>
          <Link to="/about">About</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;