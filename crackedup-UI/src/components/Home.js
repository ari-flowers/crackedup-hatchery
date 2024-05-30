import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Container className="mt-5">
      <div className="p-5 mb-4 bg-light rounded-3">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">Welcome to Cracked Up Hatchery!</h1>
          <p className="fs-4">
            Currently under construction, check back soon :)
          </p>
          <Button variant="primary" onClick={() => alert('Login functionality coming soon!')}>Login</Button>
        </div>
      </div>
    </Container>
  );
}

export default Home;
