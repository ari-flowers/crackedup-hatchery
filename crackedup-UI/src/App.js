import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Header from './components/Header';
// import Home from './components/Home';
// import Dashboard from './components/Dashboard';
// import Hatchery from './components/Hatchery';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* <Header /> */}
        <h1>Welcome to Cracked Up Hatchery!</h1>
        <p>Currently under construction, check back soon :)</p>
        <small>site developed by ShivaMateria</small>
        {/* <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/hatchery" element={<Hatchery />} />
        </Routes> */}
      </div>
    </Router>
  );
}

export default App;