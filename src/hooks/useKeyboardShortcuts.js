import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function useKeyboardShortcuts() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyPress = (e) => {
      
      if (document.activeElement.tagName === 'INPUT' || 
          document.activeElement.tagName === 'TEXTAREA') {
        return;
      }

      switch(e.key) {
        case 'h':
          if (e.ctrlKey) {
            e.preventDefault();
            navigate('/');
          }
          break;
        case 'c':
          if (e.ctrlKey) {
            e.preventDefault();
            navigate('/create');
          }
          break;
        case 'a':
          if (e.ctrlKey) {
            e.preventDefault();
            navigate('/about');
          }
          break;
        case '/':
          e.preventDefault();
          document.querySelector('.search-input')?.focus();
          break;
        case 'Escape':
          document.activeElement.blur();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [navigate]);
}
