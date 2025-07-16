import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import banner from "../assets/banner.png";

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-light py-5">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h1 className="display-4 fw-bold mb-3">
                Unlock Your Language Potential
              </h1>
              <p className="lead mb-4">
                Learn German and more with expert-led live and on-demand
                classes. Unlimited access, one subscription.
              </p>
              <Button variant="primary" size="lg" className="me-3">
                Get Started
              </Button>
              <Button variant="outline-primary" size="lg">
                Browse Classes
              </Button>
            </Col>
            <Col md={6}>
              <img src={banner} alt="Learning" />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="py-5 text-center">
        <Container>
          <h2 className="mb-5">Why Choose Us?</h2>
          <Row className="justify-content-center">
            {[
              {
                icon: "bi-person-badge-fill",
                title: "Expert Teachers",
                text: "Certified instructors with years of experience.",
              },
              {
                icon: "bi-clock-history",
                title: "Learn Anytime",
                text: "Flexible classes that fit your schedule.",
              },
              {
                icon: "bi-patch-check-fill",
                title: "Certification",
                text: "Earn certificates to boost your career.",
              },
            ].map(({ icon, title, text }, idx) => (
              <Col key={idx} md={4} className="mb-4">
                <i className={`bi ${icon} fs-1 text-primary mb-3`}></i>
                <h5>{title}</h5>
                <p className="text-muted">{text}</p>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Packages Section */}
      <section className="bg-light py-5">
        <Container>
          <h2 className="mb-4 text-center">Our Learning Packages</h2>
          <Row className="justify-content-center">
            <Col md={4} className="mb-4">
              <Card className="shadow-sm h-100">
                <Card.Body>
                  <Card.Title>Free Starter Pack</Card.Title>
                  <Card.Text>
                    Access beginner lessons and sample materials at no cost.
                  </Card.Text>
                  <Button variant="success" className="w-100">
                    Choose Free Plan
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="shadow-sm h-100">
                <Card.Body>
                  <Card.Title>Complete Language Package</Card.Title>
                  <Card.Text>
                    Full access to all classes and resources for all levels.
                  </Card.Text>
                  <Button variant="primary" className="w-100">
                    Buy Now
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* About Section */}
      <section className="py-5 text-center">
        <Container style={{ maxWidth: 700 }}>
          <h2 className="mb-3">About Top Online Academy</h2>
          <p className="lead text-muted">
            We empower thousands of students worldwide to master languages with
            flexible, affordable, and expert-led courses designed to fit your
            lifestyle.
          </p>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="bg-light py-5">
        <Container>
          <h2 className="mb-4 text-center">Student Testimonials</h2>
          <Row className="justify-content-center">
            {[
              {
                quote:
                  "The teachers are fantastic, and the flexible schedule helped me a lot!",
                name: "Anna M.",
              },
              {
                quote:
                  "I improved my German fast thanks to the amazing courses!",
                name: "Jürgen K.",
              },
              {
                quote:
                  "The certificate helped me get a job. Highly recommend this academy!",
                name: "Lea W.",
              },
            ].map(({ quote, name }, idx) => (
              <Col md={4} key={idx} className="mb-4">
                <Card className="shadow-sm h-100">
                  <Card.Body>
                    <Card.Text className="fst-italic">"{quote}"</Card.Text>
                    <Card.Subtitle className="text-muted mt-3">
                      - {name}
                    </Card.Subtitle>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-4 text-center">
        <Container>
          <p className="mb-2">
            © 2025 Top Online Academy. All rights reserved.
          </p>
          <p>
            <a
              href="mailto:info@toponlineacademy.com"
              className="text-white text-decoration-none"
            >
              info@toponlineacademy.com
            </a>{" "}
            | +43 123 456 7890
          </p>
          <div>
            <a href="#" className="text-white me-3 fs-4">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="#" className="text-white me-3 fs-4">
              <i className="bi bi-twitter-x"></i>
            </a>
            <a href="#" className="text-white fs-4">
              <i className="bi bi-instagram"></i>
            </a>
          </div>
        </Container>
      </footer>
    </>
  );
};

export default Home;
