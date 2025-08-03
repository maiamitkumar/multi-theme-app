import React, {
  useContext,
  useState,
  useRef,
  useEffect
} from 'react';
import { ThemeContext, Theme } from './ThemeContext';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

const themes = [
  { value: 'theme1', label: <><i className="bi bi-palette me-2" />Theme 1</> },
  { value: 'theme2', label: <><i className="bi bi-moon me-2" />Theme 2</> },
  { value: 'theme3', label: <><i className="bi bi-brightness-high me-2" />Theme 3</> },
];

const Header: React.FC = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [desktopOpen, setDesktopOpen] = useState(false);
  const desktopDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        desktopDropdownRef.current &&
        !desktopDropdownRef.current.contains(event.target as Node)
      ) {
        setDesktopOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleThemeChange = (value: Theme, isMobile = false) => {
    setTheme(value);
    setDesktopOpen(false);
  };

  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light shadow ">
      <div className="container-fluid">
        <Link
          className={`navbar-brand fs-4 fw-bold`}
          to="/"
        >
          MultiTheme
        </Link>

        <div className="ms-auto align-items-center d-flex">
          {theme !== 'theme2' && (
            <Link className="nav-link me-3" to="/about">About</Link>
          )}

          {theme !== 'theme2' && (
            <Link className="nav-link me-3" to="/contact">Contact</Link>
          )}
          <div className="position-relative" ref={desktopDropdownRef}>
            <button
              className={`btn btn-light border shadow-sm d-flex align-items-center fw-medium fs-6 ${desktopOpen ? 'border-primary shadow' : ''}`}
              style={{ minWidth: '120px' }}
              onClick={() => setDesktopOpen((prev) => !prev)}
              aria-haspopup="listbox"
              aria-expanded={desktopOpen}
            >
              {themes.find((t) => t.value === theme)?.label || 'Select Theme'}
              <i className={`bi bi-chevron-down ms-2 transition-rotate ${desktopOpen ? 'rotate-180' : ''}`}></i>
            </button>
            <div
              className={`position-absolute top-100 start-0 end-0 bg-white rounded shadow-lg overflow-hidden ${desktopOpen ? 'd-block' : 'd-none'}`}
              style={{
                zIndex: 100,
                maxHeight: '500px',
                transition: 'all 0.3s ease-in-out'
              }}
              role="listbox"
            >
              {themes.map((t) => (
                <button
                  key={t.value}
                  className={`dropdown-item w-100 text-start text-dark px-3 py-2 fs-6 ${theme === t.value ? 'bg-light fw-bold' : 'fw-normal'}`}
                  onClick={() => handleThemeChange(t.value as Theme)}
                  role="option"
                  aria-selected={theme === t.value}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;