import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Bar } from "react-chartjs-2";
import React from "react";
import Button from "react-bootstrap/Button";
import { Tabs, Tab } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import { Amplify, API } from "aws-amplify";
import awsconfig from "../aws-exports";

let searchedName = "";
let searchedRank = "";
Amplify.configure(awsconfig);

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

function AverageHistogram({ data, isLoading }) {
  console.log("Histogram data:", data);
  const resolverNames = Object.keys(data);
  const averageLatencies = Object.values(data).map(
    (resolverData) =>
      (resolverData["adobe.com"] +
        resolverData["apple.com"] +
        resolverData["google.com"]) /
      3
  );
  console.log(resolverNames);
  console.log(averageLatencies);

  const histogram_data = {
    labels: resolverNames,
    datasets: [
      {
        label: "Average Latency",
        data: averageLatencies,
        backgroundColor: "rgba(0, 128, 0, 0.2)",
        borderColor: "rgba(0, 128, 0, 0.2)",
        borderWidth: 2,
      },
    ],
  };
  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "300px" }}
      >
        <Spinner />
        &nbsp; Loading...
      </div>
    );
  }

  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <Bar data={histogram_data} />
    </div>
  );
}

function AdobeHistogram({ data, isLoading }) {
  console.log("AdobeHistogram data:", data);
  const resolverNames = Object.keys(data);
  const adobeLatencies = Object.values(data).map(
    (resolverData) => resolverData["adobe.com"]
  );
  console.log(resolverNames);
  console.log(adobeLatencies);

  const histogram_data = {
    labels: resolverNames,
    datasets: [
      {
        label: "Adobe's Latency",
        data: adobeLatencies,
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

function AppleHistogram({ data, isLoading }) {
  console.log("AppleHistogram data:", data);
  const resolverNames = Object.keys(data);
  const appleLatencies = Object.values(data).map(
    (resolverData) => resolverData["apple.com"]
  );
  console.log(resolverNames);
  console.log(appleLatencies);

  const histogram_data = {
    labels: resolverNames,
    datasets: [
      {
        label: "Apple's Latency",
        data: appleLatencies,
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

function GoogleHistogram({ data, isLoading }) {
  const resolverNames = Object.keys(data);
  const googleLatencies = Object.values(data).map(
    (resolverData) => resolverData["google.com"]
  );

  const histogram_data = {
    labels: resolverNames,
    datasets: [
      {
        label: "Google's Latency",
        data: googleLatencies,
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
  //const [key, setKey] = useState(0);
  const [key, setKey] = useState("D1"); // Set default activeKey to "D1"
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Set isLoading to true when fetching data
      console.log("about to fetch...");
      try {
        //const response = await fetch("https://cors-anywhere.herokuapp.com/http://34.127.79.39:18292/GET", {});
        // const response = await fetch("http://34.127.79.39:18292/GET", {});
        const requestData = {
          headers: {},
        };
        const response = await API.get("PDNSR", "/GET", {});
        console.log(response.status);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false); // Set isLoading to false after fetching data
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [state]);

  useEffect(() => {
    setKey("D1"); // Set the key to "D1" when state changes
  }, [state]);

  return (
    <>
      <Row>
        <Col md={12}>
          <LatencyTable data={data} />
          <br></br>
          <Tabs
            id="histogramTabs"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
          >
            <Tab eventKey="D1" title="Average Latencies">
              <AverageHistogram key={key} data={data} isLoading={isLoading} />
            </Tab>
            <Tab eventKey="D2" title="Adobe's Latency">
              <AdobeHistogram key={key} data={data} isLoading={isLoading} />
            </Tab>
            <Tab eventKey="D3" title="Apple's Latency">
              <AppleHistogram key={key} data={data} isLoading={isLoading} />
            </Tab>
            <Tab eventKey="D4" title="Google's Latency">
              <GoogleHistogram key={key} data={data} isLoading={isLoading} />
            </Tab>
          </Tabs>
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
            <TableCell>
              <strong>Rank #</strong>
            </TableCell>
            <TableCell>
              <strong>Resolver</strong>
            </TableCell>
            <TableCell>
              <strong>Average Latency</strong>
            </TableCell>
            <TableCell>
              <strong>adobe.com&nbsp;</strong>
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
              <strong>apple.com&nbsp;</strong>
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
              <strong>google.com&nbsp;</strong>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-google"
                viewBox="0 0 16 16"
              >
                <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
              </svg>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map(({ rank, resolver, averageLatency }) => (
            <TableRow key={resolver}>
              <TableCell>{rank}</TableCell>
              <TableCell>{resolver}</TableCell>
              <TableCell>{averageLatency}</TableCell>
              <TableCell>{data[resolver]["adobe.com"]}</TableCell>
              <TableCell>{data[resolver]["apple.com"]}</TableCell>
              <TableCell>{data[resolver]["google.com"]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DNSComponent;
