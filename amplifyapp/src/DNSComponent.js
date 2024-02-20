import { useState } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

function SearchDNS() {
  return (
    <Form>
      <Form.Group as={Row} className="mb-3" controlId="formSearchDNS">
        <Form.Label column sm={4}>
          Enter a DNS Resolver:
        </Form.Label>
        <Col sm={8}>
          <Form.Control placeholder="Search..." />
        </Col>
      </Form.Group>
    </Form>
  );
}

function VisualizationComponent() {
  const [key, setKey] = useState("D1");

  return (
    <div>
      <Tabs
        id="visualizationTabs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="D1" title="Display 1">
          Visulization content for D1
        </Tab>
        <Tab eventKey="D2" title="Display 2">
          Visulization content for D2
        </Tab>
        <Tab eventKey="D3" title="Display 3">
          Visulization content for D3
        </Tab>
      </Tabs>
    </div>
  );
}

function DNSComponent() {
  return (
    <>
      <Row className="justify-content-md-center">
        <Col md={8}>
          <SearchDNS />
        </Col>
      </Row>

      <Row className="justify-content-md-center">
        <Col md={4}>Results:</Col>
        <Col>
          <div>Display Results here</div>
        </Col>
      </Row>

      <Row>
        <VisualizationComponent />
      </Row>
    </>
  );
}

export default DNSComponent;
