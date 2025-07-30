import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import { ThemeContext } from './components/ThemeContext';

const App: React.FC = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <Header />
      {theme === 'theme2' && <Sidebar />}
      <div className="container mt-5 pt-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact theme={theme} />} />
        </Routes>
      </div>
    </>
  );
};

export default App;