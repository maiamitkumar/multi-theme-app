import React, { useContext, useState, useRef, useEffect } from 'react';
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
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const handleThemeChange = (value: Theme) => {
    setTheme(value);
    setOpen(false);
  };

  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">MultiThemeApp</Link>
        <div className="d-flex ms-auto align-items-center">
          <Link className="nav-link me-3" to="/about">About</Link>
          <Link className="nav-link me-3" to="/contact">Contact</Link>
          <div className="position-relative" ref={dropdownRef}>
            <button
              className={`btn btn-light border shadow-sm d-flex align-items-center fw-medium fs-6 ${open ? 'border-primary shadow' : ''}`}
              style={{ minWidth: '120px' }}
              onClick={() => setOpen((prev) => !prev)}
              aria-haspopup="listbox"
              aria-expanded={open}
            >
              {themes.find((t) => t.value === theme)?.label || 'Select Theme'}
              <i className={`bi bi-chevron-down ms-2 transition-rotate ${open ? 'rotate-180' : ''}`}></i>
            </button>
            <div
              className={`position-absolute top-100 start-0 end-0 bg-white rounded shadow-lg overflow-hidden ${open ? 'd-block' : 'd-none'}`}
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