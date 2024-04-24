import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

function Predictions() {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("fetching data for prediction");
        const response = await fetch("http://127.0.0.1:5000/chart-data");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Fetched data:", data);
        setChartData(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log("Rendering chartData:", chartData);
  try {
    const cloudflare_adobe = chartData['cloudflare - adobe.com']["datasets"][0]["data"]
    const cloudflare_apple = chartData['cloudflare - apple.com']["datasets"][0]["data"]
    const cloudflare_google = chartData['cloudflare - google.com']["datasets"][0]["data"]
    const google_adobe = chartData['google - adobe.com']["datasets"][0]["data"]
    const google_apple = chartData['google - apple.com']["datasets"][0]["data"]
    const google_google = chartData['google - google.com']["datasets"][0]["data"]
    const opendns_adobe = chartData['opendns - adobe.com']["datasets"][0]["data"]
    const opendns_apple = chartData['opendns - apple.com']["datasets"][0]["data"]
    const opendns_google = chartData['opendns - google.com']["datasets"][0]["data"]
    const quad9_adobe = chartData['quad9 - adobe.com']["datasets"][0]["data"]
    const quad9_apple = chartData['quad9 - apple.com']["datasets"][0]["data"]
    const quad9_google = chartData['quad9 - google.com']["datasets"][0]["data"]
    console.log('cloudflare-adobe', cloudflare_adobe)
    console.log('cloudflare-apple', cloudflare_apple)
    console.log('cloudflare-google', cloudflare_google)
    console.log('google-adobe', google_adobe)
    console.log('google-google', google_google)
    console.log('google-apple', google_apple)
    console.log('opendns-adobe', opendns_adobe)
    console.log('opendns-apple', opendns_apple)
    console.log('opendns-google', opendns_google)
    console.log('quad9-adobe', quad9_adobe)
    console.log('quad9-apple', quad9_apple)
    console.log('quad9-google', quad9_google)
  } catch (error) {
    console.error("Error while rendering chartData:", error);
  }
  //const forecastData = chartData['cloudflare - adobe.com']['datasets'][0]['data'];
  //console.log('Forecast Data:', forecastData);


  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Latency (ms)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Dates",
        },
      },
    },
  };


  if (chartData && chartData.labels) {
    console.log("Labels:", chartData.labels);
    console.log("Datasets:", chartData.datasets);
  }
  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : isLoading ? (
        <p>Loading chart data...</p>
      ) : chartData && chartData.labels ? (
        <Line
          data={{
            labels: chartData.labels,
            datasets: [
              {
                label: "Cloudflare - Adobe",
                data: chartData.datasets[0].data,
                borderColor: "rgba(255, 99, 132, 0.6)",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
              },
            ],
          }}
          options={options}
        />
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}

export default Predictions;