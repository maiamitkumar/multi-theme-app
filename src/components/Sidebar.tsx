import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface SidebarProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen = false, onToggle }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 2000);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Always show toggle button, hide only when sidebar is open
  const sidebarClasses = `sidebar bg-dark text-white p-3 position-fixed${isOpen ? ' d-block' : ' d-none'}`;
  const sidebarStyle = isMobile 
    ? { width: '100%', height: 'auto', top: '56px', left: 0, zIndex: 1000 }
    : { width: '200px', height: '100vh', top: 0, left: 0, zIndex: 1000 };

  return (
    <>
      {/* Always show Toggle Button */}
      {!isOpen && (
        <button
          className="btn btn-dark position-fixed"
          style={{ top: isMobile ? '75px' : '20px', left: isMobile ? '10px' : '10px', zIndex: 1001 }}
          onClick={onToggle}
        >
          <i className="bi bi-list"></i>
        </button>
      )}
      
      {/* Sidebar */}
      <div className={sidebarClasses} style={sidebarStyle}>
        <div className={isMobile ? 'mt-2' : 'mt-5'}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">Sidebar</h5>
            <button
              className="btn btn-outline-light btn-sm"
              onClick={onToggle}
            >
              <i className="bi bi-x"></i>
            </button>
          </div>
          <div className="nav flex-column">
            <Link className="nav-link text-white sidebar-link rounded" to="/" onClick={isMobile ? onToggle : undefined}>Home</Link>
            <Link className="nav-link text-white sidebar-link rounded" to="/about" onClick={isMobile ? onToggle : undefined}>About</Link>
            <Link className="nav-link text-white sidebar-link rounded" to="/contact" onClick={isMobile ? onToggle : undefined}>Contact</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;