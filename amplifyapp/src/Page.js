import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import DNSComponent from "./DNSComponent";
import Navbar from "react-bootstrap/Navbar";
import { useContext } from "react";

function NavHeader() {
  return (
    <Navbar
      className="bg-body-tertiary justify-content-md-center"
      bg="dark"
      data-bs-theme="dark"
    >
      <Navbar.Brand>
        Periodic Domain Name Server Resolver Recommender
      </Navbar.Brand>
    </Navbar>
  );
}

function Page() {
  return (
    <>
      <Container fluid>
        <NavHeader />
        <Row>
          <Col md={4}>
            <div className="d-grid gap-2">
              <Button variant="primary" size="lg">
                Local
              </Button>
              <Button variant="secondary" size="lg">
                Global
              </Button>
              <div>
                Explanation of the site and the difference between local and
                global.{" "}
              </div>
            </div>
          </Col>
          <Col md={8}>
            <DNSComponent />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Page;
