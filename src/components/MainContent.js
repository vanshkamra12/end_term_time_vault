import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import EraDetails from '../pages/EraDetails';
import CreateEntry from '../pages/CreateEntry';
import About from '../pages/About';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import KeyboardShortcutsHelp from './KeyboardShortcutsHelp';

function MainContent() {
  useKeyboardShortcuts(); 

  return (
    <main className="main-content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/era/:id" element={<EraDetails />} />
        <Route path="/create" element={<CreateEntry />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <KeyboardShortcutsHelp />
    </main>
  );
}

export default MainContent;
