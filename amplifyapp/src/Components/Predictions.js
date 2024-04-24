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

 // console.log('Rendering chartData:', chartData); 
 
   const resolverNames = Object.keys(chartData);
   const dates = (Object.values(chartData)[0])["labels"];
   console.log("The resolver names are", resolverNames);
   console.log("The dates", dates);
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
  //  console.log("The data is", resdata);
  
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