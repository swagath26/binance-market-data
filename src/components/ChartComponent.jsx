import React, { useEffect, useState } from "react";
import { Chart } from "react-chartjs-2";
import 'chart.js/auto';

const ChartComponent = ({ candlestickData, interval }) => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    if (candlestickData.length) {
      const chartData = {
        labels: candlestickData.map(data => new Date(data.time).toLocaleTimeString()),
        datasets: [
          {
            label: `Candlestick Data (${interval})`,
            data: candlestickData.map((data) => ({
              x: data.time,
              y: [data.open, data.high, data.low, data.close],
            })),
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
          },
        ],
      };

      setChartData(chartData);
    }
  }, [candlestickData, interval]);

  const options = {
    scales: {
      x: {
        type: "time",
      },
      y: {
        beginAtZero: false,
      },
    },
  };

  return <Chart type="candlestick" data={chartData} options={options} />;
};

export default ChartComponent;