import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

function Predictions() {
    const [chartData, setChartData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/chart-data');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setChartData(data);
                console.log('Fetched data:', data); 
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Error fetching data');
            }
        };

        fetchData();
    }, []);

    console.log('Rendering chartData:', chartData); 
    const options = {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Latency (ms)'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Resolvers'
                }
            }
        }
    };

    return (
        <div>
            {error ? (
                <p>{error}</p>
            ) : (
                chartData && chartData.datasets ? (
                    <Bar
                        data={chartData}
                        options={options}
                    />
                ) : (
                    <p>Loading chart data...</p>
                )
            )}
        </div>
    );
}

export default Predictions;
