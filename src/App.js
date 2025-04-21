import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MainContent from './components/MainContent';
import { EraProvider } from './contexts/EraContext';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <EraProvider>
        <Router>
          <div className="app-container">
            <Navbar />
            <MainContent />
            <Footer />
          </div>
        </Router>
      </EraProvider>
    </ErrorBoundary>
  );
}

export default App;