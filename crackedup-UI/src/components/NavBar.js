import React, { useContext } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

function NavBar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const buttonStyle = theme === 'dark' ? 'outline-light' : 'outline-dark';

  return (
    <Navbar bg={theme} variant={theme} expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Cracked Up</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/dragon-cave">Dragon Cave</Nav.Link>
            <Nav.Link as={Link} to="/dragon-village">Dragon Village</Nav.Link>
          </Nav>
          <Button variant={buttonStyle} onClick={toggleTheme}>
            Toggle Theme
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;