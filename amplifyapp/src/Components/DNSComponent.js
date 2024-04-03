import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Bar } from "react-chartjs-2";
import React from "react";
import Chart from 'chart.js/auto';

let searchedName = ""
let searchedRank = ""

function SearchDNS(props) {
  const [entry, setEntry] = useState("");
  const handleSubmit = (e) =>{
    e.preventDefault();
    searchedName = entry;   
    searchedRank = 8;       
    data.push(createFakeData(searchedRank, searchedName));
    props.stateSetter(!props.state);
    e.target.reset();
    setEntry("");
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group as={Row} className="mb-3" controlId="formSearchDNS">
        <Form.Label column sm={3}>
          <b>Search DNS Resolver:</b>
        </Form.Label>
        <Col sm={7}>
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

function Histogram({ data }) {
  const histogram_data = {
    labels: data.map(entry => entry.name),
    datasets: [
      {
        label: 'DNS Rankings',
        data: data.map(entry => entry.rank),
        backgroundColor: 'rgba(0, 128, 0, 0.2)',
        borderColor: 'rgba(0, 128, 0, 0.2)', 
        borderWidth: 2,
      },
    ],
  };

  return (
    <div style={{ width: '80%', margin: 'auto' }}>
      <Bar data={histogram_data } />
    </div>
  );
}

function VisualizationComponent() {
  const [key, setKey] = useState("D1");

  return (
    <div className="mt-3">
      <Tabs
        id="visualizationTabs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="D1" title="Display 1">
          <Histogram key={key} data={data} />
        </Tab>
        <Tab eventKey="D2" title="Display 2">
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
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey(prevKey => prevKey + 1);
}, [state]);

  return (
    <>
      <Row className="justify-content-md-center">
        
          <SearchDNS state={state} stateSetter={setState}/>
        
      </Row>

      <Row>
        <Col md={3}>
          <b>Global Results:</b>
          </Col>
        <Col md={7}>
          <GetLatestResults key={key} />
        </Col>
      </Row>

      <Row>
        <VisualizationComponent/>
      </Row>
    </>
  );
}

function createFakeData(rank, name){
  return {rank, name};
}

let data = [
  createFakeData(1, "Google"),
  createFakeData(2, "OpenDNS"),
  createFakeData(3, "Quad9"),
  createFakeData(4, "CloudFare")
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
            {dataForTable.map((data, index)=> (
              <TableRow 
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {data.rank}
                </TableCell>
                <TableCell align="center">{data.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default DNSComponent;
