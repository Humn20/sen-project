import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

function Predictions() {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showChart, setShowChart] = useState(false); // State to track whether to show the chart or not

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

  // Debugging console logs
  useEffect(() => {
    console.log("Rendering chartData:", chartData);
    setShowChart(true); // Set showChart to true after data is fetched and rendered
  }, [chartData]);

  // Debugging stuff (labels are undefined)
  useEffect(() => {
    console.log("Rendering chartData:", chartData);
    if (chartData) {
      console.log("Labels:", chartData.labels);
      console.log(
        "Data:",
        chartData["cloudflare - adobe.com"].datasets[0].data
      );
    }
  }, [chartData]);

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : isLoading ? (
        <p>Loading chart data...</p>
      ) : showChart ? ( // Show the chart when showChart is true
        <Line
          data={{
            labels: chartData.labels,
            datasets: [
              {
                label: "Cloudflare - Adobe",
                data:
                  chartData["cloudflare - adobe.com"]?.datasets[0]?.data || [],
                borderColor: "rgba(255, 99, 132, 0.6)",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
              },
              // Add other datasets similarly...
            ],
          }}
          options={{
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
          }}
        />
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}

export default Predictions;