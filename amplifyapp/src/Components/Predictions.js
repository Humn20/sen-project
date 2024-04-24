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