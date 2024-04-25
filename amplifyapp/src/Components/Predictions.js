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

  const lineColors = [
    "rgba(255, 99, 132, 0.6)",
    "rgba(255, 255, 0, 0.6)",
    "rgba(75, 192, 192, 0.6)",
    "rgba(54, 162, 235, 0.6)",
    "rgba(153, 102, 255, 0.6)",
    "rgba(255, 159, 64, 0.6)",
    "rgba(0, 128, 0, 0.6)", 
    "rgba(255, 0, 255, 0.6)", 
    "rgba(0, 0, 255, 0.6)", 
    "rgba(255, 0, 0, 0.6)", 
    "rgba(0, 255, 255, 0.6)", 
    "rgba(128, 0, 128, 0.6)", 
    "rgba(128, 128, 0, 0.6)", 
    "rgba(255, 192, 203, 0.6)",
    "rgba(255, 165, 0, 0.6)", 
    "rgba(128, 128, 128, 0.6)", 
  ];
  
  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : isLoading ? (
        <p>Loading chart data...</p>
      ) : showChart ? ( 
        <Line
          data={{
            labels: (Object.values(chartData)[0])["labels"],
            datasets: Object.entries(chartData).map(([key, value], index) => ({
              label: key,
              data: value?.datasets[0]?.data || [],
              borderColor: lineColors[index % lineColors.length],
              backgroundColor: lineColors[index % lineColors.length].replace(", 0.6)", ", 0.2)"), 
            })),
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
