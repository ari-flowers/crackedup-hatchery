import React, { useContext } from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

function Home() {
  const { theme } = useContext(ThemeContext)
  const buttonStyle = theme === 'dark' ? 'outline-light' : 'outline-dark';

  return (
    <Container className={`mt-5 bg-${theme}`}>
      <div className={`p-5 mb-4 bg-${theme} rounded-3`}>
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">Welcome to Cracked Up Hatchery!</h1>
          <p className="fs-4">
            Currently under construction, check back soon :)
          </p>
          <Button variant={buttonStyle} onClick={() => alert('Login functionality coming soon!')}>Login</Button>
        </div>
      </div>
    </Container>
  );
}

export default Home;
