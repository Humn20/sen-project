import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import DNSComponent from "./DNSComponent";
import Navbar from "react-bootstrap/Navbar";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
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
  const [global, setGlobal] = React.useState(true);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  return (
    <>
    <Dialog open={dialogOpen}>
      <DialogTitle sx={{ backgroundColor: 'primary.dark', color: 'white' }}>
        How to switch your resolver:
      </DialogTitle>
      <DialogContent>
        instructions
      </DialogContent>
      <DialogActions>
      <Button
              variant="contained"
              onClick={() => {
                setDialogOpen(false);
              }}
              sx={{ width: 120, marginRight: '5px' }}
            >
              &nbsp; Close
        </Button>
      </DialogActions>
    </Dialog>
      <Container fluid>
        <NavHeader />
        <Row>
          <Col md={4}>
            <Row>
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
            </Row>
            <Row>
              <div className="d-grid gap-2">
                <Button variant="dark" size="lg" onClick={() => {setDialogOpen(true);}}>
                  Want to switch resolver? Find out how!
                </Button>
              </div>
            </Row>
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
