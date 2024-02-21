import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import DNSComponent from "./DNSComponent";
import Navbar from "react-bootstrap/Navbar";
import { useContext } from "react";

//let global = true;

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
  let [global, setGlobal] = React.useState(true);

  return (
    <>
      <Container fluid>
        <NavHeader />
        <Row>
          <Col md={4}>
            <div className="d-grid gap-2">
              <Button variant={global ? "secondary" : "primary"} size="lg" onClick={() => {setGlobal(false);}}>
                Local
              </Button>
              <Button variant={global ? "primary" : "secondary"} size="lg" onClick={() => {setGlobal(true);}}>
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
