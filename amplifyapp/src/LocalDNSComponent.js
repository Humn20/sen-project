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
  const [entry, setEntry] = useState("");
  const HandleSubmit = (e) =>{
    e.preventDefault();
    searchedName = entry;   // needs to involve API call
    searchedRank = 8;       // needs to involve API call
    data.push(createFakeData(searchedRank, searchedName));
    props.stateSetter(!props.state);
    e.target.reset();
    setEntry("");
  }
  return (
    <Form onSubmit={HandleSubmit}>
      <Form.Group as={Row} className="mb-3" controlId="formSearchDNS">
        <Form.Label column sm={4}>
          Enter a DNS Resolver:
        </Form.Label>
        <Col sm={8}>
          <Form.Control 
            placeholder="Search..." 
            value={entry}
            onChange={e => setEntry(e.target.value)}
          />
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

function LocalDNSComponent() {
  const [state, setState] = useState(false);
  return (
    <>
      <Row className="justify-content-md-center">
        <Col md={8}>
          <SearchDNS state={state} stateSetter={setState}/>
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
  return {rank, name};
}

// this should eventually be an api call to get actual data
let data = [
  createFakeData(1, "LocalGoogle"),
  createFakeData(2, "LocalOpenDNS"),
  createFakeData(3, "LocalQuad9"),
  createFakeData(4, "LocalCloudFare")
]

function sortData() {
  let n = data.length;
  let i, key, j;
  for (i=1; i < n; i++){
    key = data[i];
    j = i-1;
    while (j >= 0 && data[j].rank > key.rank){  
      data[j + 1] = data[j];  
        j = j - 1;  
    }  
    data[j + 1] = key; 

  }
  data = data.filter((value, index, self) =>
    index === self.findIndex((t) => (
      t.rank === value.rank && t.name === value.name
    ))
  )
}

function addBlanks(){
  let dataToTable = [];
  let i;
  for(i=0; i<data.length-1; i++){
    dataToTable.push(data[i]);
    if ((data[i].rank !== data[i+1].rank-1) && (data[i].rank !== data[i+1].rank)){
      dataToTable.push(createFakeData("...", "..."));
    }
  }
  dataToTable.push(createFakeData(data[data.length-1].rank, data[data.length-1].name));
  return dataToTable;
}

function GetLatestResults() {
  sortData();
  const dataForTable = addBlanks();
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
            {dataForTable.map((data)=>
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
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default LocalDNSComponent;
