import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import DNSComponent from "./DNSComponent";
import LocalDNSComponent from "./LocalDNSComponent";
import Navbar from "react-bootstrap/Navbar";
import { useContext } from "react";
import Card from "react-bootstrap/Card";
import DnsSwitch from "./DnsSwitch";
import Modal from "react-bootstrap/Modal";
import ModalDialog from "react-bootstrap/esm/ModalDialog";
import { useState } from "react";

function NavHeader() {
  return (
    <Navbar
      className="bg-body-tertiary justify-content-md-center"
      bg="dark"
      data-bs-theme="dark"
    >
      <Navbar.Brand>
        <div className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            viewBox="0 0 16 16"
            className="d-inline-block align-center bi bi-server"
          >
            <path d="M1.333 2.667C1.333 1.194 4.318 0 8 0s6.667 1.194 6.667 2.667V4c0 1.473-2.985 2.667-6.667 2.667S1.333 5.473 1.333 4z" />
            <path d="M1.333 6.334v3C1.333 10.805 4.318 12 8 12s6.667-1.194 6.667-2.667V6.334a6.5 6.5 0 0 1-1.458.79C11.81 7.684 9.967 8 8 8s-3.809-.317-5.208-.876a6.5 6.5 0 0 1-1.458-.79z" />
            <path d="M14.667 11.668a6.5 6.5 0 0 1-1.458.789c-1.4.56-3.242.876-5.21.876-1.966 0-3.809-.316-5.208-.876a6.5 6.5 0 0 1-1.458-.79v1.666C1.333 14.806 4.318 16 8 16s6.667-1.194 6.667-2.667z" />
          </svg>
          &nbsp;<b>Periodic Domain Name Server Resolver Recommender</b>
        </div>
      </Navbar.Brand>
    </Navbar>
  );
}

/*
function IsGlobal(props) {
  if (props.global) {
    return <DNSComponent />;
  } else {
    console.log(props.global);
    return <LocalDNSComponent />;
  }
}
*/

function Page() {
  //const [global, setGlobal] = React.useState(true);
  // const [dialogOpen, setDialogOpen] = React.useState(false);

  return (
    <>
      <div>
        <NavHeader />
        <Row className="mx-auto pt-2">
          <Col md={4}>
            <Row>
              <div className="d-grid gap-2">
                <Card>
                  <Card.Body>
                    <Card.Title>Information</Card.Title>
                    <Card.Text>
                      Welcome to our Domain Name Server Resolver Recommender!
                      The Domain Name System (DNS) is a critical internet
                      infrastructure that translates user-friendly domain names
                      into numeric IP addresses, facilitating seamless
                      communication between devices. While our devices typically
                      default to a DNS resolver, the performance of each
                      provider can vary over time. To address this variability,
                      we've developed a web application that gauges the
                      real-time performance of different DNS resolvers. Our PDNS
                      Resolver operates on a scheduled 30-minute interval,
                      generating a curated list of DNS resolvers ranked by
                      performance tailored to your location in the United
                      States. This dynamic approach ensures users receive
                      recommendations aligned with their current needs. Our
                      application allows individuals to enhance their internet
                      experience by prioritizing performance, security, and
                      reliability. The tool also provides historical performance
                      data, allowing users to assess how each DNS resolver has
                      performed in the past. By leveraging our Resolver
                      Recommender, users gain insights into optimal DNS resolver
                      choices without the need for technical expertise or script
                      execution. Our website is instantly updated following each
                      scheduled query, ensuring users access the most accurate
                      and up-to-date information.{" "}
                    </Card.Text>
                    <ChangeDnsModal />
                  </Card.Body>
                </Card>
              </div>
            </Row>
          </Col>
          <Col md={8}>
            <DNSComponent />
          </Col>
        </Row>
      </div>
    </>
  );
}

function ChangeDnsModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant="dark" onClick={handleShow}>
        Click Here To Find out how to Switch Resolver!
      </Button>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header>
          <Modal.Title>
            Choose your Operating System{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="34"
              height="34"
              fill="currentColor"
              class="bi bi-laptop"
              viewBox="0 0 16 16"
            >
              <path d="M13.5 3a.5.5 0 0 1 .5.5V11H2V3.5a.5.5 0 0 1 .5-.5zm-11-1A1.5 1.5 0 0 0 1 3.5V12h14V3.5A1.5 1.5 0 0 0 13.5 2zM0 12.5h16a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5" />
            </svg>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DnsSwitch />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Page;
