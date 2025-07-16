import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../style/Navbar.module.css"; // We'll define this below

const NavigationBar = () => {
  return (
    <Navbar
      expand="lg"
      fixed="top"
      bg="white"
      className={`shadow-sm ${styles.navbarRemoveBg}`}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className={styles.brand}>
          Top Online Academy
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className={`me-auto ${styles.navLinks}`}>
            <Nav.Link as={Link} to="/" className={styles.navLink}>
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/upcoming-classes"
              className={styles.navLink}
            >
              Classes
            </Nav.Link>
            <Nav.Link as={Link} to="/packages" className={styles.navLink}>
              Packages
            </Nav.Link>
            <Nav.Link as={Link} to="/library" className={styles.navLink}>
              Library
            </Nav.Link>
            <Nav.Link as={Link} to="/events" className={styles.navLink}>
              Events
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" className={styles.navLink}>
              Contact
            </Nav.Link>
          </Nav>

          <Nav className="ms-auto d-flex align-items-center gap-3">
            <Button
              as={Link}
              to="/login"
              variant="outline-dark"
              size="sm"
              className={styles.loginBtn}
            >
              Log in
            </Button>
            <Button
              as={Link}
              to="/signup"
              variant="primary"
              size="sm"
              className={styles.signupBtn}
            >
              Sign up
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
