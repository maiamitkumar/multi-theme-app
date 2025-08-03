import React, { useContext, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import { ThemeContext } from './components/ThemeContext';

const App: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <Header />
      {theme === 'theme2' && <Sidebar isOpen={sidebarOpen} onToggle={handleSidebarToggle} />}
      <div
        className={`container mt-5`}
        style={{ paddingTop: theme === 'theme2' ? '80px' : '40px' }}
      >
        <Routes>
          <Route path="/" element={<Home theme={theme} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact theme={theme} />} />
        </Routes>
      </div>
    </>
  );
};

export default App;