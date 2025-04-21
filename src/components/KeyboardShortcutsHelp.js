import { useState } from 'react';

function KeyboardShortcutsHelp() {
  const [isOpen, setIsOpen] = useState(false);

  const shortcuts = [
    { key: 'Ctrl + H', description: 'Go to Home' },
    { key: 'Ctrl + C', description: 'Create new entry' },
    { key: 'Ctrl + A', description: 'About page' },
    { key: '/', description: 'Focus search' },
    { key: 'ESC', description: 'Clear focus' }
  ];

  return (
    <div className='keyboard-shortcuts'>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className='help-button'
        aria-label='Keyboard shortcuts help'
      >
        ⌨️
      </button>
      {isOpen && (
        <div className='shortcuts-modal' role='dialog' aria-label='Keyboard shortcuts'>
          <h3>Keyboard Shortcuts</h3>
          <ul>
            {shortcuts.map(({ key, description }) => (
              <li key={key}>
                <kbd>{key}</kbd>-{description}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default KeyboardShortcutsHelp;
