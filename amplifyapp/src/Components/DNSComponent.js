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
  const handleSubmit = (e) => {
    e.preventDefault();
    searchedName = entry;
    searchedRank = 8;
    props.stateSetter(!props.state);
    e.target.reset();
    setEntry("");
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group as={Row} className="mb-3" controlId="formSearchDNS">
        <Form.Label column sm={3}>
          <b>Search DNS Resolver:</b>
        </Form.Label>
        <Col sm={8}>
          <Form.Control
            placeholder="Search..."
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
          />
        </Col>
      </Form.Group>
    </Form>
  );
}

function Histogram({ data }) {
  console.log("Histogram data:", data);
  const histogram_data = {
    labels: Object.keys(data).map((entry) => entry.resolver), // .keys or .values will work maybe?
    datasets: [
      {
        label: "Average Latency",
        data: Object.values(data).map((entry) => entry.averageLatency),
        backgroundColor: "rgba(0, 128, 0, 0.2)",
        borderColor: "rgba(0, 128, 0, 0.2)",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <Bar data={histogram_data} />
    </div>
  );
}



function DNSComponent() {
  const [state, setState] = useState(false);
  const [key, setKey] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      console.log("about to fetch...");
      try {
        const response = await fetch("http://34.127.79.39:18292/GET", {});
        console.log(response.status);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [state]);

  return (
    <>
      <Row className="justify-content-md-center">
        <SearchDNS state={state} stateSetter={setState} />
      </Row>

      <Row>
        <b>Global Results:</b>
        <Col md={11}>
          {/* <GetLatestResults key={key} /> */}
          <LatencyTable data={data} />
          <Histogram data={data} />
        </Col>
      </Row>
    </>
  );
}



function LatencyTable({ data }) {
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    const calculateAverageLatency = () => {
      // Calculate average latency for each resolver
      const averages = Object.keys(data).map((resolver) => {
        const totalLatency = Object.values(data[resolver]).reduce(
          (acc, latency) => acc + latency,
          0
        );
        const averageLatency =
          totalLatency / Object.values(data[resolver]).length;
        return { resolver, averageLatency };
      });

      // Sort the data based on average latency in descending order
      averages.sort((a, b) => a.averageLatency - b.averageLatency);

      // Add rank to each resolver
      const resolversWithRank = averages.map((entry, index) => ({
        ...entry,
        rank: index + 1,
      }));

      setSortedData(resolversWithRank);
    };

    calculateAverageLatency();
  }, [data]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Ranking</TableCell>
            <TableCell>Resolver</TableCell>
            <TableCell>Average Latency</TableCell>
            <TableCell>
              adobe.com{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-file-pdf-fill"
                viewBox="0 0 16 16"
              >
                <path d="M5.523 10.424q.21-.124.459-.238a8 8 0 0 1-.45.606c-.28.337-.498.516-.635.572l-.035.012a.3.3 0 0 1-.026-.044c-.056-.11-.054-.216.04-.36.106-.165.319-.354.647-.548m2.455-1.647q-.178.037-.356.078a21 21 0 0 0 .5-1.05 12 12 0 0 0 .51.858q-.326.048-.654.114m2.525.939a4 4 0 0 1-.435-.41q.344.007.612.054c.317.057.466.147.518.209a.1.1 0 0 1 .026.064.44.44 0 0 1-.06.2.3.3 0 0 1-.094.124.1.1 0 0 1-.069.015c-.09-.003-.258-.066-.498-.256M8.278 4.97c-.04.244-.108.524-.2.829a5 5 0 0 1-.089-.346c-.076-.353-.087-.63-.046-.822.038-.177.11-.248.196-.283a.5.5 0 0 1 .145-.04c.013.03.028.092.032.198q.008.183-.038.465z" />
                <path
                  fillRule="evenodd"
                  d="M4 0h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2m.165 11.668c.09.18.23.343.438.419.207.075.412.04.58-.03.318-.13.635-.436.926-.786.333-.401.683-.927 1.021-1.51a11.6 11.6 0 0 1 1.997-.406c.3.383.61.713.91.95.28.22.603.403.934.417a.86.86 0 0 0 .51-.138c.155-.101.27-.247.354-.416.09-.181.145-.37.138-.563a.84.84 0 0 0-.2-.518c-.226-.27-.596-.4-.96-.465a5.8 5.8 0 0 0-1.335-.05 11 11 0 0 1-.98-1.686c.25-.66.437-1.284.52-1.794.036-.218.055-.426.048-.614a1.24 1.24 0 0 0-.127-.538.7.7 0 0 0-.477-.365c-.202-.043-.41 0-.601.077-.377.15-.576.47-.651.823-.073.34-.04.736.046 1.136c.088.406.238.848.43 1.295a20 20 0 0 1-1.062 2.227 7.7 7.7 0 0 0-1.482.645c-.37.22-.699.48-.897.787-.21.326-.275.714-.08 1.103"
                />
              </svg>
            </TableCell>
            <TableCell>
              apple.com{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-apple"
                viewBox="0 0 16 16"
              >
                <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282" />
                <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282" />
              </svg>
            </TableCell>
            <TableCell>
              google.com{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-google"
                viewBox="0 0 16 16"
              >
                <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.584 2.344l-2.46 2.46a4.8 4.8 0 0 0-1.42-1.248L10.25 3.35a8 8 0 0 1 5.295 3.21l-2.91 2.91c-.301-.618-.683-1.18-1.14-1.655l2.91-2.91zM8 6.4v-.001l-4.8 4.8L8 15.2c1.827 0 3.526-.785 4.7-2.155L11.1 11.7c-.752.626-1.72 1.012-2.8 1.012-2.21 0-4-1.79-4-4s1.79-4 4-4c1.312 0 2.44.63 3.175 1.611l-1.32 1.32a4.8 4.8 0 0 0-1.6-1.003L8 6.4z" />
              </svg>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((row) => (
            <TableRow key={row.resolver}>
              <TableCell>{row.rank}</TableCell>
              <TableCell>{row.resolver}</TableCell>
              <TableCell>{row.averageLatency.toFixed(2)}</TableCell>
              <TableCell>{row.rank}</TableCell>
              <TableCell>{row.rank}</TableCell>
              <TableCell>{row.rank}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DNSComponent;
