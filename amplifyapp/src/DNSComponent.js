import { useState } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

let searchedName = ""
let searchedRank = ""

function SearchDNS(props) {
  const HandleSubmit = (e) =>{
    e.preventDefault();
    console.log(e);
    searchedName = "new";
    searchedRank = 8;
    props.data(0);
  }
  return (
    <Form onSubmit={HandleSubmit}>
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
  const [state, setState] = useState(false);
  return (
    <>
      <Row className="justify-content-md-center">
        <Col md={8}>
          <SearchDNS data={setState}/>
        </Col>
      </Row>

      <Row className="justify-content-md-center">
        <Col md={2}>Results:</Col>
        <Col>
          <GetLatestResults />
        </Col>
      </Row>

      <Row>
        <VisualizationComponent />
      </Row>
    </>
  );
}

function createFakeData(rank, name){
  // this should eventually be an api call to get actual data
  return {rank, name};
}

const data = [
  createFakeData(1, "Google"),
  createFakeData(2, "OpenDNS"),
  createFakeData(3, "Quad9"),
  createFakeData(4, "CloudFare")
]

function GetLatestResults() {
  return (
    <>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell align="left" sx={{fontWeight:'bold'}}>Ranking</TableCell>
              <TableCell align="center" sx={{fontWeight:'bold'}}>DNS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((data)=>
              <TableRow 
                key={data.rank}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {data.rank}
                </TableCell>
                <TableCell align="center">{data.name}</TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell component="th" scope="row">
                ...
              </TableCell>
              <TableCell align="center">...</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                {searchedRank}
              </TableCell>
              <TableCell align="center">{searchedName}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default DNSComponent;
