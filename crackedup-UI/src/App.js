import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Header from './components/Header';
import Home from './components/Home';
// import Dashboard from './components/Dashboard';
// import Hatchery from './components/Hatchery';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/hatchery" element={<Hatchery />} /> */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;