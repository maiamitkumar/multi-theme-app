import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => (
  <div className="sidebar bg-dark text-white p-3 position-fixed d-none d-md-block" style={{ width: '200px', height: '100vh', top: 0, left: 0 }}>
    <div className="mt-5">
      <h5>Sidebar</h5>
      <div className="nav flex-column">
        <Link className="nav-link text-white sidebar-link rounded" to="/">Home</Link>
        <Link className="nav-link text-white sidebar-link rounded" to="/about">About</Link>
        <Link className="nav-link text-white sidebar-link rounded" to="/contact">Contact</Link>
      </div>
    </div>
  </div>
);

export default Sidebar;